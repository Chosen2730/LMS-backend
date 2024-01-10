import { Router } from "express";
import {
  createModule,
  getAllModules,
  createSection,
  getUserCourseModules,
} from "../controllers/courseModuleController";
import { authorize, authorizePermissions } from "../middlewares/authorization";
const router = Router();

router.post("/", authorize, createModule);
router.post("/section", authorize, createSection);
router.get("/get-all", authorize, authorizePermissions("admin"), getAllModules);
router.get("/", authorize, getUserCourseModules);

export default router;
