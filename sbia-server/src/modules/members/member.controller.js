import {
  saveMember,
  fetchMemberUsingAadhaar,
  fetchMembers,
  fetchMemberById,
} from "./member.service.js";

import { normalizeMemberInput } from "../../utils/normalizeMember.js";
import { success, error } from "../../utils/response.js";

export const submitMember = async (req, res) => {
  try {
    const raw = req.body;

    console.log("========================================");
    console.log("📥 NEW SUBMISSION RECEIVED");
    console.log("========================================");
    console.log(
      "🔍 Raw request body keys:",
      Object.keys(raw).slice(0, 10),
      "..."
    );
    console.log("📊 Total fields received:", Object.keys(raw).length);

    // Log critical fields
    console.log("📋 Critical Fields:");
    console.log("  • full_name:", raw.full_name);
    console.log("  • mobile:", raw.mobile);
    console.log("  • member_id:", raw.member_id);
    console.log("  • perm_state:", raw.perm_state);
    console.log("  • membership_type:", raw.membership_type);

    if (!raw.full_name || !raw.mobile) {
      console.error("❌ VALIDATION FAILED: Missing required fields");
      return res
        .status(400)
        .json(error("full_name and mobile are required fields"));
    }

    if (raw.member_aadhaar) {
      console.log("🔍 Checking Aadhaar uniqueness:", raw.member_aadhaar);
      const existing = await fetchMemberUsingAadhaar(raw.member_aadhaar);
      if (existing) {
        console.error("❌ Aadhaar already exists");
        return res
          .status(400)
          .json(error("Member with this Aadhaar already exists"));
      }
    }

    // Normalize snake_case to camelCase
    console.log("🔄 Normalizing data...");
    const data = normalizeMemberInput(raw);

    console.log("✅ Normalized data with memberId:", data.memberId);
    console.log(
      "✅ Normalized data keys:",
      Object.keys(data).slice(0, 15),
      "..."
    );

    // Save
    console.log("💾 Calling saveMember...");
    const member = await saveMember(data);

    if (!member) {
      console.error("❌ saveMember returned null/undefined");
      return res.status(500).json(error("Failed to save member to database"));
    }

    console.log("✅ Member saved successfully:", member.member_id);
    console.log("✅ Response object:", Object.keys(member).slice(0, 10), "...");
    return res.status(201).json(success("Member created", member));
  } catch (err) {
    console.error("========================================");
    console.error("❌ ERROR in submitMember");
    console.error("========================================");
    console.error("📍 Error message:", err.message);
    console.error("📍 Error code:", err.code);
    console.error("📍 Full Error:", err);
    console.error("========================================");
    return res.status(500).json(error(err.message || "Internal server error"));
  }
};

export const getMembers = async (req, res) => {
  try {
    const members = await fetchMembers();
    return res.json(success("Members fetched", members));
  } catch (err) {
    return res.status(500).json(error("Failed to fetch members"));
  }
};

export const getMemberById = async (req, res) => {
  try {
    const { member_id } = req.params;
    const member = await fetchMemberById(member_id);

    if (!member) return res.status(404).json(error("Member not found"));

    return res.json(success("Member fetched", member));
  } catch (err) {
    return res.status(500).json(error("Failed to fetch member"));
  }
};
