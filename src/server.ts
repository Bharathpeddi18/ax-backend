import "dotenv/config";
import app from "./app.ts";
import { connectDB, pool } from "./config/database.ts";

const PORT = Number(process.env.PORT ?? 5000);

async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`AX Backend running on port ${PORT}`);
    });
    
  } catch (error) {
    console.error("Backend startup failed:", error);
    await pool.end();
    process.exit(1);
  }
}

startServer();
