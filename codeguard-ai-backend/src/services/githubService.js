import axios from "axios";

const githubConfig = {
  headers: {
    Authorization: `token ${process.env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
  },
};

export const getUserRepos = async (username) => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos`,
      githubConfig,
    );

    return response.data;
  } catch (error) {
    console.error("GitHub API Error:", error.response?.data || error.message);

    throw error;
  }
};

export const getRepoFiles = async (owner, repo, path = "") => {
  console.log("Token available:", !!process.env.GITHUB_TOKEN);
  try {
    const url = path
      ? `https://api.github.com/repos/${owner}/${repo}/contents/${path}`
      : `https://api.github.com/repos/${owner}/${repo}/contents`;

    const response = await axios.get(url, githubConfig);

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
    githubConfig,
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
