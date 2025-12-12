import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaWhatsapp, FaDownload } from "react-icons/fa";
import jsPDF from "jspdf";
import IDCardDesign from "./IDCardDesign";
import { STATE_CODES } from "./config/formConfig";

/**
 * Submission Success Component
 * Displays after member form submission
 * Shows: Generated Member ID, Success message, ID Card, Download/Share options
 */
function SubmissionSuccess({ formData }) {
  const navigate = useNavigate();

  // Save form data to global variable when component mounts (preserves File objects)
  useEffect(() => {
    // Store the entire formData object in a global variable without serializing
    // This preserves File objects like passportPhoto
    console.log("🔵 SubmissionSuccess mounted - formData:", formData);
    console.log("🔵 passportPhoto:", formData.passportPhoto);

    if (formData && Object.keys(formData).length > 0) {
      window.lastSubmittedFormData = formData;
      console.log(
        "✅ Saved formData to global variable with passportPhoto:",
        formData.passportPhoto
      );
    }
  }, []); // Empty dependency array - only run once on mount

  // Generate Member ID: RegisteredMobileNumber (10 digits) + StateCode (2 digits) = 12 digits total
  const generateMemberId = () => {
    const mobile = (formData.mobile || "0000000000").slice(-10); // Get last 10 digits of mobile
    const stateCode = STATE_CODES[formData.permanentState] || "XX"; // Get 2-digit state code
    return `${mobile}${stateCode}`;
  };

  const memberId = generateMemberId();
  const stateName = formData.permanentState || "N/A";
  const stateCode = STATE_CODES[stateName] || "XX";

  // Navigate to Form Details in new tab with membership data
  const handleDownloadPDF = async () => {
    try {
      // Convert File objects to base64 for storage
      const formDataForStorage = { ...formData };

      // Helper function to convert File to base64
      const fileToBase64 = (file) => {
        return new Promise((resolve) => {
          if (!file) {
            resolve(null);
            return;
          }
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
      };

      // Convert all file fields to base64
      formDataForStorage.passportPhotoBase64 = await fileToBase64(
        formData.passportPhoto
      );
      formDataForStorage.signatureFileBase64 = await fileToBase64(
        formData.signatureFile
      );
      formDataForStorage.aadhaarFrontFileBase64 = await fileToBase64(
        formData.aadhaarFrontFile
      );
      formDataForStorage.aadhaarBackFileBase64 = await fileToBase64(
        formData.aadhaarBackFile
      );
      formDataForStorage.panFileBase64 = await fileToBase64(formData.panFile);
      formDataForStorage.bankDocumentBase64 = await fileToBase64(
        formData.bankDocument
      );
      formDataForStorage.nomineeAadhaarFrontFileBase64 = await fileToBase64(
        formData.nomineeAadhaarFrontFile
      );
      formDataForStorage.nomineeAadhaarBackFileBase64 = await fileToBase64(
        formData.nomineeAadhaarBackFile
      );

      // Remove original File objects
      delete formDataForStorage.passportPhoto;
      delete formDataForStorage.signatureFile;
      delete formDataForStorage.aadhaarFrontFile;
      delete formDataForStorage.aadhaarBackFile;
      delete formDataForStorage.panFile;
      delete formDataForStorage.bankDocument;
      delete formDataForStorage.nomineeAadhaarFrontFile;
      delete formDataForStorage.nomineeAadhaarBackFile;

      localStorage.setItem("bankFormData", JSON.stringify(formDataForStorage));

      console.log("✅ Stored bankFormData with file base64 strings");
      // Open bank form in new tab
      window.open("/bank-form", "_blank");
    } catch (err) {
      console.error("Error converting files:", err);
      alert("Error processing files. Please try again.");
    }
  };

  // Share Form Details on WhatsApp
  const handleShareWhatsApp = async () => {
    const message = `Membership Form Details - Member ID: ${memberId}\n\nMember Name: ${formData.fullName}\nMobile: ${formData.mobile}\n\nPlease review the form details.`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-green-50 to-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Message with Hindi Text */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <svg
              className="w-10 h-10 text-green-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* Main Success Message */}
          <div className="mb-6">
            <p className="text-lg md:text-xl text-gray-800 font-semibold mb-3">
              आपका आवेदन सफलतापूर्वक जमा हो गया है।
            </p>
            <p className="text-base md:text-lg text-gray-700 mb-2">
              आपकी सदस्यता स्वीकृत होने पर आपका Member ID होगा:{" "}
              <span className="font-bold text-green-600">{memberId}</span>
            </p>
            <p className="text-base text-gray-700 mb-2">
              हमने इसके साथ एक पुष्टि ईमेल/call भी भेज दिया है।
            </p>
            <p className="text-base text-gray-700">
              साथ ही आप अपना ID Card डाउनलोड कर सकते हैं।
            </p>
          </div>
        </div>

        {/* ID Card Display */}
        <div>
          <IDCardDesign
            memberId={memberId}
            formData={formData}
            stateCode={stateCode}
            stateName={stateName}
          />
        </div>

        {/* Download & Share Buttons */}
        <div className="flex justify-center my-8">
          <button
            onClick={handleDownloadPDF}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 sm:py-3 px-4 sm:px-8 rounded-lg flex items-center justify-center gap-2 transition-colors text-xs sm:text-base whitespace-nowrap"
          >
            <FaDownload className="w-4 sm:w-5 h-4 sm:h-5" />
            View Form Details
          </button>
        </div>

        {/* Payment Section */}
        <div className="mt-8 bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4 max-w-2xl mx-auto md:max-w-xl lg:max-w-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
            💳 Complete Your Payment
          </h3>
          <p className="text-gray-700 mb-4 text-center text-sm">
            Scan the QR code below to complete your payment and activate your
            membership.
          </p>

          {/* QR Code Section */}
          <div className="flex flex-col items-center justify-center mb-6">
            {/* QR Code Placeholder */}
            <div className="bg-white rounded-lg p-4 border-2 border-gray-200 mb-4 flex items-center justify-center w-52 h-52">
              <div className="text-center">
                <div className="w-48 h-48 bg-gray-100 rounded border-4 border-dashed border-gray-300 flex items-center justify-center">
                  <svg
                    className="w-20 h-20 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="text-center space-y-2">
              <p className="text-gray-700 font-semibold">
                Payment Amount:{" "}
                <span className="text-green-600 font-bold text-lg">
                  ₹{formData.monthlyContribution || "0"}
                </span>
              </p>
              <p className="text-gray-600 text-sm">
                Member ID:{" "}
                <span className="font-mono font-bold">{memberId}</span>
              </p>
              <p className="text-gray-500 text-xs mt-2">
                Scan with any UPI app (Google Pay, PhonePe, BHIM, etc.)
              </p>
            </div>
          </div>

          {/* Payment Methods Info - REMOVED */}
          {/* Info text - REMOVED */}
        </div>

        {/* Support Footer */}
        <div className="mt-8 text-center text-gray-600 text-sm">
          <p className="mb-4">Have questions? Contact us</p>
          <a
            href="mailto:support@shreejancrdit.in"
            className="text-green-600 hover:text-green-700 font-semibold"
          >
            support@shreejancrdit.in
          </a>
        </div>
      </div>
    </div>
  );
}

export default SubmissionSuccess;
