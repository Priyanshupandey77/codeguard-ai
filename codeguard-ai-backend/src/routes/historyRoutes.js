import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  clearHistory,
  getReviewHistory,
} from "../controllers/historyController.js";

const router = express.Router();

router.get("/", protect, getReviewHistory);
router.delete("/clear", protect, clearHistory);

export default router;
