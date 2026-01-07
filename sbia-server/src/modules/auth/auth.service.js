import pool from "../../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendOTP } from "../../utils/mailer.js";
import { generateOTP } from "../../jobs/generateOTP.js";

export const registerUser = async (email) => {
  const otp = generateOTP();
  const expires = new Date(Date.now() + 10 * 60 * 1000);

  await pool.query(
    `INSERT INTO users (email, otp_code, otp_expires_at, is_verified)
     VALUES (?, ?, ?, 0)
     ON DUPLICATE KEY UPDATE otp_code = VALUES(otp_code), otp_expires_at = VALUES(otp_expires_at);`,
    [email, otp, expires]
  );

  await sendOTP(email, otp);

  return { email };
};

export const verifyOTP = async (email, otp) => {
  const [rows] = await pool.query(
    `SELECT * FROM users WHERE email = ? LIMIT 1`,
    [email]
  );

  if (!rows.length) return null;

  const user = rows[0];

  if (user.otp_code !== otp) return false;
  if (new Date() > new Date(user.otp_expires_at)) return "expired";

  await pool.query(
    `UPDATE users SET is_verified = 1, otp_code = NULL, otp_expires_at = NULL WHERE email = ?`,
    [email]
  );

  return true;
};

export const setPassword = async (email, password) => {
  const hash = await bcrypt.hash(password, 10);

  await pool.query(`UPDATE users SET password_hash = ? WHERE email = ?`, [
    hash,
    email,
  ]);

  return true;
};

const ACCESS_EXPIRES = "15m";
const REFRESH_EXPIRES = "30d";

export const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: ACCESS_EXPIRES,
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: REFRESH_EXPIRES,
  });
  return { accessToken, refreshToken };
};

// Save hashed refresh token to DB for rotation/invalidations
export const saveRefreshTokenHash = async (userId, refreshToken) => {
  const hash = await bcrypt.hash(refreshToken, 10);
  await pool.query("UPDATE users SET refresh_token_hash = ? WHERE id = ?", [
    hash,
    userId,
  ]);
  return true;
};

export const clearRefreshToken = async (userId) => {
  await pool.query("UPDATE users SET refresh_token_hash = NULL WHERE id = ?", [
    userId,
  ]);
  return true;
};

// verify refresh token (presence + hash check)
export const verifyRefreshToken = async (refreshToken) => {
  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE id = ? LIMIT 1",
      [payload.id]
    );
    if (!rows.length) return null;
    const user = rows[0];
    if (!user.refresh_token_hash) return null;
    const ok = await bcrypt.compare(refreshToken, user.refresh_token_hash);
    if (!ok) return null;
    return user;
  } catch (err) {
    return null;
  }
};

// used for login credential check (already had this but centralize)
export const findUserByEmail = async (email) => {
  const [rows] = await pool.query(
    "SELECT * FROM users WHERE email = ? LIMIT 1",
    [email]
  );
  return rows[0] || null;
};
