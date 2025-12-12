import React, { useState, useEffect, useRef } from "react";
import { FaDownload } from "react-icons/fa";
import { BankForm } from "../components/BankForm";
import { generatePDFWithOklchFix } from "../utils/oklchColorFix";

/**
 * Form Details Page Component
 * Displays the membership form details with all submitted information
 * Includes PDF download functionality
 */
function BankFormPage() {
  const [formData, setFormData] = useState({});
  const [isDownloading, setIsDownloading] = useState(false);
  const bankFormRef = useRef(null);

  useEffect(() => {
    // First, check localStorage for bankFormData (new tab from SubmissionSuccess)
    const bankFormDataStr = localStorage.getItem("bankFormData");
    if (bankFormDataStr) {
      try {
        const parsed = JSON.parse(bankFormDataStr);
        console.log("✅ Using localStorage bankFormData from new tab");

        // Convert base64 strings back to File objects if they exist
        if (parsed.passportPhotoBase64) {
          parsed.passportPhoto = parsed.passportPhotoBase64;
          delete parsed.passportPhotoBase64;
        }
        if (parsed.signatureFileBase64) {
          parsed.signatureFile = parsed.signatureFileBase64;
          delete parsed.signatureFileBase64;
        }
        if (parsed.aadhaarFrontFileBase64) {
          parsed.aadhaarFrontFile = parsed.aadhaarFrontFileBase64;
          delete parsed.aadhaarFrontFileBase64;
        }
        if (parsed.aadhaarBackFileBase64) {
          parsed.aadhaarBackFile = parsed.aadhaarBackFileBase64;
          delete parsed.aadhaarBackFileBase64;
        }
        if (parsed.panFileBase64) {
          parsed.panFile = parsed.panFileBase64;
          delete parsed.panFileBase64;
        }
        if (parsed.bankDocumentBase64) {
          parsed.bankDocument = parsed.bankDocumentBase64;
          delete parsed.bankDocumentBase64;
        }
        if (parsed.nomineeAadhaarFrontFileBase64) {
          parsed.nomineeAadhaarFrontFile = parsed.nomineeAadhaarFrontFileBase64;
          delete parsed.nomineeAadhaarFrontFileBase64;
        }
        if (parsed.nomineeAadhaarBackFileBase64) {
          parsed.nomineeAadhaarBackFile = parsed.nomineeAadhaarBackFileBase64;
          delete parsed.nomineeAadhaarBackFileBase64;
        }

        setFormData(parsed);
        // Don't clear it immediately - keep it for page refresh
        return;
      } catch (err) {
        console.error("Error parsing localStorage bankFormData:", err);
      }
    }

    // Clear old test data from global variable if it contains the test user
    if (window.lastSubmittedFormData) {
      // Check if it's the old test data (Deepika Kumari)
      if (window.lastSubmittedFormData.fullName === "Deepika Kumari") {
        console.log("🗑️ Clearing old test data (Deepika Kumari)");
        delete window.lastSubmittedFormData;
      } else {
        console.log(
          "✅ Using global formData, passportPhoto:",
          window.lastSubmittedFormData.passportPhoto
        );
        setFormData(window.lastSubmittedFormData);
        // DO NOT clear the global variable - it might be needed if user navigates back
        return;
      }
    }

    console.log("⚠️ No global formData, trying localStorage");
    // Fallback: Retrieve form data from localStorage (for page refresh)
    const savedFormData = localStorage.getItem("memberFormData");
    if (savedFormData) {
      try {
        const parsed = JSON.parse(savedFormData);
        // Check if it's the old test data
        if (parsed.fullName === "Deepika Kumari") {
          console.log("🗑️ Clearing old test data from localStorage");
          localStorage.removeItem("memberFormData");
          setFormData({});
        } else {
          console.log(
            "Using localStorage formData, passportPhoto:",
            parsed.passportPhoto
          );
          setFormData(parsed);
        }
      } catch (error) {
        console.error("Error parsing form data:", error);
        // Set empty object if localStorage is empty/invalid
        setFormData({});
      }
    } else {
      // If no data at all, set empty object (all values will show as N/A)
      console.log("⚠️ No form data found anywhere");
      setFormData({});
    }
  }, []); // Empty dependency array - run only once on mount

  // Handle PDF Download
  const handleDownloadPDF = async () => {
    if (!bankFormRef.current) {
      alert("Form content not found. Please refresh and try again.");
      return;
    }

    try {
      setIsDownloading(true);
      console.log("Starting PDF download...");

      // Generate filename with member ID
      const memberId = formData.mobile ? formData.mobile.slice(-10) : "form";
      const fileName = `BankForm-${memberId}-${new Date().getTime()}.pdf`;

      // Use the PDF utility
      await generatePDFWithOklchFix(bankFormRef.current, fileName);

      console.log("✅ PDF download completed successfully");
      setIsDownloading(false);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert(
        `Error: ${error.message || "Failed to download PDF"}. Please try again.`
      );
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Download Button - Top Right */}
        <div className="flex justify-end mb-6 pr-4">
          <button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="bg-blue-600 hover:bg-blue-800 disabled:bg-gray-400 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
          >
            <FaDownload className="text-white" />
            <span className="text-white">
              {isDownloading ? "Downloading..." : "Download PDF"}
            </span>
          </button>
        </div>

        {/* Bank Form Content */}
        <div ref={bankFormRef} className="bg-white">
          <BankForm formData={formData} />
        </div>
      </div>
    </div>
  );
}

export default BankFormPage;
