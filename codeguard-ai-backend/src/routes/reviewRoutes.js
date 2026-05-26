import express from "express";
import {reviewCode} from "../controllers/reviewController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, reviewCode);

export default router;