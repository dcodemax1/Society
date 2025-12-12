/**
 * Loan Form Header Component
 * Displays step indicator, title, and progress percentage
 */

import React from "react";

export const LoanFormHeader = ({ currentStep, totalSteps, stepName, percentage }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <p className="text-sm text-green-600 font-semibold">
          Step {currentStep} of {totalSteps} • {percentage}%
        </p>
        <h1 className="text-2xl font-bold text-gray-900">{stepName}</h1>
      </div>
    </div>
  );
};

export default LoanFormHeader;
