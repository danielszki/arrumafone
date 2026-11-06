import { Router, type IRouter } from "express";
import evaluationsRouter from "./evaluations.js";
import healthRouter from "./health.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use(evaluationsRouter);

export default router;
