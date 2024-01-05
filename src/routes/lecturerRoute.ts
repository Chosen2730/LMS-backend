import { Router } from "express";
import { updateProfile, getProfile } from "../controllers/lecturerController";
import { authorize } from "../middlewares/authorization";
const router = Router();

router.get("/profile", authorize, getProfile);
router.patch("/update", authorize, updateProfile);

export default router;
