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

export const clearHistory = async () => {
  const token = localStorage.getItem("token");

  const response = await api.delete("/history/clear", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
