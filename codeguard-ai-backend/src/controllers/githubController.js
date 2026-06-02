import { getUserRepos } from "../services/githubService.js";

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
