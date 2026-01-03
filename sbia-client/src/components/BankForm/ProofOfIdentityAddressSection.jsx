/**
 * Proof of Identity and Address Section Component
 * Displays proof of identity and proof of address documents with status
 * Shows "Received" if documents are uploaded, "Not Received" otherwise
 */
function ProofOfIdentityAddressSection({ formData }) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        A. Proof of Member Identity
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-400">
          <tbody>
            {/* Row 1: Passport & Aadhaar Card (Front) */}
            <tr>
              <td className="border border-gray-400 p-2 font-semibold text-gray-700 bg-gray-50 w-1/6">
                Passport
              </td>
              <td className="border border-gray-400 p-2 text-gray-800 w-2/6">
                {formData.passportPhoto ? "Received" : "Not Received"}
              </td>
              <td className="border border-gray-400 p-2 font-semibold text-gray-700 bg-gray-50 w-1/6">
                Aadhaar Card (Front)
              </td>
              <td className="border border-gray-400 p-2 text-gray-800 w-2/6">
                {formData.aadhaarFrontFile ? "Received" : "Not Received"}
              </td>
            </tr>

            {/* Row 2: Aadhaar Card (Back) & PAN Card Image */}
            <tr>
              <td className="border border-gray-400 p-2 font-semibold text-gray-700 bg-gray-50 w-1/6">
                Aadhaar Card (Back)
              </td>
              <td className="border border-gray-400 p-2 text-gray-800 w-2/6">
                {formData.aadhaarBackFile ? "Received" : "Not Received"}
              </td>
              <td className="border border-gray-400 p-2 font-semibold text-gray-700 bg-gray-50 w-1/6">
                PAN Card Image
              </td>
              <td className="border border-gray-400 p-2 text-gray-800 w-2/6">
                {formData.panFile ? "Received" : "Not Received"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mb-4 mt-6">
        B. Proof of Nominee Identity
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-400">
          <tbody>
            {/* Row 1: Aadhaar Front Image & Aadhaar Back Image */}
            <tr>
              <td className="border border-gray-400 p-2 font-semibold text-gray-700 bg-gray-50 w-1/6">
                Aadhaar Card (Front)
              </td>
              <td className="border border-gray-400 p-2 text-gray-800 w-2/6">
                {formData.nomineeAadhaarFrontFile ? "Received" : "Not Received"}
              </td>
              <td className="border border-gray-400 p-2 font-semibold text-gray-700 bg-gray-50 w-1/6">
                Aadhaar Card (Back)
              </td>
              <td className="border border-gray-400 p-2 text-gray-800 w-2/6">
                {formData.nomineeAadhaarBackFile ? "Received" : "Not Received"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProofOfIdentityAddressSection;
