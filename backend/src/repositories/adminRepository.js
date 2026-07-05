import pool from "../database/db.js";

export const findAdminByUsername = async (username) => {
  const query = `SELECT * FROM admins WHERE username = $1 LIMIT 1;`;
  const result = await pool.query(query, [username]);
  return result.rows[0] || null;
};

export const insertAdmin = async (username, passwordHash) => {
  const query = `
    INSERT INTO admins (username, password_hash)
    VALUES ($1, $2)
    RETURNING id, username, created_at;
  `;
  const result = await pool.query(query, [username, passwordHash]);
  return result.rows[0];
};
