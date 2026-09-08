import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, riskProfilesTable } from "@workspace/db";
import {
  GetRiskProfileResponse,
  UpdateRiskProfileBody,
  UpdateRiskProfileResponse,
} from "@workspace/api-zod";
import { getAuthenticatedUserId, requireAuth } from "../middlewares/requireAuth";

const router: IRouter = Router();

function toResponse(profile: typeof riskProfilesTable.$inferSelect) {
  return {
    riskPerTrade: Number(profile.riskPerTrade),
    maxDailyLoss: Number(profile.maxDailyLoss),
    maxOpenTrades: profile.maxOpenTrades,
    minimumConfidence: Number(profile.minimumConfidence),
    emergencyStop: profile.emergencyStop,
  };
}

router.get("/risk/profile", requireAuth, async (_req, res): Promise<void> => {
  const [profile] = await db
    .select()
    .from(riskProfilesTable)
    .where(eq(riskProfilesTable.userId, getAuthenticatedUserId(res)))
    .limit(1);

  res.json(
    GetRiskProfileResponse.parse(
      profile
        ? toResponse(profile)
        : {
            riskPerTrade: 1,
            maxDailyLoss: 0,
            maxOpenTrades: 0,
            minimumConfidence: 80,
            emergencyStop: false,
          },
    ),
  );
});

router.patch("/risk/profile", requireAuth, async (req, res): Promise<void> => {
  const parsed = UpdateRiskProfileBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const userId = getAuthenticatedUserId(res);
  const existing = await db
    .select()
    .from(riskProfilesTable)
    .where(eq(riskProfilesTable.userId, userId))
    .limit(1);

  const values = {
    riskPerTrade: parsed.data.riskPerTrade?.toString() ?? "1",
    maxDailyLoss: parsed.data.maxDailyLoss?.toString() ?? "0",
    maxOpenTrades: parsed.data.maxOpenTrades ?? 0,
    minimumConfidence: parsed.data.minimumConfidence?.toString() ?? "80",
    emergencyStop: parsed.data.emergencyStop ?? false,
  };

  const [profile] = existing[0]
    ? await db
        .update(riskProfilesTable)
        .set(values)
        .where(eq(riskProfilesTable.userId, userId))
        .returning()
    : await db
        .insert(riskProfilesTable)
        .values({ id: crypto.randomUUID(), userId, ...values })
        .returning();

  res.json(UpdateRiskProfileResponse.parse(toResponse(profile)));
});

export default router;