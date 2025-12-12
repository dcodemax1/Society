// src/services/member.service.js
import pool from "../../config/db.js";
import { generateMemberId } from "../../utils/memberId.js";

/**
 * Create a new member
 * Controller is responsible for normalization; this service only:
 *  - generates member_id using mobile + state code
 *  - inserts into members table with exact columns order matching the DB
 */
export const saveMember = async (data) => {
  // Use provided member_id or generate one using mobile + state code (perm_state first, fallback to office_state)
  let memberId =
    data.memberId ||
    generateMemberId(data.mobile, data.permState || data.officeState);

  // Ensure member_id is NEVER NULL (it's a PRIMARY KEY)
  if (!memberId || memberId === "XX" || memberId === "0000000000XX") {
    throw new Error(
      "❌ CRITICAL: member_id cannot be NULL or invalid. Generated ID: " +
        memberId
    );
  }

  console.log("💾 Saving member with memberId:", memberId);
  console.log("📊 Data received in saveMember:", {
    memberId: data.memberId,
    mobile: data.mobile,
    permState: data.permState,
    officeState: data.officeState,
    generatedId: memberId,
    fullName: data.fullName,
    email: data.email,
  });

  // exact columns in the members table (snake_case) — must match DB
  const columns = [
    "member_id",
    "membership_type",
    "reference_number",
    "full_name",
    "father_name",
    "mother_name",
    "gender",
    "dob",
    "mobile",
    "whatsapp",
    "email",
    "religion",
    "nationality",
    "occupation",
    "occupation_other",
    "employer_name",
    "designation",
    "monthly_income",
    "annual_income",
    "office_address",
    "office_state",
    "office_district",
    "office_pin",
    "comm_address",
    "comm_state",
    "comm_district",
    "comm_pin",
    "perm_address",
    "perm_state",
    "perm_district",
    "perm_pin",
    "member_aadhaar",
    "member_pan",
    "bank_account_number",
    "bank_ifsc",
    "bank_name",
    "bank_branch",
    "bank_doc_path",
    "aadhaar_front_path",
    "aadhaar_back_path",
    "pan_doc_path",
    "nominee_name",
    "nominee_relation",
    "nominee_relation_other",
    "nominee_dob",
    "nominee_guardian",
    "nominee_address",
    "nominee_aadhaar",
    "nominee_pan",
    "nominee_aadhaar_front_path",
    "nominee_aadhaar_back_path",
    "monthly_contribution",
    "payment_mode",
    "payment_mode_other",
    "introducer_member_id",
    "introducer_name",
    "introducer_mobile",
    "declaration_place",
    "declaration_date",
    "member_signature_path",
    "introducer_signature_path",
    "state_code",
    "joining_date",
    "id_card_path",
    "member_photo_path",
    "status",
  ];

  // build placeholders from columns
  const placeholders = columns.map(() => "?").join(", ");

  const sql = `INSERT INTO members (${columns.join(
    ", "
  )}) VALUES (${placeholders})`;

  // params must be in same order as columns
  const params = [
    // member_id
    memberId,

    // membership section
    data.membershipType ?? "REGULAR",
    data.referenceNumber ?? null,

    // personal
    data.fullName ?? null,
    data.fatherName ?? null,
    data.motherName ?? null,
    data.gender ?? null,
    data.dob ?? null,
    data.mobile ?? null,
    data.whatsapp ?? null,
    data.email ?? null,
    data.religion ?? null,
    data.nationality ?? null,
    data.occupation ?? null,
    data.occupationOther ?? null,
    data.employerName ?? null,
    data.designation ?? null,
    data.monthlyIncome ?? null,
    data.annualIncome ?? null,

    // office address
    data.officeAddress ?? null,
    data.officeState ?? null,
    data.officeDistrict ?? null,
    data.officePin ?? null,

    // communication address
    data.commAddress ?? null,
    data.commState ?? null,
    data.commDistrict ?? null,
    data.commPin ?? null,

    // permanent address
    data.permAddress ?? null,
    data.permState ?? null,
    data.permDistrict ?? null,
    data.permPin ?? null,

    // member docs
    data.memberAadhaar ?? null,
    data.memberPan ?? null,
    data.bankAccountNumber ?? null,
    data.bankIfsc ?? null,
    data.bankName ?? null,
    data.bankBranch ?? null,
    data.bankDocPath ?? null,
    data.aadhaarFrontPath ?? null,
    data.aadhaarBackPath ?? null,
    data.panDocPath ?? null,

    // nominee
    data.nomineeName ?? null,
    data.nomineeRelation ?? null,
    data.nomineeRelationOther ?? null,
    data.nomineeDob ?? null,
    data.nomineeGuardian ?? null,
    data.nomineeAddress ?? null,
    data.nomineeAadhaar ?? null,
    data.nomineePan ?? null,
    data.nomineeAadhaarFrontPath ?? null,
    data.nomineeAadhaarBackPath ?? null,

    // payment
    data.monthlyContribution ?? null,
    data.paymentMode ?? null,
    data.paymentModeOther ?? null,

    // introducer
    data.introducerMemberId ?? null,
    data.introducerName ?? null,
    data.introducerMobile ?? null,

    // declaration
    data.declarationPlace ?? null,
    data.declarationDate ?? null,
    data.memberSignaturePath ?? null,
    data.introducerSignaturePath ?? null,

    // extra
    data.stateCode ?? null,
    data.joiningDate ?? null,
    data.idCardPath ?? null,
    data.memberPhotoPath ?? null,

    // status
    data.status ?? "PENDING",
  ];

  // sanity check — fail fast if mismatch (helpful in development)
  if (placeholders.split(",").length !== params.length) {
    throw new Error(
      `PARAM/PLACEHOLDER MISMATCH: ${params.length} params vs ${
        placeholders.split(",").length
      } placeholders`
    );
  }

  console.log("� Sample params being inserted:");
  console.log("  params[0] (memberId):", params[0]);
  console.log("  params[3] (fullName):", params[3]);
  console.log("  params[8] (mobile):", params[8]);
  console.log("  params[11] (email):", params[11]);
  console.log("  params.length:", params.length);

  console.log("�🔄 Executing INSERT with memberId:", memberId);

  try {
    const result = await pool.query(sql, params);
    console.log("✅ INSERT successful for memberId:", memberId);
    console.log("📍 Insert result:", result);
  } catch (insertErr) {
    console.error("❌ INSERT FAILED for memberId:", memberId);
    console.error("🔴 SQL Error:", insertErr.message);
    console.error("🔴 SQL Code:", insertErr.code);
    console.error("🔴 Full Error:", insertErr);
    throw insertErr;
  }

  const [rows] = await pool.query(
    "SELECT * FROM members WHERE member_id = ? LIMIT 1",
    [memberId]
  );

  if (rows[0]) {
    console.log("✅ Verified: member_id saved in database:", rows[0].member_id);
  } else {
    console.error(
      "❌ ERROR: member_id NOT found in database after INSERT:",
      memberId
    );
  }

  return rows[0] || null;
};

export const fetchMemberUsingAadhaar = async (aadhaar) => {
  const [rows] = await pool.query(
    "SELECT * FROM members WHERE member_aadhaar = ? LIMIT 1",
    [aadhaar]
  );
  return rows[0] || null;
};

export const fetchMembers = async () => {
  const [rows] = await pool.query(
    "SELECT * FROM members ORDER BY created_at DESC"
  );
  return rows;
};

export const fetchMemberById = async (member_id) => {
  const [rows] = await pool.query(
    "SELECT * FROM members WHERE member_id = ? LIMIT 1",
    [member_id]
  );
  return rows[0] || null;
};
