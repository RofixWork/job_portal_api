import { Router } from "express";
import JobController from "../controllers/job.controller.js";
import { validateIdParam, validateJob } from "../middlewares/validation.js";

const jobRouter = Router();

jobRouter
  .route("/")
  .get(JobController.all)
  .post(validateJob, JobController.create);

jobRouter
  .route("/:id")
  .get(validateIdParam, JobController.get)
  .patch(validateIdParam, validateJob, JobController.update)
  .delete(validateIdParam, JobController.delete);

export default jobRouter;
