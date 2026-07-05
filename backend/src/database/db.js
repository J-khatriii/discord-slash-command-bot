import pg from "pg";

const { Pool } = pg;

const useSsl = process.env.DB_SSL
  ? process.env.DB_SSL === "true"
  : !/localhost|127\.0\.0\.1/.test(process.env.DATABASE_URL || "");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: useSsl ? { rejectUnauthorized: false } : false,
});

export default pool;
