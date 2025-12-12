/**
 * Minors Details Section Component
 * Displays minor's information in table format (Single row with 4 columns)
 */
function MinorsDetailsSection({ formData }) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Minors Details
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-400">
          <tbody>
            {/* Single Row: 4 columns - Name, Enrollment Date, District, Mobile No */}
            <tr>
              <td className="border border-gray-400 p-2 font-semibold text-gray-700 bg-gray-50 w-1/4">
                Name
              </td>
              <td className="border border-gray-400 p-2 text-gray-800 w-1/4">
                {formData.minorName || "N/A"}
              </td>
              <td className="border border-gray-400 p-2 font-semibold text-gray-700 bg-gray-50 w-1/4">
                Enrollment Date
              </td>
              <td className="border border-gray-400 p-2 text-gray-800 w-1/4">
                {formData.minorEnrollmentDate || "N/A"}
              </td>
            </tr>

            <tr>
              <td className="border border-gray-400 p-2 font-semibold text-gray-700 bg-gray-50 w-1/4">
                District
              </td>
              <td className="border border-gray-400 p-2 text-gray-800 w-1/4">
                {formData.minorDistrict || "N/A"}
              </td>
              <td className="border border-gray-400 p-2 font-semibold text-gray-700 bg-gray-50 w-1/4">
                Mobile No
              </td>
              <td className="border border-gray-400 p-2 text-gray-800 w-1/4\">
                {formData.minorMobile || "N/A"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MinorsDetailsSection;
