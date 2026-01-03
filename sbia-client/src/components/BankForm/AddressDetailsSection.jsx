import React from "react";

/**
 * Current Address Section Component
 * Displays current address information in table format
 */
function AddressDetailsSection({ formData }) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Present and Communication Address
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
              {formData.presentAddress || "N/A"}
            </td>
          </tr>

          {/* Row 2: District and PIN */}
          <tr>
            <td className="border border-gray-400 p-3 font-semibold text-gray-700 bg-gray-50">
              District
            </td>
            <td className="border border-gray-400 p-3 text-gray-800">
              {formData.presentDistrict || "N/A"}
            </td>
            <td className="border border-gray-400 p-3 font-semibold text-gray-700 bg-gray-50">
              PIN
            </td>
            <td className="border border-gray-400 p-3 text-gray-800">
              {formData.presentPinCode || "N/A"}
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
              {formData.presentState || "N/A"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AddressDetailsSection;
