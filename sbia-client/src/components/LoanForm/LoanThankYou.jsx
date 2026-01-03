/**
 * Loan Thank You Page Component
 * Displays after successful form submission
 */

import React from "react";

function LoanThankYou({ formData, onNewApplication }) {
  return (
    <>
      {/* Success Animation - Checkmark Circle */}
      <div className="flex justify-center mb-8">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 bg-green-100 rounded-full animate-pulse"></div>
          <div className="absolute inset-0 flex items-center justify-center bg-green-50 rounded-full border-4 border-green-500">
            <svg
              className="w-12 h-12 text-green-600 animate-bounce"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Main Message */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Thank You!</h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          Your loan application has been successfully submitted
        </p>
      </div>

      {/* Status Box */}
      <div className="bg-green-50 border-l-4 border-green-600 rounded-lg p-6 mb-12">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 pt-1">
            <svg
              className="w-6 h-6 text-green-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">
              Application Being Processed
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Your loan application is now being processed by our committee. You
              will receive updates via SMS and email at the registered contact
              details.
            </p>
          </div>
        </div>
      </div>

      {/* Go to Home Button */}
      <div className="flex justify-center">
        <button
          onClick={() => (window.location.href = "/")}
          className="px-8 py-2 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition text-sm"
        >
          Go to Home
        </button>
      </div>
    </>
  );
}

export default LoanThankYou;
