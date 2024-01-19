import Router from "express";
import {
  addStudent,
  deleteStudent,
  getAllStudents,
  getSingleStudent,
  updateStudent,
} from "../controllers/studentController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = Router();

router.use(protect);
router.route("/").get(getAllStudents).post(addStudent);
router
  .route("/:id")
  .get(getSingleStudent)
  .put(updateStudent)
  .delete(deleteStudent);

export default router;
