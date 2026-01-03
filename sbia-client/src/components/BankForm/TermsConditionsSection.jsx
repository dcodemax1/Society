/**
 * Terms & Conditions Section Component
 * Displays terms, remarks, and signature of authorized signatory
 * Simple layout without table borders
 */
function TermsConditionsSection({ formData }) {
  return (
    <div className="mb-8">
      <h4 className="text-base font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-300">
        Terms & Conditions
      </h4>

      {/* Terms List */}
      <div className="mb-8">
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
          <li>Terms1</li>
          <li>Terms2</li>
          <li>Terms3</li>
          <li>Terms4</li>
          <li>Terms5</li>
        </ul>
      </div>

      {/* Signature Row */}
      <div className="flex justify-between items-end">
        {/* Left side - Signature */}
        <div>
          <p className="text-sm text-gray-700 font-medium">
            Signature of Authorised Signatory
          </p>
        </div>

        {/* Right side - Company Seal */}
        <div>
          <p className="text-sm text-gray-700 font-medium">Company Seal</p>
        </div>
      </div>
    </div>
  );
}

export default TermsConditionsSection;
