/**
 * Loan Form Handlers
 * Centralized logic for form navigation and submission
 */

import {
  LOAN_TOTAL_STEPS,
  LOAN_SUBMIT_ENDPOINT,
  LOAN_LOCAL_STORAGE_KEY,
} from "../config/loanFormConfig";
import { validateLoanStepTransition } from "./loanFormValidation";

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
  e.preventDefault();

  // Validate terms checkbox on step 7
  if (currentStep === totalSteps) {
    if (!formData.agreedToLoanTerms) {
      // Show error in component
      setFormData({
        ...formData,
        showLoanTermsError: true,
      });
      return;
    }
  }

  showMessage("Submitting...", "info");

  const submissionData = {
    ...formData,
    submitted_at: new Date().toISOString(),
  };

  try {
    // Attempt to submit to server
    const resp = await fetch(LOAN_SUBMIT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submissionData),
    });

    if (!resp.ok) throw new Error("Server returned " + resp.status);
    const json = await resp.json();

    if (json.status && json.status === "success") {
      showMessage("Loan application submitted successfully.", "success");
      if (setIsSubmitted) {
        setTimeout(() => {
          setIsSubmitted(true);
        }, 500);
      }
    } else {
      throw new Error(json.message || "Submission failed");
    }
  } catch (err) {
    // Fallback: Save to localStorage
    try {
      const existing = JSON.parse(
        localStorage.getItem(LOAN_LOCAL_STORAGE_KEY) || "[]"
      );
      existing.push(submissionData);
      localStorage.setItem(LOAN_LOCAL_STORAGE_KEY, JSON.stringify(existing));
      showMessage("Server unavailable — saved locally.", "error");
      if (setIsSubmitted) {
        setTimeout(() => {
          setIsSubmitted(true);
        }, 500);
      }
    } catch (err2) {
      showMessage("Submission failed: " + err2.message, "error");
    }
  }
};
