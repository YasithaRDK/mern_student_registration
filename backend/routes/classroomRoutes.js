import Router from "express";
import {
  addClassroom,
  deleteClassroom,
  getAllClassroom,
  getClassroom,
  updateClassroom,
} from "../controllers/classroomController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = Router();

router.use(protect);
router.route("/").get(getAllClassroom).post(addClassroom);
router
  .route("/:id")
  .get(getClassroom)
  .put(updateClassroom)
  .delete(deleteClassroom);

export default router;
