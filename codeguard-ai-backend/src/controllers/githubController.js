import { getUserRepos } from "../services/githubService.js";
import { getRepoFiles } from "../services/githubService.js";
import { getFileContent } from "../services/githubService.js";

export const fetchRepos = async (req, res) => {
  try {
    const { username } = req.params;

    const repos = await getUserRepos(username);

    return res.json({
      success: true,
      repos,
    });
  } catch (error) {
    console.error(
      "🔥 GitHub Repos Error:",
      error.response?.data || error.message,
    );

    return res.status(500).json({
      success: false,
      message: error.response?.data?.message || error.message,
    });
  }
};

export const fetchRepoFiles = async (req, res) => {
  try {
    const { owner, repo } = req.params;
    const path = req.query.path || "";

    const files = await getRepoFiles(owner, repo, path);

    return res.json({
      success: true,
      files,
    });
  } catch (error) {
    console.error("Repo Files Error:", error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const fetchFileContent = async (req, res) => {
  try {
    const { owner, repo } = req.params;
    const { path } = req.query;

    const content = await getFileContent(owner, repo, path);

    res.json({
      success: true,
      content,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
