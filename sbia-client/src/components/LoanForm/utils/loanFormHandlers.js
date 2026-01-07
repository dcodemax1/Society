/**
 * Loan Form Handlers
 * Centralized logic for form navigation and submission
 */

import {
  LOAN_TOTAL_STEPS,
  LOAN_LOCAL_STORAGE_KEY,
} from "../config/loanFormConfig";
import { validateLoanStepTransition } from "./loanFormValidation";
import { loanApi } from "../../../services/loanApi";

/**
 * Handle moving to next step with validation
 */
export const handleLoanNext = (
  currentStep,
  formData,
  setCurrentStep,
  showMessage,
  totalSteps = LOAN_TOTAL_STEPS,
  stepRefs = {}
) => {
  // For Step 1, trigger component validation via ref
  if (currentStep === 1 && stepRefs.memberLookup?.current) {
    const isValid = stepRefs.memberLookup.current.validateFields();
    if (!isValid) {
      return;
    }
  }

  // For Step 5, trigger component validation via ref
  if (currentStep === 5 && stepRefs.documentsUpload?.current) {
    const isValid = stepRefs.documentsUpload.current.validateFields();
    if (isValid) {
      return;
    }
  }

  // Validate current step before proceeding
  if (!validateLoanStepTransition(currentStep, formData, showMessage)) {
    return;
  }

  if (currentStep < totalSteps) {
    setCurrentStep(currentStep + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
    showMessage("");
  }
};

/**
 * Handle moving to previous step
 */
export const handleLoanPrevious = (
  currentStep,
  setCurrentStep,
  showMessage
) => {
  if (currentStep > 1) {
    setCurrentStep(currentStep - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
    showMessage("");
  }
};

/**
 * Handle form submission with offline fallback
 */
export const handleLoanSubmit = async (
  e,
  formData,
  currentStep,
  showMessage,
  setFormData,
  setCurrentStep,
  totalSteps = LOAN_TOTAL_STEPS,
  setIsSubmitted
) => {
  // Prevent default form submission
  if (e && typeof e.preventDefault === "function") {
    e.preventDefault();
  }

  console.log("Loan submission started", { currentStep, totalSteps });

  // Validate terms checkbox on step 7
  if (currentStep === totalSteps) {
    if (!formData.agreedToLoanTerms) {
      console.log("Terms not agreed");
      showMessage("Please agree to the loan terms before submitting", "error");
      return;
    }
  }

  showMessage("Submitting loan application...", "info");

  try {
    console.log("Preparing loan data...");

    // Prepare loan data for submission
    const loanData = {
      memberId: formData.memberId,
      memberName: formData.memberName,
      fathersName: formData.fathersName,
      registeredMobile: formData.registeredMobile,
      registeredAddress: formData.registeredAddress,
      monthlyContribution: formData.monthlyContribution,
      dateOfJoining: formData.dateOfJoining,
      membershipDuration: formData.membershipDuration,
      loanRequestDate: formData.loanRequestDate,
      loanAmount: formData.loanAmount,
      purposeOfLoan: formData.purposeOfLoan,
      purposeOfLoanOther: formData.purposeOfLoanOther,
      emiTenure: formData.emiTenure,
      whenLoanRequired: formData.whenLoanRequired,
      paymentTransferMode: formData.paymentTransferMode,
      upiId: formData.upiId,
      bankName: formData.bankName,
      accountNumber: formData.accountNumber,
      ifscCode: formData.ifscCode,
      accountType: formData.accountType,
      guarantor1Name: formData.guarantor1Name,
      guarantor1MemberId: formData.guarantor1MemberId,
      guarantor1Mobile: formData.guarantor1Mobile,
      guarantor1MembershipDuration: formData.guarantor1MembershipDuration,
      guarantor2Name: formData.guarantor2Name,
      guarantor2MemberId: formData.guarantor2MemberId,
      guarantor2Mobile: formData.guarantor2Mobile,
      guarantor2MembershipDuration: formData.guarantor2MembershipDuration,
      guarantor2Consent: formData.guarantor2Consent,
      bankDocumentType: formData.bankDocumentType,
      bankDocumentPath: formData.bankDocument_file
        ? formData.bankDocumentPath
        : null,
      loanDeclarationAccepted: formData.loanDeclarationAccepted,
      agreedToLoanTerms: formData.agreedToLoanTerms,
    };

    console.log("Sending loan data to backend:", loanData);

    // Submit to backend
    const response = await loanApi.submitLoan(loanData);

    console.log("Backend response:", response);
    console.log("Response data success:", response?.data?.success);
    console.log("Response data:", response?.data);

    // Check if submission was successful
    const isSuccess =
      response?.data?.success === true || response?.status === 200;
    const loanId = response?.data?.data?.loanId;

    if (isSuccess && loanId) {
      console.log("Loan submitted successfully:", loanId);
      // Store loan ID in formData before showing thank you page
      setFormData((prev) => ({
        ...prev,
        loanId: loanId,
      }));
      if (setIsSubmitted) {
        setIsSubmitted(true);
      }
    } else if (isSuccess) {
      // Success but no loanId in expected format
      console.log("Success but unexpected data format:", response?.data);
      setFormData((prev) => ({
        ...prev,
        loanId: response?.data?.data?.loanId || "Processing...",
      }));
      if (setIsSubmitted) {
        setIsSubmitted(true);
      }
    } else {
      console.log("Submission failed - response:", response);
      throw new Error(response?.data?.message || "Submission failed");
    }
  } catch (err) {
    console.error("Error submitting loan:", err);
    const errorMessage =
      err?.response?.data?.message ||
      err?.message ||
      "Failed to submit loan application. Please try again.";
    showMessage(errorMessage, "error");
  }
};
