import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getReviewHistory } from "../controllers/historyController.js";

const router = express.Router();

router.get("/", protect, getReviewHistory);

export default router;