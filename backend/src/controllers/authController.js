import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { findAdminByUsername } from "../repositories/adminRepository.js";

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: "Username and password are required." });
    }

    const admin = await findAdminByUsername(username);

    const passwordHash = admin?.password_hash ?? "$2b$10$invalidsaltinvalidsaltinvalidsaltinvalidsalt";
    const isValid = await bcrypt.compare(password, passwordHash);

    if (!admin || !isValid) {
      return res.status(401).json({ success: false, message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { sub: admin.id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    return res.json({ success: true, token, username: admin.username });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export default login;
