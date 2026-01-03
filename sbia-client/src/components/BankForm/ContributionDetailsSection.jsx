import React from "react";

/**
 * Contribution Details Section Component
 * Displays contribution information in table format
 */
function ContributionDetailsSection({ formData }) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Contribution Details
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-400 p-3 font-semibold text-gray-700 bg-gray-50 w-1/2">
                Monthly Contribution Amount
              </th>
              <th className="border border-gray-400 p-3 font-semibold text-gray-700 bg-gray-50 w-1/2">
                Payment Mode
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-400 p-3 text-gray-800 text-center w-1/2">
                {formData.monthlyContribution
                  ? `₹${formData.monthlyContribution}`
                  : "N/A"}
              </td>
              <td className="border border-gray-400 p-3 text-gray-800 text-center w-1/2">
                {formData.paymentMode || "N/A"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ContributionDetailsSection;
