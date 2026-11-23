import "dotenv/config";
import { Pool } from "pg";

const isProduction = process.env.NODE_ENV === "production";

console.log("Database Host:", process.env.DB_HOST ?? "NOT SET");

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT ?? 5432),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 10,
  ssl: isProduction
    ? { rejectUnauthorized: true }
    : false,
});

export async function connectDB() {
  const client = await pool.connect();

  try {
    const result = await client.query(
      "SELECT current_database() AS database_name"
    );

    console.log(
      "PostgreSQL connected:",
      result.rows[0].database_name
    );
  } finally {
    client.release();
  }
}
