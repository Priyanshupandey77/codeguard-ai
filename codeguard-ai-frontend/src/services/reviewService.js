import api from "./api";

export const reviewCode = async (code) => {
  const token = localStorage.getItem("token");

  const response = await api.post(
    "/review",
    { code },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};