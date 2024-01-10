import { Router } from "express";
import {
  createCourse,
  getAllCourses,
  getAllCategories,
} from "../controllers/courseController";
import { authorize, authorizePermissions } from "../middlewares/authorization";
const router = Router();

router.post("/", authorize, createCourse);
router.get("/", authorize, authorizePermissions("admin"), getAllCourses);
router.get("/categories", authorize, getAllCategories);

export default router;
