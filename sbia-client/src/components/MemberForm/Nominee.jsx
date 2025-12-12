import React, { useState } from "react";
import { DateOfBirthInput, AadhaarUpload } from "./reusable";

// Nominee Details step (Step 5)
// Fields: Nominee Name, Relationship (with Other option), DOB (Day/Month/Year dropdowns), Age (auto-calc),
// Guardian Name (conditional for minors - displayed right after Age), Nominee KYC Documents
// with Aadhaar Number input and Aadhaar Upload with image preview and delete

function Nominee({ formData, onChange, formErrors = {} }) {
  const [errors, setErrors] = useState({});
  const [nomineeAge, setNomineeAge] = useState("");
  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

  // Handle age change from DateOfBirthInput component
  const handleAgeChange = (age) => {
    setNomineeAge(age);
    // Update formData with calculated age
    onChange({ target: { name: "nomineeAge", value: age } });
  };

  // Handle DOB dropdown changes
  const handleNomineeDOBChange = (field, value) => {
    onChange({ target: { name: field, value } });
  };

  // Handle file changes (for upload component)
  const handleFileChange = (fieldName, file) => {
    onChange({ target: { name: fieldName, value: file } });
  };

  // Handle file deletion
  const handleDeleteFile = (name) => {
    onChange({ target: { name, value: null } });
    setErrors({ ...errors, [name]: "" });
  };

  return (
    <div className="space-y-4 lg:space-y-2">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Nominee Details
        </h2>
      </div>

      {/* Row 1: Nominee Name (50%) | Relationship (50%) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-2">
        {/* Nominee Name - 50% */}
        <div>
          <label className="block text-sm md:text-base font-medium text-gray-700 mb-1">
            Nominee Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="nomineeName"
            value={formData.nomineeName || ""}
            onChange={onChange}
            placeholder="Enter nominee's full name"
            className="w-full border border-gray-300 rounded-md p-3 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {formErrors.nomineeName && (
            <p className="text-xs text-red-600 mt-1 font-medium">
              ⚠️ {formErrors.nomineeName}
            </p>
          )}
        </div>

        {/* Relationship - 50% */}
        <div>
          <label className="block text-sm md:text-base font-medium text-gray-700 mb-1">
            Relationship <span className="text-red-500">*</span>
          </label>
          <select
            name="nomineeRelation"
            value={formData.nomineeRelation || ""}
            onChange={onChange}
            className="w-full border border-gray-300 rounded-md p-3 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select relationship</option>
            <option value="Spouse">Spouse (Husband/Wife)</option>
            <option value="Son">Son</option>
            <option value="Daughter">Daughter</option>
            <option value="Parent">Parent</option>
            <option value="Other">Other</option>
          </select>
          {formErrors.nomineeRelation && (
            <p className="text-xs text-red-600 mt-1 font-medium">
              ⚠️ {formErrors.nomineeRelation}
            </p>
          )}
        </div>
      </div>

      {/* Show "Other" input if relationship is Other */}
      {formData.nomineeRelation === "Other" && (
        <div>
          <label className="block text-sm md:text-base font-medium text-gray-700 mb-1">
            Please specify relationship
          </label>
          <input
            type="text"
            name="nomineeRelationOther"
            value={formData.nomineeRelationOther || ""}
            onChange={onChange}
            placeholder="Enter relationship"
            className="w-full border border-gray-300 rounded-md p-3 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      )}

      {/* Nominee DOB - Day/Month/Year Dropdowns with Age (4 Equal Columns) */}
      <div>
        <DateOfBirthInput
          dayFieldName="nomineeDobDay"
          monthFieldName="nomineeDobMonth"
          yearFieldName="nomineeDobYear"
          dayValue={formData.nomineeDobDay}
          monthValue={formData.nomineeDobMonth}
          yearValue={formData.nomineeDobYear}
          onDateChange={handleNomineeDOBChange}
          onAgeChange={handleAgeChange}
          label="Nominee Date of Birth"
          isRequired={true}
          layout="cols-4"
          showAge={true}
        />
        {(formErrors.nomineeDobDay ||
          formErrors.nomineeDobMonth ||
          formErrors.nomineeDobYear) && (
          <p className="text-xs text-red-600 mt-2 font-medium">
            ⚠️ Nominee Date of Birth is required
          </p>
        )}
      </div>

      {/* Nominee KYC Documents Section */}
      <div className="pt-4 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          Nominee KYC Documents
        </h3>

        {/* Aadhaar Number */}
        <div className="mb-6 w-full md:w-1/2">
          <label className="block text-sm md:text-base font-medium text-gray-700 mb-1">
            Aadhaar Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="nomineeAadhaar"
            value={formData.nomineeAadhaar || ""}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "").slice(0, 12);
              onChange({ target: { name: "nomineeAadhaar", value } });
            }}
            inputMode="numeric"
            placeholder="Enter 12-digit Aadhaar number"
            maxLength="12"
            className="w-full border border-gray-300 rounded-md p-3 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {formErrors.nomineeAadhaar && (
            <p className="text-xs text-red-600 mt-1 font-medium">
              ⚠️ {formErrors.nomineeAadhaar}
            </p>
          )}
        </div>

        {/* Aadhaar Upload - 50/50 Front & Back */}
        <AadhaarUpload
          frontLabel="Aadhaar Front Image"
          backLabel="Aadhaar Back Image"
          frontFieldName="nomineeAadhaarFrontFile"
          backFieldName="nomineeAadhaarBackFile"
          frontValue={formData.nomineeAadhaarFrontFile}
          backValue={formData.nomineeAadhaarBackFile}
          onChange={handleFileChange}
          onDelete={handleDeleteFile}
          errors={errors}
          isRequired={true}
        />
      </div>
    </div>
  );
}

export default Nominee;
