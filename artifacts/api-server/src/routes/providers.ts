import { Router, type IRouter } from "express";
import { ListProvidersResponse } from "@workspace/api-zod";
import { requireAuth } from "../middlewares/requireAuth";

const router: IRouter = Router();

router.get("/providers", requireAuth, async (_req, res): Promise<void> => {
  res.json(ListProvidersResponse.parse([]));
});

export default router;