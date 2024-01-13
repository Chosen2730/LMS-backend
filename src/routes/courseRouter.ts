import { Router } from "express";
import {
  createCourse,
  getAllCourses,
  getAllCategories,
  updateCourseThumbnail,
  updateTrailer,
  enrol,
} from "../controllers/courseController";
import { authorize, authorizePermissions } from "../middlewares/authorization";
const router = Router();

router.post("/", authorize, createCourse);
router.get("/", authorize, getAllCourses);
router.get("/categories", authorize, getAllCategories);
router.get("/enrol/:courseId", authorize, enrol);
router.patch("/update-thumbnail/:courseId", authorize, updateCourseThumbnail);
router.patch("/update-trailer/:courseId", authorize, updateTrailer);

export default router;
