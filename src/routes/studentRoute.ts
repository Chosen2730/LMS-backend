import { Router } from "express";
import {
  createStudent,
  updateProfile,
  getProfile,
} from "../controllers/studentController";
import { authorize, authorizePermissions } from "../middlewares/authorization";
const router = Router();

router.post("/", authorize, authorizePermissions("admin"), createStudent);
router.get("/profile", authorize, getProfile);
router.patch("/update", authorize, updateProfile);

export default router;
