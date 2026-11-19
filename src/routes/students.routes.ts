import { Router } from "express";
import { pool } from "../config/database.ts";

const router = Router();

router.get("/", async (_req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT id, name, class_id, photo_id FROM students ORDER BY id"
    );

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    next(error);
  }
});

export default router;