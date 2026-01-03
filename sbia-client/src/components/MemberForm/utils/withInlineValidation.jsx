/**
 * Input with Inline Validation
 * Wraps input/select/textarea fields and shows error message below if required field is empty
 */

import React from "react";
import { REQUIRED_FIELDS } from "../config/formConfig";

export const withInlineValidation = (
  Component,
  stepNum,
  formData,
  requiredFields
) => {
  return (props) => {
    const { name, onChange, children, ...restProps } = props;

    // Check if this field is required and empty
    const isRequired = requiredFields?.includes(name);
    const value = formData?.[name];

    const isEmpty =
      value === undefined ||
      value === null ||
      (typeof value === "string" && value.trim().length === 0) ||
      (typeof value === "number" && value <= 0);

    const hasError = isRequired && isEmpty;

    const fieldLabel = name
      ?.replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .trim();

    const handleChange = (e) => {
      onChange(e);
    };

    return (
      <div className="inline-validation-wrapper">
        <Component {...restProps} name={name} onChange={handleChange}>
          {children}
        </Component>
        {hasError && (
          <p className="text-xs text-red-600 mt-1 font-medium">
            ⚠️ {fieldLabel} is required
          </p>
        )}
      </div>
    );
  };
};

export default withInlineValidation;
