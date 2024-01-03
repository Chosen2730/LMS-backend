import { Router } from "express";
import { createStudent } from "../controllers/studentController";
import { authorize, authorizePermissions } from "../middlewares/authorization";
const router = Router();

router.post("/", authorize, authorizePermissions("admin"), createStudent);

export default router;
