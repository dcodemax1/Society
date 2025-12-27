import React, { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

/**
 * Reusable Aadhaar Front/Back Upload Component
 * Handles two-column upload layout for Aadhaar front and back
 *
 * Props:
 * - frontLabel: label for front side (default: "Aadhaar Front")
 * - backLabel: label for back side (default: "Aadhaar Back")
 * - frontFieldName: field name for front image
 * - backFieldName: field name for back image
 * - frontValue: current front image file
 * - backValue: current back image file
 * - onChange: callback for file changes - (fieldName, file) => void
 * - onDelete: callback for file deletion - (fieldName) => void
 * - isRequired: whether fields are required (default: true)
 * - errors: object with error messages {frontFieldName: "error", backFieldName: "error"}
 * - maxSize: max file size in bytes (default: 2MB)
 * - acceptTypes: accepted file types (default: "image/*")
 */
function AadhaarUpload({
  frontLabel = "Aadhaar Front",
  backLabel = "Aadhaar Back",
  frontFieldName = "aadhaarFront",
  backFieldName = "aadhaarBack",
  frontValue = null,
  backValue = null,
  onChange = () => {},
  onDelete = () => {},
  isRequired = true,
  errors = {},
  maxSize = 2 * 1024 * 1024, // 2MB
  acceptTypes = "image/png,image/jpeg,application/pdf",
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Front Side */}
      <UploadBox
        label={frontLabel}
        fieldName={frontFieldName}
        value={frontValue}
        onChange={onChange}
        onDelete={onDelete}
        error={errors[frontFieldName]}
        isRequired={isRequired}
        maxSize={maxSize}
        acceptTypes={acceptTypes}
      />

      {/* Back Side */}
      <UploadBox
        label={backLabel}
        fieldName={backFieldName}
        value={backValue}
        onChange={onChange}
        onDelete={onDelete}
        error={errors[backFieldName]}
        isRequired={isRequired}
        maxSize={maxSize}
        acceptTypes={acceptTypes}
      />
    </div>
  );
}

/**
 * Individual Upload Box Component (Internal)
 */
function UploadBox({
  label,
  fieldName,
  value,
  onChange,
  onDelete,
  error,
  isRequired,
  maxSize,
  acceptTypes,
}) {
  const [internalError, setInternalError] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);

  // Create and manage preview URL
  useEffect(() => {
    if (value instanceof File) {
      try {
        const url = URL.createObjectURL(value);
        setPreviewUrl(url);
        // Cleanup function
        return () => {
          URL.revokeObjectURL(url);
        };
      } catch (error) {
        console.error(`Failed to create preview URL for ${fieldName}:`, error);
      }
    } else {
      setPreviewUrl(null);
    }
  }, [value, fieldName]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > maxSize) {
      const sizeMB = (maxSize / (1024 * 1024)).toFixed(0);
      setInternalError(`File size is too big. Maximum size is ${sizeMB}MB`);
      return;
    }

    // Validate file type
    const validTypes = ["image/png", "image/jpeg", "application/pdf"];
    if (!validTypes.includes(file.type)) {
      setInternalError(`Invalid file type. Please upload PNG, JPG, or PDF`);
      return;
    }

    setInternalError("");
    onChange(fieldName, file);
  };

  const handleDelete = () => {
    setInternalError("");
    setPreviewUrl(null);
    onDelete(fieldName);
  };

  const displayError = error || internalError;

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {isRequired && <span className="text-red-500">*</span>}
      </label>

      {value ? (
        // Uploaded State
        <div className="border border-green-300 rounded-md p-4 bg-green-50">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-green-700 font-medium">
              ✓ File uploaded
            </span>
            <button
              type="button"
              onClick={handleDelete}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded transition cursor-pointer flex items-center gap-2"
              title="Delete file"
            >
              <RiDeleteBin6Line size={16} />
              Delete
            </button>
          </div>

          {/* Image Preview - Hide for PDFs */}
          {previewUrl && !value.type.includes("pdf") && (
            <div className="mb-3 max-w-xs">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-auto rounded border border-green-200 max-h-40 object-cover"
              />
            </div>
          )}

          {/* File Info */}
          <p className="text-xs text-gray-600">
            <strong>File:</strong> {value.name}
          </p>
          <p className="text-xs text-gray-600">
            <strong>Size:</strong> {(value.size / 1024).toFixed(2)} KB
          </p>
        </div>
      ) : (
        // Empty State
        <div className="bg-white border border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
          <p className="text-xs text-gray-500 mb-3">PNG, JPG, PDF up to 2MB</p>
          <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-md border border-green-100 hover:bg-green-100 transition">
            <input
              type="file"
              accept={acceptTypes}
              onChange={handleFileChange}
              className="hidden"
            />
            📁 Upload
          </label>
          <div className="text-xs text-gray-600 mt-3">No file chosen</div>
        </div>
      )}

      {/* Error Display */}
      {displayError && (
        <p className="text-xs text-red-600 mt-2 font-medium">
          ⚠️ {displayError}
        </p>
      )}
    </div>
  );
}

export default AadhaarUpload;
