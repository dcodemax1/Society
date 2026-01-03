/**
 * Form Configuration
 * Centralized configuration for all form steps
 */

export const FORM_STEPS = [
  { name: "Personal", id: 1 },
  { name: "Professional", id: 2 },
  { name: "Address", id: 3 },
  { name: "KYC", id: 4 },
  { name: "Nominee", id: 5 },
  { name: "Contribution", id: 6 },
  { name: "Referral By", id: 7 },
  { name: "Declaration", id: 8 },
  { name: "Review", id: 9 },
];

export const TOTAL_STEPS = FORM_STEPS.length;

export const SUBMIT_ENDPOINT = "https://api.shreejan.co.in/api/v1/members";

export const LOCAL_STORAGE_KEY = "offline_submissions";

/**
 * Required Fields Configuration
 * Defines which fields must be filled for each step to enable the continue button
 */
export const REQUIRED_FIELDS = {
  // Step 1: Personal Details - ALL fields required (nationality is auto-set to Indian, so excluded)
  1: [
    "fullName",
    "fatherName",
    "motherName",
    "email",
    "mobile",
    "whatsappNumber",
    "gender",
    "dobDay",
    "dobMonth",
    "dobYear",
    "religion",
  ],

  // Step 2: Professional Details - ALL fields required
  2: [
    "occupation",
    "employerName",
    "designation",
    "monthlyIncome",
    "officeAddress",
    "officePin",
    "officeDistrict",
    "officeState",
  ],

  // Step 3: Address Details - ALL fields required
  3: [
    "permanentPinCode",
    "permanentAddress",
    "permanentState",
    "presentPinCode",
    "presentAddress",
    "presentState",
  ],

  // Step 4: KYC Details - ALL fields required
  4: [
    "memberAadhaar",
    "aadhaarFrontFile",
    "aadhaarBackFile",
    "pan",
    "panFile",
    "passportPhoto",
    "bankDocument",
  ],

  // Step 5: Nominee Details - ALL fields required
  5: [
    "nomineeName",
    "nomineeRelation",
    "nomineeDobDay",
    "nomineeDobMonth",
    "nomineeDobYear",
    "nomineeAadhaar",
    "nomineeAadhaarFrontFile",
    "nomineeAadhaarBackFile",
  ],

  // Step 6: Contribution Details - ALL fields required
  6: ["monthlyContribution", "paymentMode"],

  // Step 7: Referral By - ALL fields required
  7: ["introducerName", "introducerMobile"],

  // Step 8: Declaration - ALL fields required
  8: ["declarationPlace", "declarationDate", "signatureFile"],

  // Step 9: Review - requires terms agreement
  9: ["agreedToTerms"],
};

/**
 * Field Format Validation Rules
 * Defines validation rules for specific fields beyond just "is it filled"
 */
export const FIELD_VALIDATION_RULES = {
  // Personal Details
  mobile: (value) => {
    if (!value) return null;
    if (value.length !== 10) return "Mobile Number must be 10 digits";
    return null;
  },
  whatsappNumber: (value) => {
    if (!value) return null;
    if (value.length !== 10) return "WhatsApp Number must be 10 digits";
    return null;
  },
  // KYC Details
  pan: (value) => {
    if (!value) return null;
    if (value.length !== 10) return "PAN must be 10 characters";
    return null;
  },
  memberAadhaar: (value) => {
    if (!value) return null;
    if (value.length !== 12) return "Aadhaar must be 12 digits";
    return null;
  },
  // Nominee Details
  nomineeAadhaar: (value) => {
    if (!value) return null;
    if (value.length !== 12) return "Aadhaar must be 12 digits";
    return null;
  },
};

/**
 * State Code Mapping
 * Maps Indian state names to their official GST State Codes (01-37)
 */
export const STATE_CODES = {
  "Andhra Pradesh": "28",
  "Arunachal Pradesh": "12",
  Assam: "18",
  Bihar: "10",
  Chhattisgarh: "22",
  Goa: "30",
  Gujarat: "24",
  Haryana: "06",
  "Himachal Pradesh": "02",
  Jharkhand: "20",
  Karnataka: "29",
  Kerala: "32",
  "Madhya Pradesh": "23",
  Maharashtra: "27",
  Manipur: "14",
  Meghalaya: "17",
  Mizoram: "15",
  Nagaland: "13",
  Odisha: "21",
  Punjab: "03",
  Rajasthan: "08",
  Sikkim: "11",
  "Tamil Nadu": "33",
  Telangana: "36",
  Tripura: "16",
  "Uttar Pradesh": "09",
  Uttarakhand: "05",
  "West Bengal": "19",
  Chandigarh: "04",
  "Dadra and Nagar Haveli and Daman and Diu": "26",
  Lakshadweep: "31",
  Delhi: "07",
  Puducherry: "34",
  Ladakh: "37",
  "Jammu and Kashmir": "01",
};
