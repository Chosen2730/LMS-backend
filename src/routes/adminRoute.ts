import { Router } from "express";
import { createStudent, createLecturer } from "../controllers/adminController";
import {
  getAllStudents,
  getStudentProfile,
} from "../controllers/studentController";
import { authorize, authorizePermissions } from "../middlewares/authorization";
const router = Router();

router.post(
  "/student",
  authorize,
  authorizePermissions("admin"),
  createStudent
);

router.get(
  "/student",
  authorize,
  authorizePermissions("admin"),
  getAllStudents
);

router.get(
  "/student/:userId",
  authorize,
  authorizePermissions("admin"),
  getStudentProfile
);

router.post(
  "/lecturer",
  authorize,
  authorizePermissions("admin"),
  createLecturer
);

export default router;
