import { Router } from "express";
import { getUser } from "../controllers/userController";
import { authorize } from "../middlewares/authorization";
const router = Router();

router.get("/user", getUser);

export default router;
