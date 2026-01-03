/**
 * Form Validation Logic
 * Centralized validation rules for each step
 */

import { REQUIRED_FIELDS } from "../config/formConfig";

/**
 * Check if all required fields for a step are filled
 * @param {number} currentStep - Current form step
 * @param {object} formData - Form data object
 * @returns {boolean} - True if all required fields are filled
 */
export const isStepValid = (currentStep, formData) => {
  const requiredFields = REQUIRED_FIELDS[currentStep] || [];

  // If no required fields for this step, it's valid
  if (requiredFields.length === 0) {
    return true;
  }

  // Check if all required fields have values - STRICT VALIDATION
  return requiredFields.every((field) => {
    const value = formData[field];

    // Check for undefined or null
    if (value === undefined || value === null) {
      return false;
    }

    // For strings: must have text after trimming
    if (typeof value === "string") {
      return value.trim().length > 0;
    }

    // For numbers: must be greater than 0
    if (typeof value === "number") {
      return value > 0;
    }

    // For File objects (file uploads): must be a valid file
    if (value instanceof File) {
      return value.size > 0;
    }

    // For other truthy values (like objects)
    return !!value;

    // For files/objects: must exist
    if (typeof value === "object") {
      return true;
    }

    // For any other value, it must be truthy
    return !!value;
  });
};

export const validateStep1 = (formData, showMessage) => {
  // Validate Personal Details - only require essential fields
  if (!formData.fullName || !formData.fullName.trim()) {
    showMessage("Please enter Full Name.", "error");
    return false;
  }
  if (!formData.mobile || !formData.mobile.trim()) {
    showMessage("Please enter Mobile Number.", "error");
    return false;
  }
  // Other fields are optional
  return true;
};

export const validateStep7 = (formData, showMessage) => {
  // Validate Referral By - optional field
  // Users can proceed without selecting a referral member
  return true;
};

export const validateStep9 = (formData, showMessage) => {
  // Validate Review & Terms acceptance
  if (!formData.agreedToTerms) {
    showMessage("Please agree to the terms and conditions.", "error");
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
export const validateStepTransition = (currentStep, formData, showMessage) => {
  if (currentStep === 1) {
    return validateStep1(formData, showMessage);
  }
  if (currentStep === 7) {
    return validateStep7(formData, showMessage);
  }
  return true;
};
