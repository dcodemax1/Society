/**
 * KYC Information Section Component
 * Displays KYC document information (Aadhaar Card and PAN Card)
 */
function KYCInformationSection({ formData }) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        KYC Information
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-400">
          <tbody>
            {/* Row 1: Aadhaar Card */}
            <tr>
              <td className="border border-gray-400 p-2 font-semibold text-gray-700 bg-gray-50 w-1/4">
                Aadhaar Card No.
              </td>
              <td
                colSpan="3"
                className="border border-gray-400 p-2 text-gray-800 w-3/4"
              >
                {formData.aadhaarNumber || "N/A"}
              </td>
            </tr>

            {/* Row 2: PAN Card */}
            <tr>
              <td className="border border-gray-400 p-2 font-semibold text-gray-700 bg-gray-50 w-1/4">
                PAN Card No.
              </td>
              <td
                colSpan="3"
                className="border border-gray-400 p-2 text-gray-800 w-3/4"
              >
                {formData.panNumber || "N/A"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default KYCInformationSection;
