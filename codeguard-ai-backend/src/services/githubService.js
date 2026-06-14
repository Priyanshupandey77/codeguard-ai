import axios from "axios";

export const getUserRepos = async (username) => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('GitHub API Error:', error.response?.data || error.message);
    // Return a meaningful error instead of letting the server crash/500
    res.status(error.response?.status || 500).json({
      error: 'Failed to fetch GitHub repositories',
      details: error.response?.data?.message || error.message
    });
  }
};

export const getRepoFiles = async (owner, repo, path = "") => {
  try {
    const url = path
      ? `https://api.github.com/repos/${owner}/${repo}/contents/${path}`
      : `https://api.github.com/repos/${owner}/${repo}/contents`;

    const response = await axios.get(url);

    return Array.isArray(response.data) ? response.data : [];
  } catch (err) {
    console.error(
      "GitHub file fetch failed:",
      err.response?.data || err.message,
    );
    throw err;
  }
};

export const getFileContent = async (owner, repo, path) => {
  const response = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
  );
  if (Array.isArray(response.data)) {
    return {
      type: "directory",
      items: response.data,
    };
  }

  const content = Buffer.from(response.data.content, "base64").toString(
    "utf-8",
  );

  return {
    type: "file",
    content,
  };
};
