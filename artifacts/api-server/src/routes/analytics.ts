import { Router, type IRouter } from "express";
import { GetAnalyticsOverviewResponse } from "@workspace/api-zod";
import { requireAuth } from "../middlewares/requireAuth";

const router: IRouter = Router();

router.get("/analytics/overview", requireAuth, async (_req, res): Promise<void> => {
  res.json(
    GetAnalyticsOverviewResponse.parse({
      totalTrades: 0,
      winRate: null,
      profitFactor: null,
      netPnl: null,
      maxDrawdown: null,
    }),
  );
});

export default router;