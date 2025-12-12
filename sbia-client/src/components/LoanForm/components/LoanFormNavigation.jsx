/**
 * Loan Form Navigation Component
 * Previous and Next/Submit buttons
 */

import React from "react";

export const LoanFormNavigation = ({
  currentStep,
  totalSteps,
  steps,
  onPrevious,
  onNext,
  onSubmit,
}) => {
  const nextStepName = steps[currentStep]?.name || "Next";
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="flex justify-between items-center gap-3 sm:gap-4 mt-8 pt-6 border-t border-gray-200">
      {/* Previous Button */}
      <button
        type="button"
        onClick={onPrevious}
        className={`flex items-center justify-center gap-2 px-3 sm:px-6 py-2 rounded-md font-semibold text-xs sm:text-sm ${
          currentStep === 1
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-700 border border-gray-300 hover:bg-gray-50 cursor-pointer"
        }`}
        disabled={currentStep === 1}
      >
        <span>←</span> <span>Previous</span>
      </button>

      {/* Submit or Continue Button */}
      {isLastStep ? (
        <button
          type="button"
          onClick={onSubmit}
          className="flex items-center justify-center gap-1 sm:gap-3 px-3 sm:px-8 py-2 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 cursor-pointer text-xs sm:text-sm"
        >
          <span className="flex items-center justify-center w-4 h-4 sm:w-6 sm:h-6 bg-white text-green-600 rounded-full font-bold text-xs">
            ✓
          </span>
          <span>Submit Application</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={onNext}
          className="flex items-center justify-center gap-2 px-3 sm:px-8 py-2 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 cursor-pointer text-xs sm:text-sm"
        >
          <span>Next</span> <span>→</span>
        </button>
      )}
    </div>
  );
};

export default LoanFormNavigation;
