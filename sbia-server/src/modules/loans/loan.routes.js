import { Router } from "express";
import {
  submitLoanApplication,
  fetchAllLoans,
  fetchLoanById,
  fetchLoansByMemberId,
  changeLoanStatus,
  fetchLoanStatistics,
} from "./loan.controller.js";
import { protect } from "../auth/auth.middleware.js";

const router = Router();

// Public routes (no authentication required for loan submission)
router.post("/submit", submitLoanApplication);
router.get("/member/:memberId", protect, fetchLoansByMemberId);
router.get("/details/:loanId", protect, fetchLoanById);

// Admin only routes
router.get("/", protect, fetchAllLoans); // Requires admin role in middleware
router.put("/:loanId/status", protect, changeLoanStatus); // Requires admin role in middleware
router.get("/statistics/dashboard", protect, fetchLoanStatistics); // Requires admin role in middleware

export default router;
