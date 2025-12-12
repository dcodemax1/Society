import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

function Declaration({ formData, onChange, formErrors = {} }) {
  const [errors, setErrors] = useState({});
  const [isSaved, setIsSaved] = useState(!!formData.declarationDate);
  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

  // Auto-populate current date on component mount
  useEffect(() => {
    if (!formData.declarationDate) {
      const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
      onChange({ target: { name: "declarationDate", value: today } });
    }
  }, []);

  // Handle file selection with validation
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
      const validTypes = ["image/png", "image/jpeg"];
      if (!validTypes.includes(file.type)) {
        setErrors({
          ...errors,
          [name]: "Invalid file type. Please upload PNG or JPG",
        });
        return;
      }

      setErrors({ ...errors, [name]: "" });
      onChange({ target: { name, value: file } });
    }
  };

  // Handle file deletion
  const handleDeleteFile = (name) => {
    onChange({ target: { name, value: null } });
    setErrors({ ...errors, [name]: "" });
  };

  // Handle Save button click
  const handleSave = () => {
    if (!formData.declarationPlace || !formData.signatureFile) {
      alert("Please fill in place and upload signature before saving");
      return;
    }
    setIsSaved(true);
  };

  // Handle Clear button click
  const handleClear = () => {
    onChange({ target: { name: "declarationPlace", value: "" } });
    onChange({ target: { name: "signatureFile", value: null } });
    setErrors({});
    setIsSaved(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Declaration
        </h2>
        <p className="text-sm text-gray-600">
          Sign and confirm your application
        </p>
      </div>

      <div className="bg-green-50 p-5 rounded-lg border-l-4 border-green-600">
        <p className="text-sm text-gray-700 leading-relaxed">
          I hereby declare that the information provided above is true and
          correct to the best of my knowledge, and I agree to abide by all the
          rules and regulations of Shreejan Credit Co-operative Society Ltd.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        {/* Left Section - Place, Date, and Signature */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Place */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Place <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="declarationPlace"
                value={formData.declarationPlace || ""}
                onChange={onChange}
                placeholder="Enter place"
                className="w-full border border-gray-300 rounded-md p-3 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {formErrors.declarationPlace && (
                <p className="text-xs text-red-600 mt-1 font-medium">
                  ⚠️ {formErrors.declarationPlace}
                </p>
              )}
            </div>

            {/* Date - Auto-populated with current date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="declarationDate"
                value={formData.declarationDate || ""}
                onChange={onChange}
                className="w-full border border-gray-300 rounded-md p-3 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {formErrors.declarationDate && (
                <p className="text-xs text-red-600 mt-1 font-medium">
                  ⚠️ {formErrors.declarationDate}
                </p>
              )}
            </div>
          </div>

          {/* Signature Upload with Preview and Delete */}
          <div className="w-full md:w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Upload Signature <span className="text-red-500">*</span>
            </label>

            {formData.signatureFile ? (
              <div className="border border-green-300 rounded-md p-4 bg-green-50">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-green-700 font-medium">
                    ✓ File uploaded
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDeleteFile("signatureFile")}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded transition cursor-pointer flex items-center gap-2"
                    title="Delete file"
                  >
                    <RiDeleteBin6Line size={16} />
                    Delete
                  </button>
                </div>

                {/* Image Preview */}
                <div className="mb-3 max-w-xs">
                  <img
                    src={URL.createObjectURL(formData.signatureFile)}
                    alt="Signature Preview"
                    className="w-full h-auto rounded border border-green-200 max-h-40 object-cover"
                  />
                </div>

                <p className="text-xs text-gray-600">
                  <strong>File:</strong> {formData.signatureFile.name}
                </p>
                <p className="text-xs text-gray-600">
                  <strong>Size:</strong>{" "}
                  {(formData.signatureFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            ) : (
              <div className="bg-white border border-dashed border-gray-300 rounded-md p-8 flex flex-col items-center justify-center">
                <p className="text-xs text-gray-500 mb-3">PNG, JPG up to 2MB</p>
                <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-md border border-green-100 hover:bg-green-100 transition">
                  <input
                    type="file"
                    accept="image/png,image/jpeg"
                    onChange={(e) =>
                      handleFile("signatureFile", e.target.files)
                    }
                    className="hidden"
                  />
                  📁 Upload
                </label>
                <div className="text-xs text-gray-600 mt-3">No file chosen</div>
              </div>
            )}

            {errors.signatureFile && (
              <p className="text-xs text-red-600 mt-2 font-medium">
                ⚠️ {errors.signatureFile}
              </p>
            )}
            {formErrors.signatureFile && (
              <p className="text-xs text-red-600 mt-2 font-medium">
                ⚠️ {formErrors.signatureFile}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Declaration;
