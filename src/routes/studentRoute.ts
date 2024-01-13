import { Router } from "express";
import {
  updateProfile,
  getProfile,
  getEnrolledCourses,
} from "../controllers/studentController";
import { authorize } from "../middlewares/authorization";
const router = Router();

router.get("/profile", authorize, getProfile);
router.get("/enrolled-courses", authorize, getEnrolledCourses);
router.patch("/update", authorize, updateProfile);

export default router;
