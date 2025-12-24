import React, { useState, useEffect, useRef } from "react";
import { FaDownload } from "react-icons/fa";
import { BankForm } from "../components/BankForm";
import { generatePDFWithOklchFix } from "../utils/oklchColorFix";

function BankFormPage() {
  const [formData, setFormData] = useState({});
  const [isDownloading, setIsDownloading] = useState(false);
  const bankFormRef = useRef(null);

  useEffect(() => {
    const bankFormDataStr = localStorage.getItem("bankFormData");
    if (bankFormDataStr) {
      try {
        const parsed = JSON.parse(bankFormDataStr);

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
      } catch (err) {}
    }

    // Clear old test data from global variable if it contains the test user
    if (window.lastSubmittedFormData) {
      // Check if it's the old test data (Deepika Kumari)
      if (window.lastSubmittedFormData.fullName === "Deepika Kumari") {
        delete window.lastSubmittedFormData;
      } else {
        setFormData(window.lastSubmittedFormData);
        // DO NOT clear the global variable - it might be needed if user navigates back
        return;
      }
    }

    const savedFormData = localStorage.getItem("memberFormData");
    if (savedFormData) {
      try {
        const parsed = JSON.parse(savedFormData);
        // Check if it's the old test data
        if (parsed.fullName === "Deepika Kumari") {
          localStorage.removeItem("memberFormData");
          setFormData({});
        } else {
          setFormData(parsed);
        }
      } catch (error) {
        setFormData({});
      }
    } else {
     
      setFormData({});
    }
  }, []);

  
  const handleDownloadPDF = async () => {
    if (!bankFormRef.current) {
      alert("Form content not found. Please refresh and try again.");
      return;
    }

    try {
      setIsDownloading(true);

      // Generate filename with member ID
      const memberId = formData.mobile ? formData.mobile.slice(-10) : "form";
      const fileName = `BankForm-${memberId}-${new Date().getTime()}.pdf`;

      // Use the PDF utility
      await generatePDFWithOklchFix(bankFormRef.current, fileName);

      setIsDownloading(false);
    } catch (error) {
      alert(
        `Error: ${error.message || "Failed to download PDF"}. Please try again.`
      );
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
       
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
