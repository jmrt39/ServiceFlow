import { Router } from "express";
import { authorize } from "../middleware/authorize.js";
import { createJob } from "../modules/jobs/jobs.controller.js";

const router = Router();


router.post(
  "/",
  authorize("job.create"),
  createJob
);


export default router;