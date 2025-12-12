/**
 * Form Handlers
 * Centralized logic for form navigation and submission
 */

import {
  TOTAL_STEPS,
  LOCAL_STORAGE_KEY,
  STATE_CODES,
} from "../config/formConfig";
import { validateStepTransition, validateStep9 } from "./formValidation";
import { submitMemberForm } from "../../../services/memberApi";

/**
 * Handle moving to next step with validation
 */
export const handleNext = (
  currentStep,
  formData,
  setCurrentStep,
  showMessage,
  totalSteps = TOTAL_STEPS
) => {
  // Validate current step before proceeding
  if (!validateStepTransition(currentStep, formData, showMessage)) {
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
export const handlePrevious = (currentStep, setCurrentStep, showMessage) => {
  if (currentStep > 1) {
    setCurrentStep(currentStep - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
    showMessage("");
  }
};

/**
 * Handle form submission with offline fallback
 */
export const handleSubmit = async (
  e,
  formData,
  currentStep,
  showMessage,
  setFormData,
  setCurrentStep,
  totalSteps = TOTAL_STEPS,
  setIsSubmitted = null
) => {
  e.preventDefault();

  // Validate terms acceptance on final step
  if (currentStep === totalSteps && !validateStep9(formData, showMessage)) {
    return;
  }

  showMessage("Submitting...", "info");

  // Generate Member ID: RegisteredMobileNumber (10 digits) + StateCode (2 digits) = 12 digits total
  const generateMemberId = () => {
    const mobile = (formData.mobile || "0000000000").slice(-10); // Get last 10 digits of mobile
    const stateCode = STATE_CODES[formData.permanentState] || "XX"; // Get 2-digit state code
    return `${mobile}${stateCode}`;
  };

  const memberId = generateMemberId();

  const submissionData = {
    ...formData,
    memberId, // Include generated member ID
    submitted_at: new Date().toISOString(),
  };

  console.log("🔵 Attempting to submit member form...");
  console.log("📦 Form data (camelCase):", submissionData);

  try {
    // Attempt to submit to API
    const result = await submitMemberForm(submissionData);

    console.log("✅ API Response:", result);

    if (result.success) {
      showMessage("Form submitted successfully.", "success");
      // Show success page
      if (setIsSubmitted) {
        setIsSubmitted(true);
      } else {
        setFormData({});
        setCurrentStep(1);
      }
    } else {
      throw new Error(result.message || "Submission failed");
    }
  } catch (err) {
    console.error("❌ API Error:", err);
    // Fallback: Save to global variable (preserves File objects) and show success page
    try {
      // Store the full formData with File objects in global variable
      window.lastSubmittedFormData = submissionData;
      console.log("✅ Saved formData to global variable (offline fallback)");

      // Also save non-file data to localStorage for persistence
      const formDataCopy = { ...submissionData };
      if (formDataCopy.passportPhoto) delete formDataCopy.passportPhoto;
      if (formDataCopy.aadhaarFrontFile) delete formDataCopy.aadhaarFrontFile;
      if (formDataCopy.aadhaarBackFile) delete formDataCopy.aadhaarBackFile;
      if (formDataCopy.panFile) delete formDataCopy.panFile;
      if (formDataCopy.bankDocument) delete formDataCopy.bankDocument;

      const existing = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEY) || "[]"
      );
      existing.push(formDataCopy);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));

      showMessage("Form submitted successfully (offline).", "success");
      // Show success page on offline submission too
      if (setIsSubmitted) {
        setIsSubmitted(true);
      } else {
        setFormData({});
        setCurrentStep(1);
      }
    } catch (err2) {
      showMessage("Submission failed: " + err2.message, "error");
    }
  }
};
