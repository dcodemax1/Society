import React, { useState, useEffect } from "react";

/**
 * Declaration Section Component
 * Displays declaration text with signature image and membership contribution details
 */
function DeclarationSection({ formData }) {
  const [signatureUrl, setSignatureUrl] = useState(null);

  // Create object URL from signature photo on mount and when it changes
  useEffect(() => {
    if (formData.signatureFile) {
      try {
        if (formData.signatureFile instanceof File) {
          const url = URL.createObjectURL(formData.signatureFile);
          setSignatureUrl(url);

          // Cleanup function to revoke object URL
          return () => {
            URL.revokeObjectURL(url);
          };
        } else if (typeof formData.signatureFile === "string") {
          setSignatureUrl(formData.signatureFile);
        } else if (
          formData.signatureFile &&
          typeof formData.signatureFile === "object"
        ) {
          const url = URL.createObjectURL(formData.signatureFile);
          setSignatureUrl(url);
          return () => {
            URL.revokeObjectURL(url);
          };
        }
      } catch (error) {
        console.error("Error processing signature:", error);
        setSignatureUrl(null);
      }
    } else {
      setSignatureUrl(null);
    }
  }, [formData.signatureFile]);

  // Get today's date in DD/MM/YYYY format
  const getTodayDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Declaration</h3>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-400">
          <tbody>
            {/* Row 1: Declaration Text with Signature - Combined */}
            <tr>
              <td className="border border-gray-400 p-6 text-gray-800 w-2/3">
                <p className="text-sm leading-relaxed">
                  I,{" "}
                  <span className="font-semibold">
                    {formData.fullName || "N/A"}
                  </span>
                  , want to become a member of Shreejan Multistate Credit
                  Co-operative Society. Also I do hereby declare and affirm that
                  the particulars given by me are correct to the best of my
                  knowledge and nothing has been concealed. I further certify
                  that there are no legal or police case is/are registered in my
                  name. I am bound to accept all the rules and regulations
                  formed by this organization in this regard.
                </p>
              </td>
              <td className="border border-gray-400 p-4 text-gray-800 w-1/3">
                <div className="flex flex-col justify-center items-center h-24">
                  <div className="text-center w-full">
                    {signatureUrl ? (
                      <img
                        src={signatureUrl}
                        alt="Customer Signature"
                        className="h-20 object-contain mx-auto mb-2"
                      />
                    ) : (
                      <div className="border-t border-gray-400 w-24 mx-auto mb-1"></div>
                    )}
                    <p className="text-xs font-semibold">Signature</p>
                  </div>
                </div>
              </td>
            </tr>

            {/* Row 2: Membership Payment Declaration */}
            <tr>
              <td
                colSpan="2"
                className="border border-gray-400 p-6 text-gray-800"
              >
                <p className="text-sm leading-relaxed mb-4">
                  I{" "}
                  <span className="font-semibold">
                    {formData.fullName || "N/A"}
                  </span>{" "}
                  am paying Rs.{" "}
                  <span className="font-semibold">
                    {formData.membershipAmount || "N/A"}
                  </span>
                  /Rs as <span className="font-semibold">MEMBERSHIP</span> and
                  Rs.{" "}
                  <span className="font-semibold">
                    {formData.shareAmount || "N/A"}
                  </span>
                  /Rs for{" "}
                  <span className="font-semibold">
                    {formData.shareCount || "N/A"}
                  </span>{" "}
                  share as the case maybe.
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Date:</span> {getTodayDate()}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DeclarationSection;
