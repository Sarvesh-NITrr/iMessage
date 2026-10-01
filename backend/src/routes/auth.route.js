import express from "express";
const router = express.Router();
import {checkAuth} from "../controllers/auth.controller.js";
import {protectRoute} from "../routes/auth.route.js";
//  /api/auth...
router.get("/check",protectRoute,checkAuth);

export default router;