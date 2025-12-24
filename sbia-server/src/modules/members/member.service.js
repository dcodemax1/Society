import pool from "../../config/db.js";
import { generateMemberId } from "../../utils/memberId.js";

export const saveMember = async (data) => {
  let memberId =
    data.memberId ||
    generateMemberId(data.mobile, data.permState || data.officeState);

  if (!memberId || memberId === "XX" || memberId === "0000000000XX") {
    throw new Error(
      " CRITICAL: member_id cannot be NULL or invalid. Generated ID: " +
        memberId
    );
  }

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

  const params = [
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

  if (placeholders.split(",").length !== params.length) {
    throw new Error(
      `PARAM/PLACEHOLDER MISMATCH: ${params.length} params vs ${
        placeholders.split(",").length
      } placeholders`
    );
  }

  try {
    const result = await pool.query(sql, params);
    console.log("INSERT successful, result:", result);
  } catch (insertErr) {
    console.error("INSERT failed:", insertErr.message);
    throw insertErr;
  }

  const [rows] = await pool.query(
    "SELECT * FROM members WHERE member_id = ? LIMIT 1",
    [memberId]
  );

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
