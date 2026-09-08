import { createHash } from "node:crypto";
import OpenAI from "openai";
import { and, desc, eq, gte, ne } from "drizzle-orm";
import {
  auditLogsTable,
  db,
  incomingMessagesTable,
  pipelineEventsTable,
  riskProfilesTable,
  signalAnalysesTable,
  signalDecisionsTable,
  signalsTable,
  signalSourcesTable,
  type IncomingMessage,
  type Signal,
} from "@workspace/db";

const MODEL = "gpt-5.4-mini";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY ?? "" });

type Analysis = {
  isSignal: boolean;
  symbol: string | null;
  direction: "BUY" | "SELL" | null;
  entryType: "MARKET" | "LIMIT" | "STOP";
  entry: number | null;
  stopLoss: number | null;
  takeProfit1: number | null;
  takeProfit2: number | null;
  takeProfit3: number | null;
  timeframe: string | null;
  signalType: "TRADE" | "COMMENTARY" | "ALERT";
  confidence: number | null;
  providerClues: string[];
  reason: string;
};

type IngestInput = {
  userId: string;
  sourceId: string;
  externalMessageId?: string | null;
  rawText: string;
  receivedAt?: Date | null;
};

export type IngestResult = {
  messageId: string;
  processingStatus: "RECEIVED" | "NON_SIGNAL" | "SIGNAL_CREATED" | "DUPLICATE" | "REJECTED" | "ANALYSIS_FAILED";
  classification: "PENDING" | "NON_SIGNAL" | "POTENTIAL_SIGNAL";
  signalId: string | null;
  duplicateOf: string | null;
  reason: string | null;
};

function fingerprint(value: string): string {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

function asNumber(value: number | null | undefined): string | null {
  return value == null || !Number.isFinite(value) ? null : String(value);
}

async function recordEvent(
  aggregateType: string,
  aggregateId: string,
  eventType: string,
  payload: Record<string, unknown>,
) {
  await db.insert(pipelineEventsTable).values({
    id: crypto.randomUUID(),
    aggregateType,
    aggregateId,
    eventType,
    payload,
  });
}

async function recordAudit(
  userId: string,
  action: string,
  resourceType: string,
  resourceId: string | null,
  result: string,
  metadata: Record<string, unknown>,
) {
  await db.insert(auditLogsTable).values({
    id: crypto.randomUUID(),
    userId,
    actorType: "USER",
    actorId: userId,
    action,
    resourceType,
    resourceId,
    result,
    metadata,
  });
}

async function analyzeMessage(rawText: string, sourceName: string): Promise<Analysis> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("AI analysis is not configured");
  }

  const response = await openai.chat.completions.create({
    model: MODEL,
    max_completion_tokens: 8192,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: [
          "You classify and normalize trading-provider messages for SignalForge.",
          "Do not give trading advice. Extract only what the message explicitly communicates.",
          "A greeting, commentary, promotion, or educational message is not a trade signal.",
          "Return JSON only with these keys: isSignal, symbol, direction, entryType, entry, stopLoss, takeProfit1, takeProfit2, takeProfit3, timeframe, signalType, confidence, providerClues, reason.",
          "Use null for unknown numeric or text fields. confidence is a number from 0 to 100 representing extraction confidence, not profitability.",
          "direction must be BUY or SELL when present. entryType must be MARKET, LIMIT, or STOP. signalType must be TRADE, COMMENTARY, or ALERT.",
        ].join(" "),
      },
      {
        role: "user",
        content: JSON.stringify({ sourceName, rawText }),
      },
    ],
  });

  const content = response.choices[0]?.message.content;
  if (!content) throw new Error("AI returned no analysis");
  return JSON.parse(content) as Analysis;
}

function validationReasons(analysis: Analysis): string[] {
  const reasons: string[] = [];
  if (!analysis.isSignal) reasons.push("Message was classified as not being a trade signal");
  if (analysis.signalType !== "TRADE") reasons.push("Message is not a trade instruction");
  if (!analysis.symbol) reasons.push("Symbol is missing");
  if (!analysis.direction) reasons.push("Direction is missing");
  if (analysis.entryType !== "MARKET" && analysis.entry == null) reasons.push("Entry price is missing");
  if (analysis.stopLoss == null) reasons.push("Stop-loss is missing");
  if (analysis.takeProfit1 == null) reasons.push("Take-profit is missing");
  if (analysis.confidence == null || analysis.confidence < 50) reasons.push("Extraction confidence is below the minimum processing threshold");
  return reasons;
}

