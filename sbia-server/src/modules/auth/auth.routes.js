import { Router } from "express";
import {
  requestOTP,
  confirmOTP,
  setUserPassword,
  login,
  refresh,
  logout,
  me,
} from "./auth.controller.js";
import { protect } from "./auth.middleware.js";
const router = Router();

router.post("/request-otp", requestOTP);
router.post("/verify-otp", confirmOTP);
router.post("/set-password", setUserPassword);
router.post("/login", login);
router.post("/refresh", refresh); // client can call this to renew access token
router.post("/logout", logout);
router.get("/me", protect, me);


export default router;