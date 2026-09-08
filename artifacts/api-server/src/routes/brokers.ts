import { Router, type IRouter } from "express";
import { ListBrokerAccountsResponse } from "@workspace/api-zod";
import { requireAuth } from "../middlewares/requireAuth";

const router: IRouter = Router();

router.get("/broker-accounts", requireAuth, async (_req, res): Promise<void> => {
  res.json(ListBrokerAccountsResponse.parse([]));
});

export default router;