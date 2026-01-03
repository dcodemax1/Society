/**
 * Form Navigation Component
 * Previous and Next/Submit buttons with validation
 */

import React from "react";

export const FormNavigation = ({
  currentStep,
  totalSteps,
  steps,
  onPrevious,
  onNext,
  onSubmit,
  isValid = true,
}) => {
  const nextStepName = steps[currentStep]?.name || "Next";
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="flex justify-between items-center gap-4 mt-8 pt-6 border-t border-gray-200">
      {/* Previous Button */}
      <button
        type="button"
        onClick={onPrevious}
        className={`flex items-center gap-2 px-4 sm:px-6 py-2 rounded-md font-semibold text-xs sm:text-base whitespace-nowrap ${
          currentStep === 1
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-700 border border-gray-300 hover:bg-gray-50 cursor-pointer"
        }`}
        disabled={currentStep === 1}
      >
        <span>←</span> Previous
      </button>

      {/* Submit or Continue Button */}
      {isLastStep ? (
        <button
          type="button"
          onClick={onSubmit}
          disabled={!isValid}
          className={`flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-8 py-2 rounded-md font-semibold text-xs sm:text-base whitespace-nowrap ${
            isValid
              ? "bg-green-600 text-white hover:bg-green-700 cursor-pointer"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
        >
          <span className="flex items-center justify-center w-5 sm:w-6 h-5 sm:h-6 bg-white text-green-600 rounded-full font-bold text-xs flex-shrink-0">
            ✓
          </span>
          Submit Application
        </button>
      ) : (
        <button
          type="button"
          onClick={onNext}
          disabled={!isValid}
          className={`flex items-center justify-center gap-2 px-4 sm:px-8 py-2 rounded-md font-semibold text-xs sm:text-base whitespace-nowrap ${
            isValid
              ? "bg-green-600 text-white hover:bg-green-700 cursor-pointer"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
        >
          Continue to {nextStepName}
          <span>→</span>
        </button>
      )}
    </div>
  );
};

export default FormNavigation;
