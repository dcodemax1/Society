import React from "react";

/**
 * Professional Details Section Component
 * Displays professional/employment information in table format
 */
function EmploymentInformationSection({ formData }) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Professional Details
      </h2>

      <table className="w-full border-collapse border border-gray-400">
        <tbody>
          {/* Row 1: Occupation (full width) */}
          <tr>
            <td className="border border-gray-400 p-3 font-semibold text-gray-700 bg-gray-50 w-1/4">
              Occupation
            </td>
            <td
              colSpan="3"
              className="border border-gray-400 p-3 text-gray-800"
            >
              {formData.occupation || "N/A"}
            </td>
          </tr>

          {/* Row 2: Employer / Business Name (full width) */}
          <tr>
            <td className="border border-gray-400 p-3 font-semibold text-gray-700 bg-gray-50">
              Employer / Business Name
            </td>
            <td
              colSpan="3"
              className="border border-gray-400 p-3 text-gray-800"
            >
              {formData.employerName || "N/A"}
            </td>
          </tr>

          {/* Row 3: Designation / Role (full width) */}
          <tr>
            <td className="border border-gray-400 p-3 font-semibold text-gray-700 bg-gray-50">
              Designation / Role
            </td>
            <td
              colSpan="3"
              className="border border-gray-400 p-3 text-gray-800"
            >
              {formData.designation || "N/A"}
            </td>
          </tr>

          {/* Row 4: Monthly Income (full width) */}
          <tr>
            <td className="border border-gray-400 p-3 font-semibold text-gray-700 bg-gray-50">
              Monthly Income (₹)
            </td>
            <td
              colSpan="3"
              className="border border-gray-400 p-3 text-gray-800"
            >
              ₹{formData.monthlyIncome || "0"}
            </td>
          </tr>

          {/* Row 5: Annual Income (full width) */}
          <tr>
            <td className="border border-gray-400 p-3 font-semibold text-gray-700 bg-gray-50">
              Annual Income (₹)
            </td>
            <td
              colSpan="3"
              className="border border-gray-400 p-3 text-gray-800"
            >
              ₹{formData.annualIncome || "0"}
            </td>
          </tr>

          {/* Row 6: Office / Workplace Address (full width) */}
          <tr>
            <td className="border border-gray-400 p-3 font-semibold text-gray-700 bg-gray-50">
              Office / Workplace Address
            </td>
            <td
              colSpan="3"
              className="border border-gray-400 p-3 text-gray-800"
            >
              {formData.officeAddress || "N/A"}
            </td>
          </tr>

          {/* Row 7: District and PIN */}
          <tr>
            <td className="border border-gray-400 p-3 font-semibold text-gray-700 bg-gray-50">
              District
            </td>
            <td className="border border-gray-400 p-3 text-gray-800">
              {formData.officeDistrict || "N/A"}
            </td>
            <td className="border border-gray-400 p-3 font-semibold text-gray-700 bg-gray-50">
              PIN
            </td>
            <td className="border border-gray-400 p-3 text-gray-800">
              {formData.officePin || "N/A"}
            </td>
          </tr>

          {/* Row 8: State (full width) */}
          <tr>
            <td className="border border-gray-400 p-3 font-semibold text-gray-700 bg-gray-50">
              State
            </td>
            <td
              colSpan="3"
              className="border border-gray-400 p-3 text-gray-800"
            >
              {formData.officeState || "N/A"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default EmploymentInformationSection;
