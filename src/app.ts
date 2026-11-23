import express, { Request, Response } from "express";
import cors from "cors";
import studentsRoutes from "./routes/students.routes.ts";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

app.use(express.json());

// Root route (prevents 404 "Cannot GET /" when visiting the root Azure URL in browser)
app.get("/", (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: "AX Backend REST API is running",
    endpoints: {
      health: "GET /health or /api/health",
      students: "GET /students or /api/students",
      addStudent: "POST /add-student or /api/add-student",
    },
  });
});

// Health check endpoint (for Azure App Service / monitoring)
app.get("/health", (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: "AX Backend is running",
    timestamp: new Date().toISOString(),
  });
});

app.use("/", studentsRoutes);

export default app;
