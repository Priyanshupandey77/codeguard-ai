import api from "./api";

export const getHistory = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/history", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
