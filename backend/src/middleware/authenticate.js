import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  const header = req.header("Authorization");

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Missing or invalid Authorization header." });
  }

  const token = header.slice("Bearer ".length);

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = { id: payload.sub, username: payload.username };
    return next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token." });
  }
};

export default authenticate;
