import { Router } from "express";
import { createCourse } from "../controllers/courseController";
import { authorize } from "../middlewares/authorization";
const router = Router();

router.post("/", authorize, createCourse);

export default router;
