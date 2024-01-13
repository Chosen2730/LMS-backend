import { Router } from "express";
import {
  getRequests,
  makeTutorRequest,
  appproveRequest,
} from "../controllers/tutorController";
import { authorize, authorizePermissions } from "../middlewares/authorization";
const router = Router();

router.get("/create", authorize, makeTutorRequest);
router.get("/get", authorize, authorizePermissions("admin"), getRequests);
router.get(
  "/approve/:id",
  authorize,
  authorizePermissions("admin"),
  appproveRequest
);

export default router;
