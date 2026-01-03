import React from "react";

/**
 * Professional Details Section Component
 * Displays professional information in table format with 2 columns per row
 */
function ProfessionalDetailsSection({ formData }) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Professional Details
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-400">
          <tbody>
            {/* Row 1: Occupation & Employer/Business Name */}
            <tr>
              <td className="border border-gray-400 p-2 font-semibold text-gray-700 bg-gray-50 w-1/6">
                Occupation
              </td>
              <td className="border border-gray-400 p-2 text-gray-800 w-2/6">
                {formData.occupation || "N/A"}
              </td>
              <td className="border border-gray-400 p-2 font-semibold text-gray-700 bg-gray-50 w-1/6">
                Employer/Business Name
              </td>
              <td className="border border-gray-400 p-2 text-gray-800 w-2/6">
                {formData.employerName || "N/A"}
              </td>
            </tr>

            {/* Row 2: Designation & Monthly Income */}
            <tr>
              <td className="border border-gray-400 p-2 font-semibold text-gray-700 bg-gray-50 w-1/6">
                Designation/Role
              </td>
              <td className="border border-gray-400 p-2 text-gray-800 w-2/6">
                {formData.designation || "N/A"}
              </td>
              <td className="border border-gray-400 p-2 font-semibold text-gray-700 bg-gray-50 w-1/6">
                Monthly Income (₹)
              </td>
              <td className="border border-gray-400 p-2 text-gray-800 w-2/6">
                {formData.monthlyIncome
                  ? `₹${parseInt(formData.monthlyIncome).toLocaleString(
                      "en-IN"
                    )}`
                  : "N/A"}
              </td>
            </tr>

            {/* Row 3: Annual Income & Office Address */}
            <tr>
              <td className="border border-gray-400 p-2 font-semibold text-gray-700 bg-gray-50 w-1/6">
                Annual Income (₹)
              </td>
              <td className="border border-gray-400 p-2 text-gray-800 w-2/6">
                {formData.annualIncome
                  ? `₹${parseInt(formData.annualIncome).toLocaleString(
                      "en-IN"
                    )}`
                  : "N/A"}
              </td>
              <td className="border border-gray-400 p-2 font-semibold text-gray-700 bg-gray-50 w-1/6">
                Office Address
              </td>
              <td className="border border-gray-400 p-2 text-gray-800 w-2/6">
                {formData.officeAddress || "N/A"}
              </td>
            </tr>

            {/* Row 4: PIN Code & District */}
            <tr>
              <td className="border border-gray-400 p-2 font-semibold text-gray-700 bg-gray-50 w-1/6">
                PIN Code
              </td>
              <td className="border border-gray-400 p-2 text-gray-800 w-2/6">
                {formData.officePin || "N/A"}
              </td>
              <td className="border border-gray-400 p-2 font-semibold text-gray-700 bg-gray-50 w-1/6">
                District
              </td>
              <td className="border border-gray-400 p-2 text-gray-800 w-2/6">
                {formData.officeDistrict || "N/A"}
              </td>
            </tr>

            {/* Row 5: State */}
            <tr>
              <td className="border border-gray-400 p-2 font-semibold text-gray-700 bg-gray-50 w-1/6">
                State
              </td>
              <td className="border border-gray-400 p-2 text-gray-800 w-2/6">
                {formData.officeState || "N/A"}
              </td>
              <td colSpan="2"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProfessionalDetailsSection;
