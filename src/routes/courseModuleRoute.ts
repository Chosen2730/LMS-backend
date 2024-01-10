import { Router } from "express";
import {
  createModule,
  getAllModules,
  createSection,
  deleteSection,
} from "../controllers/courseModuleController";
import { authorize, authorizePermissions } from "../middlewares/authorization";
const router = Router();

router.post("/", authorize, createModule);
router.post("/section", authorize, createSection);
router.get("/:courseId", authorize, getAllModules);
router.delete("/section/:sectionId", authorize, deleteSection);

export default router;
