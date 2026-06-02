import express from "express";
import protect from "../middleware/authMiddleware.js";
import { fetchRepos, fetchRepoFiles } from "../controllers/githubController.js";

const router = express.Router();

router.get("/repos/:username", protect, fetchRepos);
router.get("/files/:owner/:repo", protect, fetchRepoFiles);

export default router;
