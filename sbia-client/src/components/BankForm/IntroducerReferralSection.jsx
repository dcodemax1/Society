/**
 * Introducer/Referral By Section Component
 * Displays introducer/referral information in table format
 * Displays Membership No., Introducer Name, and Introducer Mobile No.
 */
function IntroducerReferralSection({ formData }) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Introducer / Referral By
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-400">
          <tbody>
            {/* Row 1: Membership No, Introducer Name, Introducer Mobile No */}
            <tr>
              <td className="border border-gray-400 p-2 font-semibold text-gray-700 bg-gray-50 w-1/6">
                Membership No.
              </td>
              <td className="border border-gray-400 p-2 text-gray-800 w-2/6">
                {formData.introducerMemberId || "N/A"}
              </td>
              <td className="border border-gray-400 p-2 font-semibold text-gray-700 bg-gray-50 w-1/6">
                Introducer Name
              </td>
              <td className="border border-gray-400 p-2 text-gray-800 w-2/6">
                {formData.introducerName || "N/A"}
              </td>
            </tr>

            {/* Row 2: Introducer Mobile No */}
            <tr>
              <td className="border border-gray-400 p-2 font-semibold text-gray-700 bg-gray-50 w-1/6">
                Introducer Mobile No.
              </td>
              <td
                colSpan="3"
                className="border border-gray-400 p-2 text-gray-800 w-5/6"
              >
                {formData.introducerMobile || "N/A"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default IntroducerReferralSection;
