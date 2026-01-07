import {
  saveMember,
  fetchMemberUsingAadhaar,
  fetchMembers,
  fetchMemberById,
  getReferralData,
} from "./member.service.js";

import { normalizeMemberInput } from "../../utils/normalizeMember.js";
import { success, error } from "../../utils/response.js";

export const submitMember = async (req, res) => {
  try {
    console.log("\n ===== NEW MEMBER SUBMISSION RECEIVED =====");
    console.log(" Timestamp:", new Date().toISOString());

    const raw = req.body;

    console.log(" API received data, checking required fields...");
    console.log(" full_name:", raw.full_name);
    console.log(" mobile:", raw.mobile);

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

    // Handle uploaded files - convert file objects to Cloudinary URLs
    const filePaths = {};
    if (req.files) {
      console.log(" Processing uploaded files...");
      console.log(" req.files keys:", Object.keys(req.files));

      if (req.files.passportPhoto && req.files.passportPhoto[0]) {
        filePaths.member_photo_path = req.files.passportPhoto[0].path; // Cloudinary URL
        console.log(
          "✓ PASSPORT PHOTO uploaded:",
          req.files.passportPhoto[0].originalname,
          "->",
          req.files.passportPhoto[0].path
        );
      }
      if (req.files.signatureFile && req.files.signatureFile[0]) {
        filePaths.member_signature_path = req.files.signatureFile[0].path;
        console.log(
          "✓ SIGNATURE uploaded:",
          req.files.signatureFile[0].originalname,
          "->",
          req.files.signatureFile[0].path
        );
      }
      if (req.files.aadhaarFrontFile && req.files.aadhaarFrontFile[0]) {
        filePaths.aadhaar_front_path = req.files.aadhaarFrontFile[0].path;
        console.log(
          "✓ AADHAAR FRONT uploaded:",
          req.files.aadhaarFrontFile[0].originalname,
          "->",
          req.files.aadhaarFrontFile[0].path
        );
      }
      if (req.files.aadhaarBackFile && req.files.aadhaarBackFile[0]) {
        filePaths.aadhaar_back_path = req.files.aadhaarBackFile[0].path;
        console.log(
          "✓ AADHAAR BACK uploaded:",
          req.files.aadhaarBackFile[0].originalname,
          "->",
          req.files.aadhaarBackFile[0].path
        );
      }
      if (req.files.panFile && req.files.panFile[0]) {
        filePaths.pan_doc_path = req.files.panFile[0].path;
        console.log(
          "✓ PAN CARD uploaded:",
          req.files.panFile[0].originalname,
          "->",
          req.files.panFile[0].path
        );
      }
      if (req.files.bankDocument && req.files.bankDocument[0]) {
        filePaths.bank_doc_path = req.files.bankDocument[0].path;
        console.log(
          "✓ BANK DOCUMENT uploaded:",
          req.files.bankDocument[0].originalname,
          "->",
          req.files.bankDocument[0].path
        );
      }
      if (
        req.files.nomineeAadhaarFrontFile &&
        req.files.nomineeAadhaarFrontFile[0]
      ) {
        filePaths.nominee_aadhaar_front_path =
          req.files.nomineeAadhaarFrontFile[0].path;
        console.log(
          "✓ NOMINEE AADHAAR FRONT uploaded:",
          req.files.nomineeAadhaarFrontFile[0].originalname,
          "->",
          req.files.nomineeAadhaarFrontFile[0].path
        );
      }
      if (
        req.files.nomineeAadhaarBackFile &&
        req.files.nomineeAadhaarBackFile[0]
      ) {
        filePaths.nominee_aadhaar_back_path =
          req.files.nomineeAadhaarBackFile[0].path;
        console.log(
          "✓ NOMINEE AADHAAR BACK uploaded:",
          req.files.nomineeAadhaarBackFile[0].originalname,
          "->",
          req.files.nomineeAadhaarBackFile[0].path
        );
      }
      if (
        req.files.introducerSignatureFile &&
        req.files.introducerSignatureFile[0]
      ) {
        filePaths.introducer_signature_path =
          req.files.introducerSignatureFile[0].path;
        console.log(
          "✓ INTRODUCER SIGNATURE uploaded:",
          req.files.introducerSignatureFile[0].originalname,
          "->",
          req.files.introducerSignatureFile[0].path
        );
      }

      const uploadedCount = Object.keys(filePaths).length;
      console.log(` Total files uploaded: ${uploadedCount}`);
    } else {
      console.log(" No files uploaded in this request");
    }

    // Merge file paths with form data
    const dataWithFiles = { ...raw, ...filePaths };

    console.log("Normalizing data...");
    console.log("File paths being saved:", filePaths);
    const data = normalizeMemberInput(dataWithFiles);
    console.log("Normalized data file paths:", {
      memberPhotoPath: data.memberPhotoPath,
      memberSignaturePath: data.memberSignaturePath,
      aadhaarFrontPath: data.aadhaarFrontPath,
      aadhaarBackPath: data.aadhaarBackPath,
      panDocPath: data.panDocPath,
      bankDocPath: data.bankDocPath,
      nomineeAadhaarFrontPath: data.nomineeAadhaarFrontPath,
      nomineeAadhaarBackPath: data.nomineeAadhaarBackPath,
      introducerSignaturePath: data.introducerSignaturePath,
    });

    console.log("Calling saveMember...");
    const member = await saveMember(data);

    if (!member) {
      return res.status(500).json(error("Failed to save member to database"));
    }

    console.log("SUCCESS: Member saved with ID:", member.member_id);
    console.log("Member creation completed successfully!");
    console.log(" MEMBER SUBMISSION COMPLETED \n");

    return res.status(201).json(success("Member created", member));
  } catch (err) {
    console.log(" ERROR: Member submission failed!");
    console.log(" Error details:", err.message);
    console.log(" MEMBER SUBMISSION FAILED\n");
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

export const getReferrals = async (req, res) => {
  try {
    const referrals = await getReferralData();
    return res.json(success("Referral data fetched", referrals));
  } catch (err) {
    console.error("Error fetching referrals:", err);
    return res.status(500).json(error("Failed to fetch referral data"));
  }
};
