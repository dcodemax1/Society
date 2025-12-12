import React, { useState, useEffect } from "react";
import PersonalDetails from "./PersonalDetails";
import Professional from "./Professional";
import Address from "./Address";
import KYCDetails from "./KYCDetails";
import Nominee from "./Nominee";
import Contribution from "./Contribution";
import ReferralBy from "./ReferralBy";
import Declaration from "./Declaration";
import FormWithValidation from "./components/FormWithValidation";
import { REQUIRED_FIELDS } from "./config/formConfig";
import { isStepValid } from "./utils/formValidation";

// Review step (Step 9)
// Displays all collected form data from all steps with edit buttons via modal
// Terms & conditions checkbox, Submit button
function Review({ formData, onChange, onEdit }) {
  const [editingSection, setEditingSection] = useState(null);
  const [modalFormErrors, setModalFormErrors] = useState({});

  const handleAgreeChange = (e) => {
    onChange({ target: { name: "agreedToTerms", value: e.target.checked } });
    // Clear error when user checks the checkbox
    if (e.target.checked) {
      onChange({ target: { name: "showTermsError", value: false } });
    }
  };

  // Map section names to step numbers
  const sectionToStepMap = {
    personalDetails: 1,
    professional: 2,
    address: 3,
    kycDetails: 4,
    nominee: 5,
    contribution: 6,
    referralBy: 7,
    declaration: 8,
  };

  // Check if current editing section is valid
  const isModalSectionValid = () => {
    if (!editingSection) return true;
    // Check if there are any errors in the current modal form
    return Object.keys(modalFormErrors).length === 0;
  };

  // Open modal for editing a section
  const openSectionEditor = (sectionName) => {
    setEditingSection(sectionName);
  };

  // Close modal without saving
  const closeSectionEditor = () => {
    setEditingSection(null);
  };

  // Save section and close modal
  const saveSectionAndClose = () => {
    setEditingSection(null);
  };

  const ReviewSection = ({ title, fields, sectionName }) => (
    <div className="mb-4 bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm">
      <div className="bg-gray-200 p-4 flex justify-between items-center">
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        <button
          onClick={() => openSectionEditor(sectionName)}
          className="bg-green-600 hover:bg-green-700 text-white text-xs font-medium px-3 py-1 rounded flex items-center gap-1 transition-colors cursor-pointer"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          Edit
        </button>
      </div>
      {/* Section Content */}
      <div className="p-5 space-y-2 bg-gray-50">
        {fields.map((field, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-gray-200 last:border-b-0 gap-2"
          >
            <span className="text-sm font-medium text-gray-700">
              {field.label}
            </span>
            <span className="text-sm text-gray-900 break-all">
              {field.value || (
                <span className="text-gray-400">Not provided</span>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-3 lg:space-y-2 px-2 sm:px-0">
      {/* Centered Heading */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Review Your Application
        </h2>
        <p className="text-sm text-gray-600">
          Please carefully review all the information below. You can edit any
          section before final submission.
        </p>
      </div>

      {/* Personal Details */}
      <ReviewSection
        title="Personal Details"
        sectionName="personalDetails"
        fields={[
          {
            label: "Full Name",
            fieldName: "fullName",
            value: formData.fullName,
          },
          {
            label: "Email ID",
            fieldName: "email",
            value: formData.email,
          },
          {
            label: "Father Name",
            fieldName: "fatherName",
            value: formData.fatherName,
          },
          {
            label: "Mother Name",
            fieldName: "motherName",
            value: formData.motherName,
          },
          {
            label: "Mobile Number",
            fieldName: "mobile",
            value: formData.mobile,
          },
          {
            label: "WhatsApp Number",
            fieldName: "whatsappNumber",
            value: formData.whatsappNumber,
          },
          { label: "Gender", fieldName: "gender", value: formData.gender },
          {
            label: "Date of Birth",
            fieldName: "dob",
            value:
              formData.dobDay && formData.dobMonth && formData.dobYear
                ? `${formData.dobDay}/${formData.dobMonth}/${formData.dobYear}`
                : "",
          },
          {
            label: "Age",
            fieldName: "age",
            value: formData.dob
              ? new Date().getFullYear() - new Date(formData.dob).getFullYear()
              : "",
          },
          {
            label: "Religion",
            fieldName: "religion",
            value: formData.religion,
          },
          {
            label: "Nationality",
            fieldName: "nationality",
            value: formData.nationality || "India",
          },
        ]}
      />

      {/* Professional Details */}
      <ReviewSection
        title="Professional Details"
        sectionName="professional"
        fields={[
          {
            label: "Occupation",
            fieldName: "occupation",
            value: formData.occupation,
          },
          {
            label:
              formData.occupation === "Other"
                ? "Other Occupation"
                : "Employer / Business Name",
            fieldName:
              formData.occupation === "Other"
                ? "occupationOther"
                : "employerName",
            value: formData.occupationOther || formData.employerName,
          },
          {
            label: "Designation / Role",
            fieldName: "designation",
            value: formData.designation,
          },
          {
            label: "Monthly Income",
            fieldName: "monthlyIncome",
            value: formData.monthlyIncome ? `₹${formData.monthlyIncome}` : "",
          },
          {
            label: "Annual Income",
            fieldName: "annualIncome",
            value: formData.monthlyIncome
              ? `₹${formData.monthlyIncome * 12}`
              : "",
          },
          {
            label: "Office / Workplace Address",
            fieldName: "officeAddress",
            value: formData.officeAddress,
          },
          {
            label: "Office PIN Code",
            fieldName: "officePin",
            value: formData.officePin,
          },
          {
            label: "Office District",
            fieldName: "officeDistrict",
            value: formData.officeDistrict,
          },
          {
            label: "Office State",
            fieldName: "officeState",
            value: formData.officeState,
          },
        ]}
      />

      {/* Address Details */}
      <ReviewSection
        title="Address Details"
        sectionName="address"
        fields={[
          {
            label: "Permanent Address",
            fieldName: "permanentAddress",
            value: formData.permanentAddress,
          },
          {
            label: "Permanent PIN Code",
            fieldName: "permanentPinCode",
            value: formData.permanentPinCode,
          },
          {
            label: "Permanent District",
            fieldName: "permanentDistrict",
            value: formData.permanentDistrict,
          },
          {
            label: "Permanent State",
            fieldName: "permanentState",
            value: formData.permanentState,
          },
          {
            label: "Same as Permanent Address",
            fieldName: "sameAsPerminent",
            value: formData.sameAsPerminent === "yes" ? "Yes" : "No",
          },
          {
            label: "Present / Current Address",
            fieldName: "presentAddress",
            value: formData.presentAddress,
          },
          {
            label: "Present PIN Code",
            fieldName: "presentPinCode",
            value: formData.presentPinCode,
          },
          {
            label: "Present District",
            fieldName: "presentDistrict",
            value: formData.presentDistrict,
          },
          {
            label: "Present State",
            fieldName: "presentState",
            value: formData.presentState,
          },
        ]}
      />

      {/* KYC Details */}
      <ReviewSection
        title="KYC Details"
        sectionName="kycDetails"
        fields={[
          {
            label: "Aadhaar Number",
            fieldName: "memberAadhaar",
            value: formData.memberAadhaar,
          },
          {
            label: "Aadhaar Front Image",
            fieldName: "aadhaarFrontFile",
            value: formData.aadhaarFrontFile?.name || "Not provided",
          },
          {
            label: "Aadhaar Back Image",
            fieldName: "aadhaarBackFile",
            value: formData.aadhaarBackFile?.name || "Not provided",
          },
          {
            label: "PAN Number",
            fieldName: "pan",
            value: formData.pan,
          },
          {
            label: "PAN Card Image",
            fieldName: "panFile",
            value: formData.panFile?.name || "Not provided",
          },
          {
            label: "Passport Photo",
            fieldName: "passportPhoto",
            value: formData.passportPhoto?.name || "Not provided",
          },
          {
            label: "Passbook / Cancelled Cheque",
            fieldName: "bankDocument",
            value: formData.bankDocument?.name || "Not provided",
          },
        ]}
      />

      {/* Nominee Details */}
      <ReviewSection
        title="Nominee Details"
        sectionName="nominee"
        fields={[
          {
            label: "Nominee Name",
            fieldName: "nomineeName",
            value: formData.nomineeName,
          },
          {
            label: "Relationship",
            fieldName: "nomineeRelation",
            value:
              formData.nomineeRelation === "Other"
                ? formData.nomineeRelationOther
                : formData.nomineeRelation,
          },
          {
            label: "Date of Birth",
            fieldName: "nomineeDob",
            value:
              formData.nomineeDobDay &&
              formData.nomineeDobMonth &&
              formData.nomineeDobYear
                ? `${formData.nomineeDobDay}/${formData.nomineeDobMonth}/${formData.nomineeDobYear}`
                : "",
          },
          {
            label: "Nominee Aadhaar Number",
            fieldName: "nomineeAadhaar",
            value: formData.nomineeAadhaar,
          },
          {
            label: "Nominee Aadhaar Front",
            fieldName: "nomineeAadhaarFrontFile",
            value: formData.nomineeAadhaarFrontFile?.name || "Not provided",
          },
          {
            label: "Nominee Aadhaar Back",
            fieldName: "nomineeAadhaarBackFile",
            value: formData.nomineeAadhaarBackFile?.name || "Not provided",
          },
        ]}
      />

      {/* Contribution Details */}
      <ReviewSection
        title="Contribution Details"
        sectionName="contribution"
        fields={[
          {
            label: "Monthly Contribution",
            fieldName: "monthlyContribution",
            value: formData.monthlyContribution
              ? `₹${formData.monthlyContribution}`
              : "",
          },
          {
            label: "Payment Mode",
            fieldName: "paymentMode",
            value: formData.paymentMode,
          },
        ]}
      />

      {/* Referral By */}
      <ReviewSection
        title="Referral By - Member Introduction"
        sectionName="referralBy"
        fields={[
          {
            label: "Introducer Name",
            fieldName: "introducerName",
            value: formData.introducerName || "Not provided",
          },
          {
            label: "Introducer ID",
            fieldName: "introducerMemberId",
            value: formData.introducerMemberId || "Not provided",
          },
          {
            label: "Introducer Mobile",
            fieldName: "introducerMobile",
            value: formData.introducerMobile || "Not provided",
          },
        ]}
      />

      {/* Declaration */}
      <ReviewSection
        title="Declaration"
        sectionName="declaration"
        fields={[
          {
            label: "Declaration Place",
            fieldName: "declarationPlace",
            value: formData.declarationPlace,
          },
          {
            label: "Declaration Date",
            fieldName: "declarationDate",
            value: formData.declarationDate,
          },
          {
            label: "Signature Upload",
            fieldName: "signatureFile",
            value: formData.signatureFile?.name || "Not provided",
          },
        ]}
      />

      {/* Terms and Conditions Section */}
      <div className="mb-6 bg-green-50 rounded-lg overflow-hidden border-l-8 border-l-green-600 border border-gray-200 shadow-sm">
        <div className="p-5 space-y-4">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="agreedToTerms"
              checked={formData.agreedToTerms || false}
              onChange={handleAgreeChange}
              className="mt-1 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 cursor-pointer"
            />
            <div className="flex-1">
              <label
                htmlFor="agreedToTerms"
                className="text-sm font-medium text-gray-900 cursor-pointer"
              >
                I agree to the Terms and Conditions
              </label>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                I hereby declare that all the information provided in this
                application is true, complete, and accurate to the best of my
                knowledge. I understand that any false or misleading information
                may result in rejection of my application or membership
                cancellation. I also agree to abide by all the rules,
                regulations, and bylaws of the organization.
              </p>
            </div>
          </div>
        </div>
        {/* Error message displayed below checkbox */}
        {formData.showTermsError && !formData.agreedToTerms && (
          <div className="px-5 pb-4 text-sm text-red-600 font-medium">
            ⚠️ Please agree to the Terms and Conditions to continue
          </div>
        )}
      </div>

      {/* Edit Section Modal with Blur Background */}
      {editingSection && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-100">
            {/* Modal Header */}
            <div className="bg-green-600 text-white p-4 flex justify-between items-center sticky top-0 z-40">
              <h3 className="text-lg font-semibold capitalize">
                Edit {editingSection.replace(/([A-Z])/g, " $1").trim()}
              </h3>
              {isModalSectionValid() ? (
                <button
                  onClick={closeSectionEditor}
                  className="text-white hover:bg-green-700 w-8 h-8 flex items-center justify-center rounded transition cursor-pointer"
                  title="Close"
                >
                  ✕
                </button>
              ) : (
                <div className="w-8 h-8"></div>
              )}
            </div>

            {/* Modal Content - Render the appropriate form component with validation */}
            <div className="p-6">
              {editingSection === "personalDetails" && (
                <FormWithValidation
                  formComponent={PersonalDetails}
                  formData={formData}
                  onChange={onChange}
                  stepNum={1}
                  onErrorsChange={setModalFormErrors}
                />
              )}
              {editingSection === "professional" && (
                <FormWithValidation
                  formComponent={Professional}
                  formData={formData}
                  onChange={onChange}
                  stepNum={2}
                  onErrorsChange={setModalFormErrors}
                />
              )}
              {editingSection === "address" && (
                <FormWithValidation
                  formComponent={Address}
                  formData={formData}
                  onChange={onChange}
                  stepNum={3}
                  onErrorsChange={setModalFormErrors}
                />
              )}
              {editingSection === "kycDetails" && (
                <FormWithValidation
                  formComponent={KYCDetails}
                  formData={formData}
                  onChange={onChange}
                  stepNum={4}
                  onErrorsChange={setModalFormErrors}
                />
              )}
              {editingSection === "nominee" && (
                <FormWithValidation
                  formComponent={Nominee}
                  formData={formData}
                  onChange={onChange}
                  stepNum={5}
                  onErrorsChange={setModalFormErrors}
                />
              )}
              {editingSection === "contribution" && (
                <FormWithValidation
                  formComponent={Contribution}
                  formData={formData}
                  onChange={onChange}
                  stepNum={6}
                  onErrorsChange={setModalFormErrors}
                />
              )}
              {editingSection === "referralBy" && (
                <FormWithValidation
                  formComponent={ReferralBy}
                  formData={formData}
                  onChange={onChange}
                  stepNum={7}
                  onErrorsChange={setModalFormErrors}
                />
              )}
              {editingSection === "declaration" && (
                <FormWithValidation
                  formComponent={Declaration}
                  formData={formData}
                  onChange={onChange}
                  stepNum={8}
                  onErrorsChange={setModalFormErrors}
                />
              )}
            </div>
            <div className="flex gap-3 p-6 pt-4 border-t border-gray-200 sticky bottom-0 bg-white">
              <button
                onClick={closeSectionEditor}
                disabled={!isModalSectionValid()}
                className={`flex-1 px-4 py-2 rounded-md font-medium transition ${
                  isModalSectionValid()
                    ? "border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
                    : "border border-gray-300 text-gray-400 bg-gray-100 cursor-not-allowed"
                }`}
              >
                Cancel
              </button>
              <button
                onClick={saveSectionAndClose}
                disabled={!isModalSectionValid()}
                className={`flex-1 px-4 py-2 rounded-md font-medium transition ${
                  isModalSectionValid()
                    ? "bg-green-600 text-white hover:bg-green-700 cursor-pointer"
                    : "bg-gray-400 text-gray-200 cursor-not-allowed"
                }`}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Old Edit Popup Modal - Keep for backward compatibility if needed */}
      {false && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full max-h-96 overflow-y-auto border border-gray-100">
            {/* Popup Header */}
            <div className="bg-green-600 text-white p-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Edit Field</h3>
              <button
                onClick={closeEditPopup}
                className="text-white hover:bg-green-700 w-8 h-8 flex items-center justify-center rounded transition"
              >
                ✕
              </button>
            </div>

            {/* Popup Content */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {editPopup.fieldName}
                </label>
                {editPopup.isFileField ? (
                  <div className="space-y-2">
                    <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded border border-gray-200">
                      <span className="font-medium">Current file:</span>{" "}
                      {selectedFile
                        ? selectedFile.name
                        : editPopup.currentValue || "Not provided"}
                    </div>
                    <label className="block">
                      <div className="border-2 border-dashed border-green-300 rounded-md p-6 text-center cursor-pointer hover:bg-green-50 transition bg-white">
                        {getPreviewUrl() ? (
                          <div className="space-y-2">
                            <img
                              src={getPreviewUrl()}
                              alt="Preview"
                              className="w-full h-40 object-cover rounded"
                            />
                            <p className="text-xs text-green-600 font-medium">
                              ✓ Image selected: {selectedFile.name}
                            </p>
                          </div>
                        ) : (
                          <div>
                            <svg
                              className="w-8 h-8 mx-auto text-green-500 mb-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                              />
                            </svg>
                            <p className="text-sm font-medium text-gray-700">
                              Click to select a new image
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              or drag and drop
                            </p>
                          </div>
                        )}
                      </div>
                      <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    autoFocus
                  />
                )}
              </div>

              {/* Popup Actions */}
              <div className="flex gap-3 pt-4">
                {editPopup.isFileField ? (
                  <button
                    onClick={saveEdit}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium transition"
                  >
                    Upload
                  </button>
                ) : (
                  <>
                    <button
                      onClick={closeEditPopup}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={saveEdit}
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium transition"
                    >
                      Save
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Review;
