import pool from "../config/db.js";

/**
 * Ensures admin email exists in the database
 * Called on server startup
 * If admin email doesn't exist, it creates it with role='admin' and is_verified=1
 * Admin can then set their password and login
 */
export const ensureAdminExists = async () => {
  try {
    // Use INSERT IGNORE to insert only if email doesn't exist
    await pool.query(
      `INSERT IGNORE INTO users (email, role, is_verified, is_profile_completed)
       VALUES (?, ?, 1, 0)`,
      ["admin@gmail.com", "admin"]
    );
    console.log("✓ Admin email ensured in database");
  } catch (err) {
    console.error("Error ensuring admin exists:", err.message);
  }
};
