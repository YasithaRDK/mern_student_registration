import Router from "express";
import {
  addTeacher,
  deleteTeacher,
  getAllTeachers,
  getTeacher,
  updateTeacher,
} from "../controllers/teacherController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = Router();

router.use(protect);
router.route("/").post(addTeacher).get(getAllTeachers);
router.route("/:id").get(getTeacher).put(updateTeacher).delete(deleteTeacher);

export default router;
