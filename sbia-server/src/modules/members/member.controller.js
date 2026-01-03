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

    console.log("API received data, checking required fields...");
    console.log("full_name:", raw.full_name);
    console.log("mobile:", raw.mobile);

    if (!raw.full_name || !raw.mobile) {
      return res
        .status(400)
        .json(error("full_name and mobile are required fields"));
    }

    if (raw.member_aadhaar) {
      const existing = await fetchMemberUsingAadhaar(raw.member_aadhaar);
      if (existing) {
        return res
          .status(400)
          .json(error("Member with this Aadhaar already exists"));
      }
    }

    console.log("Normalizing data...");
    const data = normalizeMemberInput(raw);

    console.log("Calling saveMember...");
    const member = await saveMember(data);

    if (!member) {
      return res.status(500).json(error("Failed to save member to database"));
    }
    console.log("SUCCESS: Member saved with ID:", member.member_id);
    return res.status(201).json(success("Member created", member));
  } catch (err) {
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
    const { id } = req.params;
    const member = await fetchMemberById(id);

    if (!member) return res.status(404).json(error("Member not found"));

    return res.json(success("Member fetched", member));
  } catch (err) {
    console.error("Error fetching member:", err);
    return res.status(500).json(error("Failed to fetch member"));
  }
};
export const getIntroducerDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await fetchMemberById(id);

    if (!member) return res.status(404).json(error("Member not found"));

    // Return introducer details from database fields
    return res.json(
      success("Introducer details fetched", {
        introducerName: member.introducer_name,
        introducerMemberId: member.introducer_member_id,
        introducerMobile: member.introducer_mobile,
      })
    );
  } catch (err) {
    return res.status(500).json(error("Failed to fetch introducer details"));
  }
};
