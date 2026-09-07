import { Router, type IRouter } from "express";
import evaluationsRouter from "./evaluations";
import healthRouter from "./health";

const router: IRouter = Router();

router.use(healthRouter);
router.use(evaluationsRouter);

export default router;