async function findDuplicate(sourceId: string, rawText: string, externalMessageId?: string | null) {
  if (externalMessageId) {
    const [byExternalId] = await db
      .select()
      .from(incomingMessagesTable)
      .where(
        and(
          eq(incomingMessagesTable.sourceId, sourceId),
          eq(incomingMessagesTable.externalMessageId, externalMessageId),
        ),
      )
      .limit(1);
    if (byExternalId) return byExternalId;
  }

  const [byFingerprint] = await db
    .select()
    .from(incomingMessagesTable)
    .where(
      and(
        eq(incomingMessagesTable.sourceId, sourceId),
        eq(incomingMessagesTable.fingerprint, fingerprint(rawText)),
      ),
    )
    .limit(1);
  return byFingerprint;
}

async function getSignalByMessage(messageId: string) {
  const [signal] = await db
    .select()
    .from(signalsTable)
    .where(eq(signalsTable.messageId, messageId))
    .limit(1);
  return signal;
}

export async function ingestSourceMessage(input: IngestInput): Promise<IngestResult> {
  const [source] = await db
    .select()
    .from(signalSourcesTable)
    .where(and(eq(signalSourcesTable.id, input.sourceId), eq(signalSourcesTable.userId, input.userId)))
    .limit(1);

  if (!source) {
    throw new Error("Signal source not found");
  }

  const duplicate = await findDuplicate(input.sourceId, input.rawText, input.externalMessageId);
  if (duplicate) {
    const duplicateSignal = await getSignalByMessage(duplicate.id);
    return {
      messageId: duplicate.id,
      processingStatus: "DUPLICATE",
      classification: duplicate.classification as IngestResult["classification"],
      signalId: duplicateSignal?.id ?? null,
      duplicateOf: duplicateSignal?.id ?? null,
      reason: "The source message was already processed",
    };
  }

  const messageId = crypto.randomUUID();
  const messageFingerprint = fingerprint(
    input.externalMessageId ? `${input.sourceId}:${input.externalMessageId}` : input.rawText,
  );
  const [message] = await db
    .insert(incomingMessagesTable)
    .values({
      id: messageId,
      sourceId: input.sourceId,
      userId: input.userId,
      externalMessageId: input.externalMessageId ?? null,
      rawText: input.rawText,
      fingerprint: messageFingerprint,
      receivedAt: input.receivedAt ?? new Date(),
    })
    .returning();

  await recordEvent("MESSAGE", message.id, "MESSAGE_RECEIVED", {
    sourceId: source.id,
    sourceType: source.type,
  });

  let analysis: Analysis;
  try {
    analysis = await analyzeMessage(input.rawText, source.name);
  } catch (error) {
    const reason = error instanceof Error ? error.message : "AI analysis failed";
    await db
      .update(incomingMessagesTable)
      .set({ processingStatus: "ANALYSIS_FAILED", classification: "PENDING" })
      .where(eq(incomingMessagesTable.id, message.id));
    await recordEvent("MESSAGE", message.id, "SIGNAL_ANALYSIS_FAILED", { reason });
    await recordAudit(input.userId, "SIGNAL_ANALYSIS_FAILED", "MESSAGE", message.id, "FAILED", { reason });
    return {
      messageId: message.id,
      processingStatus: "ANALYSIS_FAILED",
      classification: "PENDING",
      signalId: null,
      duplicateOf: null,
      reason,
    };
  }

  if (!analysis.isSignal || analysis.signalType !== "TRADE") {
    await db
      .update(incomingMessagesTable)
      .set({ processingStatus: "NON_SIGNAL", classification: "NON_SIGNAL" })
      .where(eq(incomingMessagesTable.id, message.id));
    await recordEvent("MESSAGE", message.id, "MESSAGE_CLASSIFIED_NON_SIGNAL", { reason: analysis.reason });
    await recordAudit(input.userId, "MESSAGE_CLASSIFIED", "MESSAGE", message.id, "NON_SIGNAL", {
      reason: analysis.reason,
    });
    return {
      messageId: message.id,
      processingStatus: "NON_SIGNAL",
      classification: "NON_SIGNAL",
      signalId: null,
      duplicateOf: null,
      reason: analysis.reason,
    };
  }

  const reasons = validationReasons(analysis);
  const signalId = crypto.randomUUID();
  const signalFingerprint = fingerprint(
    `${analysis.symbol}:${analysis.direction}:${analysis.entry}:${analysis.stopLoss}:${analysis.takeProfit1}`,
  );
  const [recentOpposite] = analysis.symbol && analysis.direction
    ? await db
        .select()
        .from(signalsTable)
        .where(
          and(
            eq(signalsTable.userId, input.userId),
            eq(signalsTable.symbol, analysis.symbol),
            ne(signalsTable.direction, analysis.direction),
            gte(signalsTable.createdAt, new Date(Date.now() - 30 * 60 * 1000)),
          ),
        )
        .orderBy(desc(signalsTable.createdAt))
        .limit(1)
    : [];

  const status = recentOpposite ? "CONFLICT" : reasons.length ? "REJECTED" : "VALIDATED";
  const allReasons = recentOpposite
    ? [...reasons, `Conflicts with recent ${recentOpposite.direction} signal ${recentOpposite.id}`]
    : reasons;

  const [signal] = await db
    .insert(signalsTable)
    .values({
      id: signalId,
      messageId: message.id,
      sourceId: source.id,
      userId: input.userId,
      symbol: analysis.symbol ?? "UNKNOWN",
      direction: analysis.direction ?? "BUY",
      entryType: analysis.entryType,
      entry: asNumber(analysis.entry),
      stopLoss: asNumber(analysis.stopLoss),
      takeProfit1: asNumber(analysis.takeProfit1),
      takeProfit2: asNumber(analysis.takeProfit2),
      takeProfit3: asNumber(analysis.takeProfit3),
      timeframe: analysis.timeframe,
      signalType: analysis.signalType,
      confidence: asNumber(analysis.confidence),
      status,
      fingerprint: signalFingerprint,
      validationSummary: allReasons,
    })
    .returning();

  await db.insert(signalAnalysesTable).values({
    id: crypto.randomUUID(),
    signalId,
    model: MODEL,
    result: analysis as unknown as Record<string, unknown>,
    confidence: asNumber(analysis.confidence),
  });

  const [profile] = await db
    .select()
    .from(riskProfilesTable)
    .where(eq(riskProfilesTable.userId, input.userId))
    .limit(1);
  const minimumConfidence = profile ? Number(profile.minimumConfidence) : 80;
  const riskApproved =
    status === "VALIDATED" &&
    !profile?.emergencyStop &&
    Number(analysis.confidence ?? 0) >= minimumConfidence;
  const decisionReason = !riskApproved
    ? profile?.emergencyStop
      ? "Emergency stop is active"
      : status !== "VALIDATED"
        ? allReasons.join("; ")
        : `Confidence is below the user's minimum of ${minimumConfidence}%`
    : null;

  await db.insert(signalDecisionsTable).values({
    id: crypto.randomUUID(),
    signalId,
    userId: input.userId,
    eligibilityStatus: riskApproved ? "ELIGIBLE" : "BLOCKED",
    eligible: riskApproved,
    riskApproved,
    executionMode: "MANUAL",
    reason: decisionReason,
  });

  await db
    .update(incomingMessagesTable)
    .set({
      processingStatus: status === "VALIDATED" ? "SIGNAL_CREATED" : "REJECTED",
      classification: "POTENTIAL_SIGNAL",
    })
    .where(eq(incomingMessagesTable.id, message.id));

  await recordEvent("SIGNAL", signal.id, "SIGNAL_VALIDATED", {
    status,
    reasons: allReasons,
    confidence: analysis.confidence,
  });
  await recordEvent("SIGNAL", signal.id, "USER_RISK_CHECKED", {
    eligible: riskApproved,
    reason: decisionReason,
  });
  await recordAudit(input.userId, "SIGNAL_PROCESSED", "SIGNAL", signal.id, status, {
    messageId: message.id,
    confidence: analysis.confidence,
    validationReasons: allReasons,
    riskApproved,
  });

  return {
    messageId: message.id,
    processingStatus: status === "VALIDATED" ? "SIGNAL_CREATED" : "REJECTED",
    classification: "POTENTIAL_SIGNAL",
    signalId: signal.id,
    duplicateOf: null,
    reason: allReasons.length ? allReasons.join("; ") : null,
  };
}

export async function findSignalForUser(signalId: string, userId: string) {
  const [signal] = await db
    .select({
      signal: signalsTable,
      source: signalSourcesTable,
      decision: signalDecisionsTable,
    })
    .from(signalsTable)
    .innerJoin(signalSourcesTable, eq(signalSourcesTable.id, signalsTable.sourceId))
    .leftJoin(
      signalDecisionsTable,
      and(eq(signalDecisionsTable.signalId, signalsTable.id), eq(signalDecisionsTable.userId, userId)),
    )
    .where(and(eq(signalsTable.id, signalId), eq(signalsTable.userId, userId)))
    .limit(1);
  return signal;
}