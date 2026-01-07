import { success, error } from "../../utils/response.js";
import {
  registerUser,
  verifyOTP,
  verifyRefreshToken,
  setPassword,
  findUserByEmail,
  generateTokens,
  saveRefreshTokenHash,
  clearRefreshToken,
} from "./auth.service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const requestOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json(error("Email is required"));

    const user = await registerUser(email);
    return res.json(success("OTP sent", user));
  } catch (err) {
    return res.status(500).json(error(err.message));
  }
};

export const confirmOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const result = await verifyOTP(email, otp);

    if (result === false) return res.status(400).json(error("Invalid OTP"));

    if (result === "expired") return res.status(400).json(error("OTP expired"));

    return res.json(success("OTP verified"));
  } catch (err) {
    return res.status(500).json(error(err.message));
  }
};

export const setUserPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    await setPassword(email, password);

    return res.json(success("Password set successfully"));
  } catch (err) {
    return res.status(500).json(error(err.message));
  }
};

// helpers for cookie options
const cookieOptions = (req) => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // dev: false on localhost
  sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax",
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  path: "/", // optional, restrict refresh cookie path if desired
});

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json(error("email and password required"));

    const user = await findUserByEmail(email);
    if (!user) return res.status(400).json(error("invalid credentials"));

    // If user exists but has no password set, they need to set password first
    if (!user.password_hash) {
      return res.status(200).json(
        success("Password not set. Please set password first", {
          requiresPasswordSetup: true,
          email: user.email,
          role: user.role,
        })
      );
    }

    const match = await bcrypt.compare(password, user.password_hash || "");
    if (!match) return res.status(400).json(error("invalid credentials"));

    const payload = { id: user.id, email: user.email, role: user.role };
    const { accessToken, refreshToken } = generateTokens(payload);

    await saveRefreshTokenHash(user.id, refreshToken);

    res.cookie("refreshToken", refreshToken, cookieOptions(req));

    // return access token (short lived) — client should store in memory and send in Authorization header
    return res.json(
      success("Login successful", {
        accessToken,
        user: {
          id: user.id,
          email: user.email,
          is_verified: user.is_verified,
          role: user.role,
        },
      })
    );
  } catch (err) {
    return res.status(500).json(error("internal error"));
  }
};

export const refresh = async (req, res) => {
  try {
    const rt = req.cookies?.refreshToken;
    if (!rt) return res.status(401).json(error("no refresh token"));

    const user = await verifyRefreshToken(rt);
    if (!user) return res.status(401).json(error("invalid refresh token"));

    const payload = { id: user.id, email: user.email };
    const { accessToken, refreshToken } = generateTokens(payload);

    // save new refresh hash
    await saveRefreshTokenHash(user.id, refreshToken);

    res.cookie("refreshToken", refreshToken, cookieOptions(req));

    return res.json(success("Token refreshed", { accessToken }));
  } catch (err) {
    return res.status(500).json(error("internal error"));
  }
};

export const logout = async (req, res) => {
  try {
    // clear DB stored refresh hash and cookie
    const rt = req.cookies?.refreshToken;
    if (rt) {
      // try to verify to get user id - best effort
      const payload = (() => {
        try {
          return jwt.verify(rt, process.env.JWT_REFRESH_SECRET);
        } catch {
          return null;
        }
      })();
      if (payload?.id) await clearRefreshToken(payload.id);
    }
    res.clearCookie("refreshToken", { path: "/auth/refresh" });
    return res.json(success("Logged out"));
  } catch (err) {
    return res.status(500).json(error("internal error"));
  }
};

export const me = async (req, res) => {
  // Middleware should set req.user. If not present -> 401
  if (!req.user) return res.status(401).json(error("Unauthorized"));

  return res.json(
    success("me", {
      id: req.user.id,
      email: req.user.email,
      role: req.user.role,
      is_verified: req.user.is_verified,
    })
  );
};
