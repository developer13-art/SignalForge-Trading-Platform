import { Router, type IRouter } from "express";
import { and, desc, eq } from "drizzle-orm";
import { db, signalSourcesTable } from "@workspace/db";
import {
  CreateSignalSourceBody,
  CreateSignalSourceResponse,
  ListSignalSourcesResponse,
  UpdateSignalSourceBody,
  UpdateSignalSourceParams,
  UpdateSignalSourceResponse,
} from "@workspace/api-zod";
import { getAuthenticatedUserId, requireAuth } from "../middlewares/requireAuth";

const router: IRouter = Router();

function toResponse(source: typeof signalSourcesTable.$inferSelect) {
  return {
    id: source.id,
    name: source.name,
    type: source.type,
    status: source.status,
    channelCount: source.channelCount,
    lastMessageAt: source.lastMessageAt?.toISOString() ?? null,
  };
}

router.get("/signal-sources", requireAuth, async (_req, res): Promise<void> => {
  const userId = getAuthenticatedUserId(res);
  const sources = await db
    .select()
    .from(signalSourcesTable)
    .where(eq(signalSourcesTable.userId, userId))
    .orderBy(desc(signalSourcesTable.createdAt));

  res.json(ListSignalSourcesResponse.parse(sources.map(toResponse)));
});

router.post("/signal-sources", requireAuth, async (req, res): Promise<void> => {
  const parsed = CreateSignalSourceBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [source] = await db
    .insert(signalSourcesTable)
    .values({
      id: crypto.randomUUID(),
      userId: getAuthenticatedUserId(res),
      name: parsed.data.name,
      type: parsed.data.type,
    })
    .returning();

  res.status(201).json(CreateSignalSourceResponse.parse(toResponse(source)));
});

router.patch("/signal-sources/:id", requireAuth, async (req, res): Promise<void> => {
  const params = UpdateSignalSourceParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const parsed = UpdateSignalSourceBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [source] = await db
    .update(signalSourcesTable)
    .set(parsed.data)
    .where(
      and(
        eq(signalSourcesTable.id, params.data.id),
        eq(signalSourcesTable.userId, getAuthenticatedUserId(res)),
      ),
    )
    .returning();

  if (!source) {
    res.status(404).json({ error: "Signal source not found" });
    return;
  }

  res.json(UpdateSignalSourceResponse.parse(toResponse(source)));
});

export default router;