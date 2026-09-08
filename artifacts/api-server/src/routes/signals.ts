import { Router, type IRouter } from "express";
import { ListSignalsQueryParams, ListSignalsResponse } from "@workspace/api-zod";
import { requireAuth } from "../middlewares/requireAuth";

const router: IRouter = Router();

router.get("/signals", requireAuth, async (req, res): Promise<void> => {
  const parsed = ListSignalsQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  res.json(ListSignalsResponse.parse([]));
});

export default router;