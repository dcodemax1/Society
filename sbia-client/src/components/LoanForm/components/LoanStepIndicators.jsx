/**
 * Loan Step Indicators Component
 * Shows progress circles for all loan form steps
 */

import React from "react";

export const LoanStepIndicators = ({ steps, currentStep }) => {
  return (
    <div className="flex justify-between items-end mb-8 pb-6 border-b border-gray-200">
      {steps.map((step) => (
        <div key={step.id} className="flex flex-col items-center flex-1">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white mb-2 ${
              step.id <= currentStep ? "bg-green-600" : "bg-gray-300"
            }`}
          >
            {step.id}
          </div>
          <p className="text-xs text-gray-700 text-center font-medium">
            {step.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default LoanStepIndicators;
