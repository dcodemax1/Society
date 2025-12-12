// modules/auth/auth.middleware.js
import jwt from "jsonwebtoken";
import pool from "../../config/db.js";

export const protect = async (req, res, next) => {
  try {
    const auth = req.headers.authorization || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
    if (!token) return res.status(401).json({ status: "error", message: "No token" });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const [rows] = await pool.query("SELECT id, email, is_verified FROM users WHERE id = ? LIMIT 1", [payload.id]);
    if (!rows.length) return res.status(401).json({ status: "error", message: "Invalid token user" });

    req.user = rows[0];
    next();
  } catch (err) {
    console.error("auth middleware:", err);
    return res.status(401).json({ status: "error", message: "Unauthorized" });
  }
};