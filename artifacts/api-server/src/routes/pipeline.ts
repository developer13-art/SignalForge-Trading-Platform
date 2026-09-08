import { Router, type IRouter } from "express";
import { and, asc, desc, eq } from "drizzle-orm";
import { db, auditLogsTable, executionRequestsTable, pipelineEventsTable, signalsTable } from "@workspace/db";
import {
  GetSignalDetailParams,
  GetSignalDetailResponse,
  GetSignalReplayParams,
  GetSignalReplayResponse,
  IngestSignalSourceMessageBody,
  IngestSignalSourceMessageParams,
  IngestSignalSourceMessageResponse,
  ListAuditLogsResponse,
  RequestSignalExecutionBody,
  RequestSignalExecutionParams,
  RequestSignalExecutionResponse,
} from "@workspace/api-zod";
import { getAuthenticatedUserId, requireAuth } from "../middlewares/requireAuth";
import { findSignalForUser, ingestSourceMessage } from "../lib/signal-pipeline";

const router: IRouter = Router();

router.post("/signal-sources/:id/messages", requireAuth, async (req, res): Promise<void> => {
  const params = IngestSignalSourceMessageParams.safeParse(req.params);
  const body = IngestSignalSourceMessageBody.safeParse(req.body);
  if (!params.success || !body.success) {
    res.status(400).json({ error: params.error?.message ?? body.error?.message ?? "Invalid request" });
    return;
  }

  try {
    const result = await ingestSourceMessage({
      userId: getAuthenticatedUserId(res),
      sourceId: params.data.id,
      externalMessageId: body.data.externalMessageId,
      rawText: body.data.rawText,
      receivedAt: body.data.receivedAt ? new Date(body.data.receivedAt) : null,
    });
    res.status(201).json(IngestSignalSourceMessageResponse.parse(result));
  } catch (error) {
    if (error instanceof Error && error.message === "Signal source not found") {
      res.status(404).json({ error: error.message });
      return;
    }
    throw error;
  }
});

router.get("/signals/:id", requireAuth, async (req, res): Promise<void> => {
  const params = GetSignalDetailParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const result = await findSignalForUser(params.data.id, getAuthenticatedUserId(res));
  if (!result) {
    res.status(404).json({ error: "Signal not found" });
    return;
  }

  const { signal, source, decision } = result;
  res.json(
    GetSignalDetailResponse.parse({
      id: signal.id,
      symbol: signal.symbol,
      direction: signal.direction,
      entryType: signal.entryType,
      entry: signal.entry == null ? null : Number(signal.entry),
      stopLoss: signal.stopLoss == null ? null : Number(signal.stopLoss),
      takeProfit1: signal.takeProfit1 == null ? null : Number(signal.takeProfit1),
      takeProfit2: signal.takeProfit2 == null ? null : Number(signal.takeProfit2),
      takeProfit3: signal.takeProfit3 == null ? null : Number(signal.takeProfit3),
      timeframe: signal.timeframe,
      status: signal.status,
      source: source.name,
      confidence: signal.confidence == null ? null : Number(signal.confidence),
      receivedAt: signal.createdAt.toISOString(),
      decision: {
        eligibilityStatus: decision?.eligibilityStatus ?? "PENDING",
        eligible: decision?.eligible ?? false,
        riskApproved: decision?.riskApproved ?? false,
        executionMode: decision?.executionMode ?? "MANUAL",
        reason: decision?.reason ?? null,
      },
    }),
  );
});

router.get("/signals/:id/replay", requireAuth, async (req, res): Promise<void> => {
  const params = GetSignalReplayParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const signal = await findSignalForUser(params.data.id, getAuthenticatedUserId(res));
  if (!signal) {
    res.status(404).json({ error: "Signal not found" });
    return;
  }

  const events = await db
    .select()
    .from(pipelineEventsTable)
    .where(eq(pipelineEventsTable.aggregateId, params.data.id))
    .orderBy(asc(pipelineEventsTable.createdAt));

  res.json(
    GetSignalReplayResponse.parse(
      events.map((event) => ({
        id: event.id,
        eventType: event.eventType,
        createdAt: event.createdAt.toISOString(),
        payload: event.payload,
      })),
    ),
  );
});

router.post("/signals/:id/execute", requireAuth, async (req, res): Promise<void> => {
  const params = RequestSignalExecutionParams.safeParse(req.params);
  const body = RequestSignalExecutionBody.safeParse(req.body ?? {});
  if (!params.success || !body.success) {
    res.status(400).json({ error: params.error?.message ?? body.error?.message ?? "Invalid request" });
    return;
  }

  const userId = getAuthenticatedUserId(res);
  const result = await findSignalForUser(params.data.id, userId);
  if (!result) {
    res.status(404).json({ error: "Signal not found" });
    return;
  }

  const environment = body.data.environment ?? "DEMO";
  const idempotencyKey = `manual:${userId}:${params.data.id}:${environment}`;
  const existing = await db
    .select()
    .from(executionRequestsTable)
    .where(eq(executionRequestsTable.idempotencyKey, idempotencyKey))
    .limit(1);
  if (existing[0]) {
    res.status(409).json({ error: "An execution request already exists for this signal", requestId: existing[0].id });
    return;
  }

  const blockReason = !result.decision?.eligible
    ? result.decision?.reason ?? "Signal is not eligible for execution"
    : "MetaApi broker integration is not configured";
  const [request] = await db
    .insert(executionRequestsTable)
    .values({
      id: crypto.randomUUID(),
      signalId: result.signal.id,
      userId,
      brokerAccountId: body.data.brokerAccountId ?? null,
      environment,
      status: "BLOCKED",
      idempotencyKey,
      error: blockReason,
    })
    .returning();

  await db.insert(pipelineEventsTable).values({
    id: crypto.randomUUID(),
    aggregateType: "SIGNAL",
    aggregateId: result.signal.id,
    eventType: "EXECUTION_BLOCKED",
    payload: { requestId: request.id, environment, reason: blockReason },
  });

  res.status(409).json({
    error: blockReason,
    request: RequestSignalExecutionResponse.parse({
      id: request.id,
      signalId: request.signalId,
      environment: request.environment,
      status: request.status,
      blockReason,
      requestedAt: request.requestedAt.toISOString(),
    }),
  });
});

router.get("/audit", requireAuth, async (_req, res): Promise<void> => {
  const logs = await db
    .select()
    .from(auditLogsTable)
    .where(eq(auditLogsTable.userId, getAuthenticatedUserId(res)))
    .orderBy(desc(auditLogsTable.createdAt))
    .limit(100);
  res.json(
    ListAuditLogsResponse.parse(
      logs.map((log) => ({
        id: log.id,
        action: log.action,
        resourceType: log.resourceType,
        resourceId: log.resourceId,
        result: log.result,
        createdAt: log.createdAt.toISOString(),
      })),
    ),
  );
});

export default router;