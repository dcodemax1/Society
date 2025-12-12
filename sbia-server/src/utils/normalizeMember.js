// src/utils/normalizeMember.js

export const normalizeMemberInput = (data) => {
  return {
    memberId: data.member_id,

    membershipType: data.membership_type,
    referenceNumber: data.reference_number,

    fullName: data.full_name,
    fatherName: data.father_name,
    motherName: data.mother_name,
    gender: data.gender,
    dob: data.dob,

    mobile: data.mobile,
    whatsapp: data.whatsapp || data.whatsapp_number,
    email: data.email,

    religion: data.religion,
    nationality: data.nationality || "Indian",

    occupation: data.occupation,
    occupationOther: data.occupation_other,
    employerName: data.employer_name,
    designation: data.designation,
    monthlyIncome: data.monthly_income,
    annualIncome: data.annual_income,

    officeAddress: data.office_address,
    officeState: data.office_state,
    officeDistrict: data.office_district,
    officePin: data.office_pin,

    commAddress: data.comm_address || data.present_address,
    commState: data.comm_state || data.present_state,
    commDistrict: data.comm_district || data.present_district,
    commPin: data.comm_pin || data.present_pin || data.present_pin_code,

    permAddress: data.perm_address || data.permanent_address,
    permState: data.perm_state || data.permanent_state,
    permDistrict: data.perm_district || data.permanent_district,
    permPin: data.perm_pin || data.permanent_pin || data.permanent_pin_code,

    memberAadhaar: data.member_aadhaar,
    memberPan: data.member_pan,

    bankAccountNumber: data.bank_account_number,
    bankIfsc: data.bank_ifsc,
    bankName: data.bank_name,
    bankBranch: data.bank_branch,
    bankDocPath: data.bank_doc_path,

    aadhaarFrontPath: data.aadhaar_front_path,
    aadhaarBackPath: data.aadhaar_back_path,
    panDocPath: data.pan_doc_path,

    nomineeName: data.nominee_name,
    nomineeRelation: data.nominee_relation,
    nomineeRelationOther: data.nominee_relation_other,
    nomineeDob:
      data.nominee_dob ||
      (data.nominee_dob_day && data.nominee_dob_month && data.nominee_dob_year
        ? `${data.nominee_dob_year}-${String(data.nominee_dob_month).padStart(
            2,
            "0"
          )}-${String(data.nominee_dob_day).padStart(2, "0")}`
        : null),
    nomineeGuardian: data.nominee_guardian,
    nomineeAddress: data.nominee_address,
    nomineeAadhaar: data.nominee_aadhaar,
    nomineePan: data.nominee_pan,
    nomineeAadhaarFrontPath: data.nominee_aadhaar_front_path,
    nomineeAadhaarBackPath: data.nominee_aadhaar_back_path,

    monthlyContribution: data.monthly_contribution,
    paymentMode: data.payment_mode || data.mode_of_payment,
    paymentModeOther: data.payment_mode_other,

    introducerMemberId: data.introducer_member_id || data.referral_member_id,
    introducerName: data.introducer_name || data.referral_member_name,
    introducerMobile: data.introducer_mobile || data.referral_member_mobile,

    declarationPlace: data.declaration_place,
    declarationDate: data.declaration_date,
    memberSignaturePath: data.member_signature_path,
    introducerSignaturePath: data.introducer_signature_path,

    stateCode: data.state_code,
    joiningDate: data.joining_date || new Date().toISOString().split("T")[0],
    idCardPath: data.id_card_path,
    memberPhotoPath: data.member_photo_path,

    status: data.status || "PENDING",
  };
};
