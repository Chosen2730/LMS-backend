import { Router } from "express";
import {
  createCourse,
  getAllCourses,
  getAllCategories,
  updateCourseThumbnail,
  updateTrailer,
  enrol,
  getTutorCourses,
} from "../controllers/courseController";
import { authorize, authorizePermissions } from "../middlewares/authorization";
const router = Router();

router.post("/", authorize, createCourse);
router.get("/", getAllCourses);
router.get("/tutor", authorize, getTutorCourses);
router.get("/categories", authorize, getAllCategories);
router.get("/enrol/:courseId", authorize, enrol);
router.patch("/update-thumbnail/:courseId", authorize, updateCourseThumbnail);
router.patch("/update-trailer/:courseId", authorize, updateTrailer);

export default router;
