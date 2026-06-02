import { getUserRepos } from "../services/githubService.js";
import { getRepoFiles } from "../services/githubService.js";

export const fetchRepos = async (req, res) => {
  try {
    const { username } = req.params;

    const repos = await getUserRepos(username);

    res.json({
      success: true,
      repos,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const fetchRepoFiles = async (req, res) => {
  try {
    const { owner, repo } = req.params;

    const files = await getRepoFiles(owner, repo);

    res.json({
      success: true,
      files,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
