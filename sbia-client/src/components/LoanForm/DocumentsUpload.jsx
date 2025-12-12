/**
 * Documents Upload Component (Loan Form Step 5)
 * Fields: Bank Document Type (Passbook or Blank Cheque - Mandatory), Document Upload
 * File upload with type validation, size limits, image preview, and delete functionality
 */

import React, { useState, useImperativeHandle, forwardRef } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

const DocumentsUpload = forwardRef(function DocumentsUpload(
  { formData, onChange },
  ref
) {
  const [documentError, setDocumentError] = useState("");
  const [typeError, setTypeError] = useState("");

  const maxSize = 2 * 1024 * 1024; // 2MB

  // Expose validation to parent component
  useImperativeHandle(ref, () => ({
    validateFields: () => {
      const newErrors = {};

      if (
        !formData.bankDocumentType ||
        formData.bankDocumentType.trim() === ""
      ) {
        setTypeError("Please select a bank document type");
      } else {
        setTypeError("");
      }

      if (!formData.bankDocument || formData.bankDocument.trim() === "") {
        setDocumentError(
          `Please upload ${formData.bankDocumentType || "a document"}`
        );
      } else {
        setDocumentError("");
      }

      return !formData.bankDocumentType || !formData.bankDocument;
    },
  }));

  const handleDocTypeChange = (e) => {
    const docType = e.target.value;
    onChange({
      target: {
        name: "bankDocumentType",
        value: docType,
      },
    });
    // Clear the previous document when type changes
    handleDelete("bankDocument", setDocumentError);
    setTypeError(""); // Clear type error when user selects a type
  };

  const handleFileChange = (e, fieldName, setError) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > maxSize) {
      setError("File size must not exceed 2MB.");
      return;
    }

    // Validate file type (JPG, PNG, PDF only)
    const validTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!validTypes.includes(file.type)) {
      setError("Only JPG, PNG, or PDF files are allowed.");
      return;
    }

    setError("");

    // Store both file name and file object
    onChange({
      target: {
        name: fieldName,
        value: file.name,
      },
    });

    onChange({
      target: {
        name: `${fieldName}_file`,
        value: file,
      },
    });
  };

  const handleDelete = (fieldName, setError) => {
    setError("");
    onChange({
      target: {
        name: fieldName,
        value: "",
      },
    });
    onChange({
      target: {
        name: `${fieldName}_file`,
        value: null,
      },
    });
  };

  const getPreviewUrl = (fieldName) => {
    const file = formData[`${fieldName}_file`];
    return file ? URL.createObjectURL(file) : null;
  };

  const isImage = (fieldName) => {
    const file = formData[`${fieldName}_file`];
    return file && file.type.startsWith("image");
  };

  return (
    <div className="space-y-6">
      {/* Bank Details Section with Outer Dotted Border */}
      <div className="border-2 border-dashed border-gray-400 rounded-lg p-6 bg-white">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Bank Details
        </h2>

        {/* Error Messages at Top */}
        {typeError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-700 font-medium">{typeError}</p>
          </div>
        )}

        {/* Bank Document Type Dropdown */}
        <div className="mb-6 w-full md:w-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bank Document Type
            <span className="text-red-500">*</span>
          </label>
          <select
            name="bankDocumentType"
            value={formData.bankDocumentType || ""}
            onChange={handleDocTypeChange}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">-- Select Document Type --</option>
            <option value="Passbook">Passbook</option>
            <option value="Blank Cheque">Blank Cheque</option>
          </select>
        </div>

        {/* Document Upload - Show only after selecting a type */}
        {formData.bankDocumentType && (
          <div className="w-full md:w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {formData.bankDocumentType}
              <span className="text-red-500">*</span>
            </label>

            {formData.bankDocument ? (
              // Uploaded State
              <div className="border border-green-300 rounded-md p-4 bg-green-50">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-green-700 font-medium">
                    ✓ File uploaded
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      handleDelete("bankDocument", setDocumentError)
                    }
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded transition cursor-pointer flex items-center gap-2"
                    title="Delete file"
                  >
                    <RiDeleteBin6Line size={16} />
                    Delete
                  </button>
                </div>

                {/* Image Preview */}
                {isImage("bankDocument") && getPreviewUrl("bankDocument") && (
                  <div className="mb-3 max-w-xs">
                    <img
                      src={getPreviewUrl("bankDocument")}
                      alt="Preview"
                      className="w-full h-auto rounded border border-green-200 max-h-40 object-cover"
                    />
                  </div>
                )}

                {/* File Info */}
                <p className="text-xs text-gray-600">
                  <strong>File:</strong> {formData.bankDocument}
                </p>
                <p className="text-xs text-gray-600">
                  <strong>Size:</strong>{" "}
                  {((formData.bankDocument_file?.size || 0) / 1024).toFixed(2)}{" "}
                  KB
                </p>
              </div>
            ) : (
              // Empty State
              <div className="bg-white border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors">
                <input
                  type="file"
                  id="bankDocument"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={(e) =>
                    handleFileChange(e, "bankDocument", setDocumentError)
                  }
                  className="hidden"
                />
                <label
                  htmlFor="bankDocument"
                  className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-md border border-green-100 hover:bg-green-100 transition"
                >
                  📁 Upload
                </label>
                <p className="text-xs text-gray-500 mt-3">No file chosen</p>
              </div>
            )}

            <p className="text-xs text-gray-500 mt-2">JPG/PNG/PDF up to 2MB</p>
            {documentError && (
              <p className="text-xs text-red-600 mt-1 font-medium">
                ⚠️ {documentError}
              </p>
            )}
            {!formData.bankDocument &&
              !documentError &&
              formData.bankDocumentType && (
                <p className="text-xs text-red-500 mt-1">
                  {formData.bankDocumentType} is required
                </p>
              )}
          </div>
        )}
      </div>
    </div>
  );
});

export default DocumentsUpload;
