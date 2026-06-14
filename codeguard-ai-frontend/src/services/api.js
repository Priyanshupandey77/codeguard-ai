import axios from "axios";

const api = axios.create({
  baseURL: "https://codeguard-ai-nh4z.onrender.com/api",
});

export default api;
