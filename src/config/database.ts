
import { Pool } from "pg";
import "dotenv/config";

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT ?? 5432),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 10,
  ssl: {
    rejectUnauthorized: true,
  },
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
