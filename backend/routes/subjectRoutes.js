import Router from "express";
import {
  addSubject,
  deleteSubject,
  getAllSubject,
  getSubject,
  updateSubject,
} from "../controllers/subjectController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = Router();

router.use(protect);
router.route("/").post(addSubject).get(getAllSubject);
router.route("/:id").get(getSubject).put(updateSubject).delete(deleteSubject);

export default router;
