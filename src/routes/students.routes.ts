import { Router } from "express";
import { pool } from "../config/database.ts";

const router = Router();

router.get("/students", async (_req, res, next) => {
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

// POST: Add a new student
router.post("/add-student", async (req, res, next) => {
  try {

    const { name, class_id, photo_id } = req.body;

    const result = await pool.query(
      `INSERT INTO students (name, class_id, photo_id)
       VALUES ($1, $2, $3)
       RETURNING id, name, class_id, photo_id`,
      [name, class_id, photo_id ?? null]
    );

    res.status(201).json({
      success: true,
      message: "Student added successfully",
      data: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
});

export default router;
