import { Router } from "express";
import {
  submitMember,
  getMembers,
  getMemberById,
  getIntroducerDetails,
} from "./member.controller.js";

const router = Router();

// Create new member
router.post("/", submitMember);

// List all members
router.get("/", getMembers);

// Get single member by id
router.get("/:id", getMemberById);

// Get introducer details by member ID
router.get("/:id/introducer", getIntroducerDetails);

export default router;
