import { Router } from "express";
import { register, login, uploadImage } from "../controllers/authController";
import { authorize } from "../middlewares/authorization";
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.patch("/update-profile-picture", authorize, uploadImage);

export default router;
