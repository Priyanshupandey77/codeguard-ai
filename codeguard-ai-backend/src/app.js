import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";
import githubRoutes from "./routes/githubRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/github", githubRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "CodeGuard AI Backend Running 🚀",
  });
});

export default app;
