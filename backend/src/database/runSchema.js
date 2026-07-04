import "dotenv/config";

import fs from "fs/promises";

import pool from "./db.js";

try {
  console.log("Reading schema.sql...");

  const schema = await fs.readFile(
    new URL("./schema.sql", import.meta.url),
    "utf-8"
  );

  console.log("Executing schema...");

  await pool.query(schema);

  console.log("Database schema created successfully!");
} catch (error) {
  console.error("Failed to create database schema.");

  console.error(error);
} finally {
  await pool.end();
}
