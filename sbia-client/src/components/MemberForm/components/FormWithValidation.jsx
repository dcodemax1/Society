/**
 * Form With Validation Wrapper
 * Wraps form components and adds validation error state
 * Error messages are passed to form components via formErrors prop
 */

import React, { useState, useEffect } from "react";
import { REQUIRED_FIELDS, FIELD_VALIDATION_RULES } from "../config/formConfig";

function FormWithValidation({
  formComponent: FormComponent,
  formData,
  onChange,
  stepNum,
  onErrorsChange,
}) {
  const requiredFields = REQUIRED_FIELDS[stepNum] || [];
  const [formErrors, setFormErrors] = useState({});

  // Check if a field is required and empty
  const isFieldMissing = (fieldName) => {
    if (!requiredFields.includes(fieldName)) return false;

    const value = formData[fieldName];
    if (value === undefined || value === null) return true;
    if (typeof value === "string") return value.trim().length === 0;
    if (typeof value === "number") return value <= 0;
    if (value instanceof File) return value.size === 0;
    return !value;
  };

  // Update field errors whenever form data changes
  useEffect(() => {
    const errors = {};
    requiredFields.forEach((field) => {
      if (isFieldMissing(field)) {
        const fieldLabel = field
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase())
          .trim();
        errors[field] = `${fieldLabel} is required`;
      } else if (FIELD_VALIDATION_RULES[field]) {
        // Check format validation rules
        const validationError = FIELD_VALIDATION_RULES[field](formData[field]);
        if (validationError) {
          errors[field] = validationError;
        }
      }
    });
    setFormErrors(errors);
    // Call parent callback to update modal validation state
    if (onErrorsChange) {
      onErrorsChange(errors);
    }
  }, [formData, requiredFields, onErrorsChange]);

  // Create a custom onChange that also validates
  const validatingOnChange = (e) => {
    onChange(e);
  };

  return (
    <FormComponent
      formData={formData}
      onChange={validatingOnChange}
      formErrors={formErrors}
    />
  );
}

export default FormWithValidation;
