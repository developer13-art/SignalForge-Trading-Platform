import { Router, type IRouter } from "express";
import { desc, eq } from "drizzle-orm";
import { db, signalSourcesTable } from "@workspace/db";
import {
  GetDashboardSummaryResponse,
  ListActivityResponse,
} from "@workspace/api-zod";
import { requireAuth, getAuthenticatedUserId } from "../middlewares/requireAuth";

const router: IRouter = Router();

router.get("/dashboard/summary", requireAuth, async (_req, res): Promise<void> => {
  const userId = getAuthenticatedUserId(res);
  const sources = await db
    .select({ id: signalSourcesTable.id })
    .from(signalSourcesTable)
    .where(eq(signalSourcesTable.userId, userId))
    .orderBy(desc(signalSourcesTable.createdAt));

  const data = GetDashboardSummaryResponse.parse({
    account: {
      name: "Your account",
      initials: "YA",
      role: "TRADER",
    },
    kyc: {
      status: "NOT_STARTED",
      label: "Account not verified",
    },
    subscription: {
      status: "TRIAL",
      plan: "Explorer",
      renewsAt: null,
    },
    trading: {
      environment: "DEMO",
      brokerStatus: "NOT_CONNECTED",
      automation: "OFF",
    },
    metrics: {
      balance: null,
      equity: null,
      openPositions: 0,
      todayPnl: null,
    },
  });

  res.setHeader("X-Connected-Sources", String(sources.length));
  res.json(data);
});

router.get("/activity", requireAuth, async (_req, res): Promise<void> => {
  res.json(ListActivityResponse.parse([]));
});

export default router;