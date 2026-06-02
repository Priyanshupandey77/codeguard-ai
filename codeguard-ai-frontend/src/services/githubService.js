import api from "./api";

export const getRepos = async (username) => {
  const token = localStorage.getItem("token");

  const response = await api.get(`/github/repos/${username}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
