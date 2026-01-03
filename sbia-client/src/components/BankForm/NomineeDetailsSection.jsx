import React from "react";

/**
 * Nominee Details Section Component
 * Displays nominee information in table format with 2 columns per row
 */
function NomineeDetailsSection({ formData }) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Nominee Details
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-400">
          <tbody>
            {/* Row 1: Nominee Name & Relationship */}
            <tr>
              <td className="border border-gray-400 p-2 font-semibold text-gray-700 bg-gray-50 w-1/6">
                Nominee Name
              </td>
              <td className="border border-gray-400 p-2 text-gray-800 w-2/6">
                {formData.nomineeName || "N/A"}
              </td>
              <td className="border border-gray-400 p-2 font-semibold text-gray-700 bg-gray-50 w-1/6">
                Relationship
              </td>
              <td className="border border-gray-400 p-2 text-gray-800 w-2/6">
                {formData.nomineeRelationOther
                  ? formData.nomineeRelationOther
                  : formData.nomineeRelation || "N/A"}
              </td>
            </tr>

            {/* Row 2: Date of Birth & Age */}
            <tr>
              <td className="border border-gray-400 p-2 font-semibold text-gray-700 bg-gray-50 w-1/6">
                Date of Birth
              </td>
              <td className="border border-gray-400 p-2 text-gray-800 w-2/6">
                {formData.nomineeDobDay &&
                formData.nomineeDobMonth &&
                formData.nomineeDobYear
                  ? `${String(formData.nomineeDobDay).padStart(
                      2,
                      "0"
                    )}/${String(formData.nomineeDobMonth).padStart(2, "0")}/${
                      formData.nomineeDobYear
                    }`
                  : "N/A"}
              </td>
              <td className="border border-gray-400 p-2 font-semibold text-gray-700 bg-gray-50 w-1/6">
                Age
              </td>
              <td className="border border-gray-400 p-2 text-gray-800 w-2/6">
                {formData.nomineeAge || "N/A"}
              </td>
            </tr>

            {/* Row 3: Aadhaar Number & Status */}
            <tr>
              <td className="border border-gray-400 p-2 font-semibold text-gray-700 bg-gray-50 w-1/6">
                Aadhaar Number
              </td>
              <td className="border border-gray-400 p-2 text-gray-800 w-2/6">
                {formData.nomineeAadhaar || "N/A"}
              </td>
              <td className="border border-gray-400 p-2 font-semibold text-gray-700 bg-gray-50 w-1/6">
                Aadhaar Status
              </td>
              <td className="border border-gray-400 p-2 text-gray-800 w-2/6">
                {formData.nomineeAadhaarFrontFile &&
                formData.nomineeAadhaarBackFile
                  ? "Uploaded"
                  : "Not Uploaded"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NomineeDetailsSection;
