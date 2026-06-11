import api from "./api";

export const getRepos = async (username) => {
  const token = localStorage.getItem("token");

  const response = await api.get(`/github/repos/${username}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const getRepoFiles = async (owner, repo, path = "") => {
  const token = localStorage.getItem("token");

  const response = await api.get(`/github/files/${owner}/${repo}`, {
    params: path ? { path } : {},
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const getFileContent = async (owner, repo, path) => {
  const token = localStorage.getItem("token");

  const response = await api.get(`/github/file/${owner}/${repo}`, {
    params: { path },
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};