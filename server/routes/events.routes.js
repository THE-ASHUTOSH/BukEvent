import { Router } from "express";
import { returnEvents } from "../controllers/events.controller.js";

const router = Router();

router.route('/events').get(returnEvents)

export default router;