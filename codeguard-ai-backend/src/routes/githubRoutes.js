import express from "express";
import protect from "../middleware/authMiddleware.js";
import { fetchRepos } from "../controllers/githubController.js";

const router = express.Router();

router.get("/repos/:username", protect, fetchRepos);

export default router;
