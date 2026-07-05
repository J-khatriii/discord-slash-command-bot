// Usage: node src/scripts/createAdmin.js <username> <password>
import "dotenv/config";
import bcrypt from "bcrypt";

import pool from "../database/db.js";
import { insertAdmin, findAdminByUsername } from "../repositories/adminRepository.js";

const [, , username, password] = process.argv;

const run = async () => {
  if (!username || !password) {
    console.error("Usage: node src/scripts/createAdmin.js <username> <password>");
    process.exit(1);
  }

  if (password.length < 8) {
    console.error("Password must be at least 8 characters.");
    process.exit(1);
  }

  const existing = await findAdminByUsername(username);

  if (existing) {
    console.error(`Admin "${username}" already exists.`);
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const admin = await insertAdmin(username, passwordHash);

  console.log(`Created admin "${admin.username}" (id ${admin.id}).`);
  await pool.end();
};

run().catch((error) => {
  console.error("Failed to create admin:", error);
  process.exit(1);
});
