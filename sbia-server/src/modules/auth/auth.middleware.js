// modules/auth/auth.middleware.js
import jwt from "jsonwebtoken";
import pool from "../../config/db.js";

export const protect = async (req, res, next) => {
  try {
    const auth = req.headers.authorization || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
    if (!token)
      return res.status(401).json({ status: "error", message: "No token" });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const [rows] = await pool.query(
      "SELECT id, email, is_verified, role FROM users WHERE id = ? LIMIT 1",
      [payload.id]
    );
    if (!rows.length)
      return res
        .status(401)
        .json({ status: "error", message: "Invalid token user" });

    req.user = rows[0];
    next();
  } catch (err) {
    console.error("auth middleware:", err);
    return res.status(401).json({ status: "error", message: "Unauthorized" });
  }
};

/**
 * Admin protection middleware
 * Only allows users with admin role to access the route
 */
export const protectAdmin = async (req, res, next) => {
  try {
    const auth = req.headers.authorization || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
    if (!token)
      return res
        .status(401)
        .json({ status: "error", message: "No token provided" });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const [rows] = await pool.query(
      "SELECT id, email, is_verified, role FROM users WHERE id = ? LIMIT 1",
      [payload.id]
    );

    if (!rows.length) {
      return res
        .status(401)
        .json({ status: "error", message: "User not found" });
    }

    const user = rows[0];

    // Check if user has admin role
    if (user.role !== "admin") {
      return res
        .status(403)
        .json({
          status: "error",
          message: "Access denied. Admin role required.",
        });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("admin protect middleware:", err);
    return res.status(401).json({ status: "error", message: "Unauthorized" });
  }
};
