/**
 * Loan Application Form Configuration
 * Centralized configuration for all loan form steps
 */

export const LOAN_STEPS = [
  { name: "Member Lookup & Details", id: 1 },
  { name: "Loan Request Details", id: 2 },
  { name: "Guarantor 1 - Referrer", id: 3 },
  { name: "Guarantor 2 - Referrer", id: 4 },
  { name: "Documents Uploads", id: 5 },
  { name: "Member Declaration", id: 6 },
  { name: "Review & Submit", id: 7 },
];

export const LOAN_TOTAL_STEPS = LOAN_STEPS.length;

export const LOAN_SUBMIT_ENDPOINT = "/submit-loan.php";

export const LOAN_LOCAL_STORAGE_KEY = "offline_loan_applications";
