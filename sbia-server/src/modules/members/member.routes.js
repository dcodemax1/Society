
import { Router } from "express";
import {
  submitMember,
  getMembers,
  getMemberById,
} from "./member.controller.js";

const router = Router();

// Create new member
router.post("/", submitMember);

// List all members
router.get("/", getMembers);

// Get single member by id
router.get("/:id", getMemberById);

export default router;