import { Router } from "express";
import {
  submitMember,
  getMembers,
  getMemberById,
  getIntroducerDetails,
  getReferrals,
} from "./member.controller.js";

const router = Router();

// Create new member
router.post("/", submitMember);

// List all members
router.get("/", getMembers);

// Get all referral data (must come before /:id)
router.get("/referrals/all", getReferrals);

// Get introducer details by member ID (must come before /:id)
router.get("/:id/introducer", getIntroducerDetails);

// Get single member by id
router.get("/:id", getMemberById);

export default router;
