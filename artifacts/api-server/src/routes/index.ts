import { Router, type IRouter } from "express";
import healthRouter from "./health";
import dashboardRouter from "./dashboard";
import signalsRouter from "./signals";
import sourcesRouter from "./sources";
import brokersRouter from "./brokers";
import riskRouter from "./risk";
import analyticsRouter from "./analytics";
import providersRouter from "./providers";
import pipelineRouter from "./pipeline";

const router: IRouter = Router();

router.use(healthRouter);
router.use(dashboardRouter);
router.use(signalsRouter);
router.use(sourcesRouter);
router.use(brokersRouter);
router.use(riskRouter);
router.use(analyticsRouter);
router.use(providersRouter);
router.use(pipelineRouter);

export default router;
