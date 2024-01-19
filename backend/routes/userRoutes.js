import Router from "express";
import { loginUser, registerUser } from "../controllers/userController.js";
import { protect, isAdmin } from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/").post(protect, isAdmin, registerUser);
router.route("/login").post(loginUser);

export default router;
