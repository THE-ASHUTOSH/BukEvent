import { registerUser, signinUser, getUserProfile } from "../controllers/auth.controller.js";
import { Router } from "express";

const router = Router();

router.route('/register').post(registerUser);
router.route('/signin').post(signinUser);
router.route('/profile').get(getUserProfile);

export default router;