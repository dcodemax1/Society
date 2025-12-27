/**
 * Loan Form Validation Logic
 * Centralized validation rules for each step
 */

export const validateLoanStep1 = (formData, showMessage) => {
  // Validate Member Lookup & Details
  if (!formData.memberId || formData.memberId.trim() === "") {
    return false;
  }
  if (formData.memberId.length !== 12) {
    return false;
  }
  if (!formData.registeredMobile || formData.registeredMobile.trim() === "") {
    return false;
  }
  if (formData.registeredMobile.length !== 10) {
    return false;
  }
  if (!formData.memberName || formData.memberName.trim() === "") {
    return false;
  }
  if (!formData.fathersName || formData.fathersName.trim() === "") {
    return false;
  }
  if (!formData.registeredAddress || formData.registeredAddress.trim() === "") {
    return false;
  }
  if (
    !formData.monthlyContribution ||
    formData.monthlyContribution.trim() === ""
  ) {
    return false;
  }
  if (!formData.dateOfJoining || formData.dateOfJoining.trim() === "") {
    return false;
  }
  return true;
};

export const validateLoanStep2 = (formData, showMessage) => {
  // Validate Loan Request Details
  if (!formData.loanAmount || parseFloat(formData.loanAmount) <= 0) {
    return false;
  }
  if (parseFloat(formData.loanAmount) < 10000) {
    return false;
  }
  if (parseFloat(formData.loanAmount) > 200000) {
    return false;
  }
  if (!formData.purposeOfLoan) {
    return false;
  }
  if (formData.purposeOfLoan === "Other" && !formData.purposeOfLoanOther) {
    return false;
  }
  if (!formData.emiTenure || formData.emiTenure === "Select") {
    return false;
  }
  if (!formData.whenLoanRequired || formData.whenLoanRequired === "Select") {
    return false;
  }
  if (!formData.paymentTransferMode) {
    return false;
  }

  // Validate UPI details if selected
  if (
    ["PhonePe", "Google Pay (GPay)", "Paytm", "BHIM UPI"].includes(
      formData.paymentTransferMode
    )
  ) {
    if (!formData.upiId || !formData.upiId.trim()) {
      return false;
    }
    const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/;
    if (!upiRegex.test(formData.upiId)) {
      return false;
    }
  }

  // Validate bank details if selected
  if (formData.paymentTransferMode === "Net Banking") {
    if (!formData.bankName || !formData.bankName.trim()) {
      return false;
    }
    if (!formData.accountNumber || !formData.accountNumber.trim()) {
      return false;
    }
    if (!formData.ifscCode || !formData.ifscCode.trim()) {
      return false;
    }
    if (!formData.accountType || formData.accountType === "Select") {
      return false;
    }
  }

  return true;
};

export const validateLoanStep3 = (formData, showMessage) => {
  // Validate Guarantor 1 Details
  if (!formData.guarantor1Name || !formData.guarantor1Name.trim()) {
    return false;
  }
  if (!formData.guarantor1MemberId || !formData.guarantor1MemberId.trim()) {
    return false;
  }
  if (!formData.guarantor1Mobile || !formData.guarantor1Mobile.trim()) {
    return false;
  }
  if (!formData.guarantor1MembershipDuration) {
    return false;
  }
  return true;
};

export const validateLoanStep4 = (formData, showMessage) => {
  // Validate Guarantor 2 Details
  if (!formData.guarantor2Name || !formData.guarantor2Name.trim()) {
    return false;
  }
  if (!formData.guarantor2MemberId || !formData.guarantor2MemberId.trim()) {
    return false;
  }
  if (!formData.guarantor2Mobile || !formData.guarantor2Mobile.trim()) {
    return false;
  }
  if (!formData.guarantor2MembershipDuration) {
    return false;
  }
  return true;
};

export const validateLoanStep5 = (formData, showMessage) => {
  // Validate Bank Details - Document upload (Passbook or Blank Cheque)
  if (!formData.bankDocumentType || !formData.bankDocumentType.trim()) {
    return false;
  }
  if (!formData.bankDocument || !formData.bankDocument.trim()) {
    return false;
  }
  return true;
};

export const validateLoanStep6 = (formData, showMessage) => {
  // Validate Loan Declaration
  if (!formData.loanDeclarationAccepted) {
    showMessage("Please accept the loan declaration.", "error");
    return false;
  }
  return true;
};

export const validateLoanStep7 = (formData, showMessage) => {
  // Validate Terms & Conditions Agreement
  if (!formData.agreedToLoanTerms) {
    return false;
  }
  return true;
};

/**
 * Route validation - determines if user can proceed to next step
 * @param {number} currentStep - Current form step
 * @param {object} formData - Form data object
 * @param {function} showMessage - Message display function
 * @returns {boolean} - True if validation passes
 */
export const validateLoanStepTransition = (
  currentStep,
  formData,
  showMessage
) => {
  if (currentStep === 1) {
    return validateLoanStep1(formData, showMessage);
  }
  if (currentStep === 2) {
    return validateLoanStep2(formData, showMessage);
  }
  if (currentStep === 3) {
    return validateLoanStep3(formData, showMessage);
  }
  if (currentStep === 4) {
    return validateLoanStep4(formData, showMessage);
  }
  if (currentStep === 5) {
    return validateLoanStep5(formData, showMessage);
  }
  if (currentStep === 6) {
    return validateLoanStep6(formData, showMessage);
  }
  if (currentStep === 7) {
    return validateLoanStep7(formData, showMessage);
  }
  return true;
};
