import React, { useState, useEffect, useRef } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

// KYC uploads layout with image preview and delete functionality
function KYCDetails({ formData, onChange, formErrors = {} }) {
  const [errors, setErrors] = useState({});
  const [previewUrls, setPreviewUrls] = useState({});
  const fileInputRefs = useRef({});
  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

  // Create preview URLs when files change
  useEffect(() => {
    const newPreviewUrls = {};

    Object.keys(formData).forEach((key) => {
      // Check if the value is a File object
      // Match both naming conventions: ending with "File" or specific field names
      const isFileField =
        (key.endsWith("File") ||
          key === "passportPhoto" ||
          key === "bankDocument") &&
        formData[key] instanceof File;

      if (isFileField && !previewUrls[key]) {
        try {
          newPreviewUrls[key] = URL.createObjectURL(formData[key]);
        } catch (error) {
          console.error(`Failed to create preview URL for ${key}:`, error);
        }
      }
    });

    if (Object.keys(newPreviewUrls).length > 0) {
      setPreviewUrls((prev) => ({ ...prev, ...newPreviewUrls }));
    }

    // Cleanup function to revoke URLs when component unmounts or files are cleared
    return () => {
      newPreviewUrls &&
        Object.values(newPreviewUrls).forEach((url) => {
          if (url && typeof url === "string") URL.revokeObjectURL(url);
        });
    };
  }, [formData]);

  // Helper to validate and handle file selection
  const handleFile = (name, files) => {
    if (files && files[0]) {
      const file = files[0];

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        setErrors({
          ...errors,
          [name]: "File size is too big. Maximum size is 2MB",
        });
        return;
      }

      // Validate file type
      const validTypes = ["image/png", "image/jpeg", "application/pdf"];
      if (!validTypes.includes(file.type)) {
        setErrors({
          ...errors,
          [name]: "Invalid file type. Please upload PNG, JPG, or PDF",
        });
        return;
      }

      setErrors({ ...errors, [name]: "" });
      onChange({ target: { name, value: file } });
    }
  };

  // Helper to delete file
  const handleDeleteFile = (name) => {
    // Revoke the preview URL if it exists
    if (previewUrls[name]) {
      URL.revokeObjectURL(previewUrls[name]);
      setPreviewUrls((prev) => {
        const newUrls = { ...prev };
        delete newUrls[name];
        return newUrls;
      });
    }
    onChange({ target: { name, value: null } });
    setErrors({ ...errors, [name]: "" });
  };

  // Helper to render file upload UI with preview
  const renderFileUpload = (label, fieldName, acceptTypes = "image/*") => {
    const file = formData[fieldName];
    const error = errors[fieldName];
    const formError = formErrors[fieldName];
    const previewUrl = previewUrls[fieldName] || null;

    return (
      <div>
        <label className="block text-base font-medium text-gray-700 mb-2">
          {label} <span className="text-red-500">*</span>
        </label>
        {file ? (
          <div className="border border-green-300 rounded-md p-4 bg-green-50">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-green-700 font-medium">
                ✓ File uploaded
              </span>
              <button
                type="button"
                onClick={() => handleDeleteFile(fieldName)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded transition cursor-pointer flex items-center gap-2"
                title="Delete file"
              >
                <RiDeleteBin6Line size={16} />
                Delete
              </button>
            </div>
            {/* Image Preview - Hide for PDFs */}
            {acceptTypes.includes("image") &&
              previewUrl &&
              !file.type.includes("pdf") && (
                <div className="mb-3 max-w-xs">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-auto rounded border border-green-200 max-h-40 object-cover"
                  />
                </div>
              )}
            <p className="text-xs text-gray-600">
              <strong>File:</strong> {file.name}
            </p>
            <p className="text-xs text-gray-600">
              <strong>Size:</strong> {(file.size / 1024).toFixed(2)} KB
            </p>
          </div>
        ) : (
          <div className="bg-white border border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
            <p className="text-xs text-gray-500 mb-3">
              PNG, JPG, PDF up to 2MB
            </p>
            <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-md border border-green-100 hover:bg-green-100 transition">
              <input
                type="file"
                accept={acceptTypes}
                onChange={(e) => handleFile(fieldName, e.target.files)}
                className="hidden"
              />
              📁 Upload
            </label>
            <div className="text-xs text-gray-600 mt-3">No file chosen</div>
          </div>
        )}
        {error && (
          <p className="text-xs text-red-600 mt-2 font-medium">⚠️ {error}</p>
        )}
        {formError && (
          <p className="text-xs text-red-600 mt-2 font-medium">
            ⚠️ {formError}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 lg:space-y-3">
      {/* Aadhaar Section */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        {/* Aadhaar Number - Half Width */}
        <div className="mb-6 w-full md:w-1/2">
          <label className="block text-base font-medium text-gray-700 mb-2">
            Aadhaar Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="memberAadhaar"
            value={formData.memberAadhaar || ""}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "").slice(0, 12);
              onChange({ target: { name: "memberAadhaar", value } });
            }}
            inputMode="numeric"
            placeholder="Enter Aadhaar number (12 digits)"
            maxLength="12"
            className="w-full border border-gray-300 rounded-md p-3 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {formErrors.memberAadhaar && (
            <p className="text-xs text-red-600 mt-1 font-medium">
              ⚠️ {formErrors.memberAadhaar}
            </p>
          )}
        </div>

        {/* Aadhaar Front & Back - 50/50 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Aadhaar Front */}
          {renderFileUpload(
            "Aadhaar Front Image",
            "aadhaarFrontFile",
            "image/png,image/jpeg"
          )}

          {/* Aadhaar Back */}
          {renderFileUpload(
            "Aadhaar Back Image",
            "aadhaarBackFile",
            "image/png,image/jpeg"
          )}
        </div>
      </div>

      {/* PAN Card & Passport Photo in 50-50 Layout */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        {/* PAN Number Input - Full Width */}
        <div className="mb-6 w-full md:w-1/2">
          <label className="block text-base font-medium text-gray-700 mb-2">
            PAN Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="pan"
            value={formData.pan || ""}
            onChange={(e) => {
              const value = e.target.value.toUpperCase().slice(0, 10);
              onChange({ target: { name: "pan", value } });
            }}
            placeholder="Enter PAN number (10 chars)"
            maxLength="10"
            className="w-full border border-gray-300 rounded-md p-3 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {formErrors.pan && (
            <p className="text-xs text-red-600 mt-1 font-medium">
              ⚠️ {formErrors.pan}
            </p>
          )}
        </div>

        {/* File Uploads - 50-50 Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* PAN Card Section */}
          <div>
            {renderFileUpload(
              "PAN Card",
              "panFile",
              "image/png,image/jpeg,application/pdf"
            )}
          </div>

          {/* Passport Photo Section */}
          <div>
            {renderFileUpload(
              "Passport-sized Photo",
              "passportPhoto",
              "image/png,image/jpeg"
            )}
          </div>
        </div>
      </div>

      {/* Bank Details Section */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Bank Details
        </h3>

        <div className="w-full lg:w-1/2">
          {renderFileUpload(
            "Passbook or Cancelled Cheque",
            "bankDocument",
            "image/png,image/jpeg,application/pdf"
          )}
        </div>
      </div>
    </div>
  );
}

export default KYCDetails;
