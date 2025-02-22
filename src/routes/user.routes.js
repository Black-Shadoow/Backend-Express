import { Router } from "express";
import registerUser from "../controllers/user.controllers.js";

const router = Router();

// Corrected: Pass the registerUser function directly
router.route("/register").post(registerUser);

export default router;