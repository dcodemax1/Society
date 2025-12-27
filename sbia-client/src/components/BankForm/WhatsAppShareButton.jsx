import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { generatePDFBlob } from "../../utils/pdfDownloadHelper";

/**
 * WhatsApp Share Button Component
 * Generates a PDF of the bank form and shares it via WhatsApp
 */
function WhatsAppShareButton({ formRef, formData = {} }) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleWhatsAppShare = async () => {
    if (!formRef?.current) {
      alert("Form content not found. Please refresh and try again.");
      return;
    }

    try {
      setIsGenerating(true);

      // Generate PDF Blob
      const pdfBlob = await generatePDFBlob(formRef.current);

      // Create a File object from the Blob
      const memberId = formData.mobile ? formData.mobile.slice(-10) : "form";
      const fileName = `BankForm-${memberId}-${new Date().getTime()}.pdf`;
      const pdfFile = new File([pdfBlob], fileName, {
        type: "application/pdf",
      });

      // Check if the device supports Web Share API with file sharing
      if (navigator.canShare && navigator.canShare({ files: [pdfFile] })) {
        try {
          await navigator.share({
            title: "Bank Form",
            text: `Please find attached the bank form for ${
              formData.fullName || "member"
            }`,
            files: [pdfFile],
          });
          setIsGenerating(false);
          return;
        } catch (error) {
          // User cancelled the share dialog or error occurred
          if (error.name !== "AbortError") {
            console.error("Share error:", error);
          }
          setIsGenerating(false);
          return;
        }
      }

      // Fallback for devices without Web Share API support
      // Check if on mobile
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const message = encodeURIComponent(
        `Hi, I am sharing my bank form for membership. Please find it attached.\n\nFile: ${fileName}`
      );

      if (isMobile) {
        // Try to open WhatsApp mobile app first
        try {
          window.location.href = `whatsapp://send?text=${message}`;

          // Fallback to web if mobile app doesn't open
          setTimeout(() => {
            window.open(
              `https://web.whatsapp.com/send?text=${message}`,
              "_blank"
            );
          }, 500);
        } catch (error) {
          // If WhatsApp protocol fails, open web
          window.open(
            `https://web.whatsapp.com/send?text=${message}`,
            "_blank"
          );
        }
      } else {
        // Desktop: Open WhatsApp Web
        window.open(`https://web.whatsapp.com/send?text=${message}`, "_blank");
      }

      setIsGenerating(false);
    } catch (error) {
      alert(
        `Error: ${error.message || "Failed to generate PDF"}. Please try again.`
      );
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={handleWhatsAppShare}
      disabled={isGenerating}
      className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
      title="Share bank form via WhatsApp"
    >
      <FaWhatsapp className="text-white text-lg" />
      <span className="text-white">
        {isGenerating ? "Generating..." : "Share via WhatsApp"}
      </span>
    </button>
  );
}

export default WhatsAppShareButton;
