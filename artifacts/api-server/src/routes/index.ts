import express from "express";
import evaluationsRouter from "./evaluations.js";
import healthRouter from "./health.js";

const router = express.Router();

router.use(healthRouter);
router.use(evaluationsRouter);

export default router;
