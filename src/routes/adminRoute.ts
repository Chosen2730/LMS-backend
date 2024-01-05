import { Router } from "express";
import { createStudent, createLecturer } from "../controllers/adminController";
import { authorize, authorizePermissions } from "../middlewares/authorization";
const router = Router();

router.post(
  "/student",
  authorize,
  authorizePermissions("admin"),
  createStudent
);
router.post(
  "/lecturer",
  authorize,
  authorizePermissions("admin"),
  createLecturer
);

export default router;
