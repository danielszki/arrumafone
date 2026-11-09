import { Router, type Router as ExpressRouter } from "express";
import evaluationsRouter from "./evaluations.js";
import healthRouter from "./health.js";

const router: ExpressRouter = Router();

router.use(healthRouter);
router.use(evaluationsRouter);

export default router;
