/**
 * Step Indicators Component
 * Shows progress circles for all form steps
 */

import React from "react";

export const StepIndicators = ({ steps, currentStep }) => {
  return (
    <div className="hidden sm:grid grid-cols-5 lg:flex lg:justify-between lg:items-end gap-2 lg:gap-0 mb-6 lg:mb-8 pb-4 lg:pb-6 border-b border-gray-200">
      {steps.map((step) => (
        <div key={step.id} className="flex flex-col items-center flex-1">
          <div
            className={`w-8 lg:w-10 h-8 lg:h-10 rounded-full flex items-center justify-center font-semibold text-white mb-1 lg:mb-2 text-xs lg:text-sm ${
              step.id <= currentStep ? "bg-green-600" : "bg-gray-300"
            }`}
          >
            {step.id}
          </div>
          <p className="hidden lg:block text-xs text-gray-700 text-center font-medium">
            {step.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StepIndicators;
