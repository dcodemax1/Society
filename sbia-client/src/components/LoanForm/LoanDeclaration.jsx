/**
 * Loan Declaration Component (Loan Form Step 6)
 * Fields: Declaration text, Member Name (placeholder), Member ID, Checkbox acceptance
 * File: displays terms and conditions with checkbox for acceptance
 */

import React from "react";

function LoanDeclaration({ formData, onChange }) {
  const handleDeclarationChange = (e) => {
    onChange({
      target: {
        name: "loanDeclarationAccepted",
        value: e.target.checked,
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Declaration Section */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Member Declaration
        </h2>

        {/* Declaration Text */}
        <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-md">
          <p className="text-sm text-gray-800 leading-relaxed">
            <span className="font-semibold text-blue-700">
              I, {formData.memberName || "[Member Name]"}
            </span>{" "}
            <span className="text-gray-600">
              (Member ID {formData.memberId || "—"})
            </span>{" "}
            declare that the information provided is true and correct. I agree
            to repay the loan through monthly EMIs, accept an annual interest of{" "}
            <span className="font-semibold text-red-600">18%</span>, a
            processing fee of{" "}
            <span className="font-semibold text-red-600">2%</span> and authorize
            recovery from my deposit and guarantors in case of default.
          </p>
        </div>

        {/* Declaration Checkbox */}
        <div className="mb-6">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              name="loanDeclarationAccepted"
              checked={formData.loanDeclarationAccepted || false}
              onChange={handleDeclarationChange}
              className="mt-1 w-5 h-5 rounded cursor-pointer"
            />
            <span className="text-sm text-gray-700">
              I agree to the Loan Terms & Society Rules
            </span>
          </label>
          {!formData.loanDeclarationAccepted && (
            <p className="text-xs text-red-500 mt-2 ml-8">
              Please accept the declaration
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoanDeclaration;
