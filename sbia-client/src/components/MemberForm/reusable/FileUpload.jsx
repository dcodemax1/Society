import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

/**
 * Reusable File Upload Component
 * Handles file upload with validation, preview, and delete functionality
 *
 * Props:
 * - label: field label text
 * - fieldName: name of the field
 * - value: current file value
 * - onChange: callback for file changes - (fieldName, file) => void
 * - onDelete: callback for file deletion - (fieldName) => void
 * - acceptTypes: accepted file types (default: "image/*")
 * - maxSize: max file size in bytes (default: 2MB)
 * - isRequired: whether field is required (default: true)
 * - error: error message to display
 * - showPreview: whether to show image preview (default: true)
 * - helpText: help text below upload button (default: "PNG, JPG, PDF up to 2MB")
 * - containerClass: additional container classes
 */
function FileUpload({
  label = "Upload File",
  fieldName = "file",
  value = null,
  onChange = () => {},
  onDelete = () => {},
  acceptTypes = "image/*",
  maxSize = 2 * 1024 * 1024, // 2MB
  isRequired = true,
  error = "",
  showPreview = true,
  helpText = "PNG, JPG, PDF up to 2MB",
  containerClass = "",
}) {
  const [internalError, setInternalError] = useState("");

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
    const validTypes = getValidFileTypes(acceptTypes);
    if (!validTypes.includes(file.type)) {
      setInternalError(`Invalid file type. Please upload PNG, JPG, or PDF`);
      return;
    }

    setInternalError("");
    onChange(fieldName, file);
  };

  const handleDelete = () => {
    setInternalError("");
    onDelete(fieldName);
  };

  const previewUrl = value ? URL.createObjectURL(value) : null;
  const displayError = error || internalError;

  // Determine if we should show image preview
  const isImage = value && value.type.startsWith("image");

  return (
    <div className={containerClass}>
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

          {/* Image Preview */}
          {showPreview && isImage && previewUrl && (
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
          <p className="text-xs text-gray-500 mb-3">{helpText}</p>
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

/**
 * Helper function to get valid file types based on accept string
 */
function getValidFileTypes(acceptString) {
  const typeMap = {
    "image/png": ["image/png"],
    "image/jpeg": ["image/jpeg"],
    "application/pdf": ["application/pdf"],
    "image/*": ["image/png", "image/jpeg"],
    "image/jpeg|image/png": ["image/jpeg", "image/png"],
    "image/*|application/pdf": ["image/png", "image/jpeg", "application/pdf"],
  };

  if (typeMap[acceptString]) {
    return typeMap[acceptString];
  }

  // Default validation
  if (acceptString.includes("image")) {
    return ["image/png", "image/jpeg"];
  }

  return [];
}

export default FileUpload;
