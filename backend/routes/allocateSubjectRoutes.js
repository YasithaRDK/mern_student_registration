import Router from "express";
import {
  addAllocateSubject,
  deleteAllocateSubject,
  getAllAllocateSubject,
} from "../controllers/allocateSubjectController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = Router();

router.use(protect);
router.route("/").post(addAllocateSubject).get(getAllAllocateSubject);
router.route("/:id").delete(deleteAllocateSubject);

export default router;
