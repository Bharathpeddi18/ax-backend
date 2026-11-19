import express from "express";
import cors from "cors";
import studentsRoutes from "./routes/students.routes.ts";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "AX Backend is running",
  });
});

app.use("/api", studentsRoutes);

export default app;