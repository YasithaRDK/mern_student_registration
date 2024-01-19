import Router from "express";
import {
  addAllocateClassroom,
  deleteAllocateClassroom,
  getAllAllocateClassroom,
} from "../controllers/allocateClassroomController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = Router();

router.use(protect);
router.route("/").post(addAllocateClassroom).get(getAllAllocateClassroom);
router.route("/:id").delete(deleteAllocateClassroom);

export default router;
