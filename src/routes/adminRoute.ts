import { Router } from "express";
import { createStudent, createLecturer } from "../controllers/adminController";
import {
  getAllStudents,
  getStudentProfile,
} from "../controllers/studentController";
import {
  getAllLecturers,
  getLecturerDetails,
} from "../controllers/lecturerController";
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
router.get(
  "/lecturer",
  authorize,
  authorizePermissions("admin"),
  getAllLecturers
);
router.get(
  "/lecturer/:userId",
  authorize,
  authorizePermissions("admin"),
  getLecturerDetails
);

export default router;
