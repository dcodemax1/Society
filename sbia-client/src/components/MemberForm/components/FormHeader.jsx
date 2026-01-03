/**
 * Form Header Component
 * Displays step indicator, title, and progress percentage
 */

import React from "react";

export const FormHeader = ({
  currentStep,
  totalSteps,
  stepName,
  percentage,
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <p className="text-sm text-gray-600">
          Step {currentStep} of {totalSteps}
        </p>
        <h1 className="text-2xl font-bold text-gray-900">{stepName}</h1>
      </div>
      <div className="text-right">
        <p className="text-3xl font-bold text-green-600">{percentage}%</p>
        <p className="text-sm text-gray-600">Complete</p>
      </div>
    </div>
  );
};

export default FormHeader;
