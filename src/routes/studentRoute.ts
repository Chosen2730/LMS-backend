import { Router } from "express";
import { createStudent } from "../controllers/studentController";
import { authorize, authorizePermissions } from "../middlewares/authorization";
const router = Router();

router.post("/user", createStudent);

export default router;
