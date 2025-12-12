import React from "react";

/**
 * Permanent Address Section Component
 * Displays permanent address information in table format
 */
function PermanentAddressSection({ formData }) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Permanent Address
      </h2>

      <table className="w-full border-collapse border border-gray-400">
        <tbody>
          {/* Row 1: Address (full width) */}
          <tr>
            <td className="border border-gray-400 p-3 font-semibold text-gray-700 bg-gray-50 w-1/4">
              Address
            </td>
            <td
              colSpan="3"
              className="border border-gray-400 p-3 text-gray-800"
            >
              {formData.permanentAddress || "N/A"}
            </td>
          </tr>

          {/* Row 2: District and PIN */}
          <tr>
            <td className="border border-gray-400 p-3 font-semibold text-gray-700 bg-gray-50">
              District
            </td>
            <td className="border border-gray-400 p-3 text-gray-800">
              {formData.permanentDistrict || "N/A"}
            </td>
            <td className="border border-gray-400 p-3 font-semibold text-gray-700 bg-gray-50">
              PIN
            </td>
            <td className="border border-gray-400 p-3 text-gray-800">
              {formData.permanentPinCode || "N/A"}
            </td>
          </tr>

          {/* Row 3: State (full width) */}
          <tr>
            <td className="border border-gray-400 p-3 font-semibold text-gray-700 bg-gray-50">
              State
            </td>
            <td
              colSpan="3"
              className="border border-gray-400 p-3 text-gray-800"
            >
              {formData.permanentState || "N/A"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PermanentAddressSection;
