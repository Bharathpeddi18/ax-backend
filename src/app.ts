import express, { Request, Response } from "express";
import cors from "cors";
import studentsRoutes from "./routes/students.routes.ts";
import contentManagementRoutes from './modules/content-management/routes.ts'

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
      getAnnouncements: 'GET /content-management/announcements',
      postAnnouncements: 'POST /content-management/announcements',

      students: "GET /api/students",
      addStudent: "POST /api/add-student",
    },
  });
});

app.use('/content-management', contentManagementRoutes)

app.use('/api', studentsRoutes);

export default app;
