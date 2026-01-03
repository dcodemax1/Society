/**
 * Loan Review & Submit Component (Loan Form Step 7)
 * Displays all collected form data from all steps with edit modals
 * Final submission page - Green inside containers, white outer container
 * Click Edit to open modal for editing that specific section
 */

import React, { useState } from "react";
import MemberLookup from "./MemberLookup";
import LoanRequestDetails from "./LoanRequestDetails";
import Guarantor1 from "./Guarantor1";
import Guarantor2 from "./Guarantor2";
import DocumentsUpload from "./DocumentsUpload";
import LoanDeclaration from "./LoanDeclaration";

function LoanReview({ formData, onChange, onEdit }) {
  const [editingSection, setEditingSection] = useState(null);
  const [previousFormData, setPreviousFormData] = useState({});
  const [modalFormErrors, setModalFormErrors] = useState({});

  // Handle checkbox change for terms agreement
  const handleAgreeChange = (e) => {
    const target = e.target || e;
    onChange({
      target: {
        name: "agreedToLoanTerms",
        value: target.checked,
        type: "checkbox",
        checked: target.checked,
      },
    });
  };

  // Helper function to render a field only if it has a value
  const renderField = (label, value, suffix = "") => {
    if (!value || value === "—" || value === "" || value === 0) {
      return null;
    }
    return (
      <div key={label} className="flex justify-between items-start">
        <p className="text-sm text-gray-700">{label}</p>
        <p className="text-sm font-medium text-gray-900 text-right">
          {value}
          {suffix}
        </p>
      </div>
    );
  };

  // Open modal for editing a section
  const openSectionEditor = (sectionName) => {
    // Save current form data before opening editor
    setPreviousFormData({ ...formData });
    setModalFormErrors({});
    setEditingSection(sectionName);
  };

  // Close modal without saving - restore previous data
  const closeSectionEditor = () => {
    // Only restore if there are unsaved changes
    // Don't restore if modal was closed through "Save Changes" button
    setEditingSection(null);
  };

  // Save section and close modal with validation
  const saveSectionAndClose = () => {
    setEditingSection(null);
    setModalFormErrors({});
  };

  // Handle changes with real-time validation
  const handleModalChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Update form data
    onChange(e);

    // Generate field-specific error message using proper field labels
    const fieldLabels = {
      // Member Lookup fields
      memberId: "Member ID",
      memberName: "Member Name",
      fathersName: "Father's/Husband's Name",
      registeredMobile: "Mobile Number",
      registeredAddress: "Registered Address",
      monthlyContribution: "Monthly Contribution",
      // Loan Request Details fields
      loanAmount: "Loan Amount",
      purposeOfLoan: "Purpose of Loan",
      purposeOfLoanOther: "Purpose of Loan (Other)",
      emiTenure: "EMI Tenure",
      whenLoanRequired: "When Loan Required",
      paymentTransferMode: "Payment Transfer Mode",
      upiId: "UPI ID",
      bankName: "Bank Name",
      accountNumber: "Account Number",
      ifscCode: "IFSC Code",
      accountType: "Account Type",
      // Guarantor 1 fields
      guarantor1Name: "Guarantor 1 Name",
      guarantor1MemberId: "Guarantor 1 Member ID",
      guarantor1Mobile: "Guarantor 1 Mobile",
      guarantor1MembershipDuration: "Guarantor 1 Membership Duration",
      // Guarantor 2 fields
      guarantor2Name: "Guarantor 2 Name",
      guarantor2MemberId: "Guarantor 2 Member ID",
      guarantor2Mobile: "Guarantor 2 Mobile",
      guarantor2MembershipDuration: "Guarantor 2 Membership Duration",
      // Declaration fields
      loanDeclarationAccepted: "Declaration Acceptance",
      bankDocument: "Bank Document",
    };

    // For checkbox fields, check if checked
    if (type === "checkbox") {
      if (!checked) {
        const fieldLabel = fieldLabels[name] || name;
        setModalFormErrors((prev) => ({
          ...prev,
          [name]: `${fieldLabel} is required`,
        }));
      } else {
        setModalFormErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    } else {
      // Check if field is empty
      if (value === "" || value === null) {
        const fieldLabel = fieldLabels[name] || name;
        setModalFormErrors((prev) => ({
          ...prev,
          [name]: `${fieldLabel} is required`,
        }));
      } else {
        // Remove error for this field if it now has a value
        setModalFormErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Review & Submit Section - White Outer Container */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Review & Submit
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Please review all the information provided below before submitting
          your loan application. You can edit any section by clicking the Edit
          button.
        </p>

        {/* Row 1: Member and Loan Details (2 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Member Details Section - Green Background */}
          <div className="bg-green-50 p-4 rounded-md border border-green-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-900">Member</h3>
              <button
                type="button"
                onClick={() => openSectionEditor("memberLookup")}
                className="text-green-600 hover:text-green-700 font-medium text-sm"
              >
                Edit
              </button>
            </div>
            <div className="space-y-4">
              {renderField("Member ID", formData.memberId)}
              {renderField("Member Name", formData.memberName)}
              {renderField("Father's / Husband's Name", formData.fathersName)}
              {renderField("Registered Mobile", formData.registeredMobile)}
              {renderField("Registered Address", formData.registeredAddress)}
              {renderField("Date of Joining", formData.dateOfJoining)}
              {formData.membershipDuration && (
                <div className="flex justify-between items-start">
                  <p className="text-sm text-gray-700">Membership Duration</p>
                  <p className="text-sm font-medium text-gray-900 text-right">
                    {formData.membershipDuration} months
                  </p>
                </div>
              )}
              {renderField(
                "Monthly Contribution",
                `₹${formData.monthlyContribution}`
              )}
            </div>
          </div>

          {/* Loan Details Section - Green Background */}
          <div className="bg-green-50 p-4 rounded-md border border-green-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-900">Loan</h3>
              <button
                type="button"
                onClick={() => openSectionEditor("loanRequestDetails")}
                className="text-green-600 hover:text-green-700 font-medium text-sm"
              >
                Edit
              </button>
            </div>
            <div className="space-y-4">
              {renderField("Loan Amount", `₹${formData.loanAmount}`)}
              {renderField("Purpose of Loan", formData.purposeOfLoan)}
              {renderField("Purpose Details", formData.purposeOfLoanOther)}
              {renderField("Loan Required", formData.whenLoanRequired)}
              {renderField("EMI Tenure", formData.emiTenure, " months")}
              {renderField(
                "Payment Transfer Mode",
                formData.paymentTransferMode
              )}
              {formData.upiId && renderField("UPI ID", formData.upiId)}
              {formData.netDisbursed &&
                renderField("Net Disbursed", `₹${formData.netDisbursed}`)}
            </div>
          </div>
        </div>

        {/* Row 2: Guarantor 1 and Guarantor 2 (2 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Guarantor 1 Section - Green Background */}
          <div className="bg-green-50 p-4 rounded-md border border-green-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-900">
                Guarantor 1 (Referrer)
              </h3>
              <button
                type="button"
                onClick={() => openSectionEditor("guarantor1")}
                className="text-green-600 hover:text-green-700 font-medium text-sm"
              >
                Edit
              </button>
            </div>
            <div className="space-y-4">
              {renderField("Guarantor 1 Name", formData.guarantor1Name)}
              {renderField("Member ID", formData.guarantor1MemberId)}
              {renderField("Registered Mobile", formData.guarantor1Mobile)}
              {formData.guarantor1MembershipDuration && (
                <div className="flex justify-between items-start">
                  <p className="text-sm text-gray-700">Membership Duration</p>
                  <p className="text-sm font-medium text-gray-900 text-right">
                    {formData.guarantor1MembershipDuration} months
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Guarantor 2 Section - Green Background */}
          <div className="bg-green-50 p-4 rounded-md border border-green-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-900">
                Guarantor 2 (Member)
              </h3>
              <button
                type="button"
                onClick={() => openSectionEditor("guarantor2")}
                className="text-green-600 hover:text-green-700 font-medium text-sm"
              >
                Edit
              </button>
            </div>
            <div className="space-y-4">
              {renderField("Guarantor 2 Name", formData.guarantor2Name)}
              {renderField("Member ID", formData.guarantor2MemberId)}
              {renderField("Registered Mobile", formData.guarantor2Mobile)}
              {formData.guarantor2MembershipDuration && (
                <div className="flex justify-between items-start">
                  <p className="text-sm text-gray-700">Membership Duration</p>
                  <p className="text-sm font-medium text-gray-900 text-right">
                    {formData.guarantor2MembershipDuration} months
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Row 3: Documents (Full Width) - Green Background */}
        <div className="bg-green-50 p-4 rounded-md border border-green-200 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-900">Documents</h3>
            <button
              type="button"
              onClick={() => openSectionEditor("documentsUpload")}
              className="text-green-600 hover:text-green-700 font-medium text-sm"
            >
              Edit
            </button>
          </div>
          <div className="space-y-4">
            {formData.bankDocumentType && formData.bankDocument && (
              <div className="flex justify-between items-start">
                <p className="text-sm text-gray-700">
                  {formData.bankDocumentType}
                </p>
                <p className="text-sm font-medium text-gray-900 text-right">
                  {formData.bankDocument}
                </p>
              </div>
            )}
            {!formData.bankDocument && formData.bankDocumentType && (
              <div className="flex justify-between items-start">
                <p className="text-sm text-gray-700">
                  {formData.bankDocumentType}
                </p>
                <p className="text-sm font-medium text-red-600 text-right">
                  Not uploaded
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Terms and Conditions Section */}
      <div className="mb-6 bg-green-50 rounded-lg overflow-hidden border-l-8 border-l-green-600 border border-gray-200 shadow-sm">
        <div className="p-5 space-y-4">
          <div className="flex gap-3 items-start">
            <input
              type="checkbox"
              id="agreedToLoanTerms"
              checked={formData.agreedToLoanTerms || false}
              onChange={handleAgreeChange}
              className="mt-1 w-4 h-4 accent-green-600 cursor-pointer flex-shrink-0"
            />
            <label
              htmlFor="agreedToLoanTerms"
              className="cursor-pointer flex-1"
            >
              <span className="text-sm font-medium text-gray-900 block">
                I agree to the Terms and Conditions
              </span>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                I hereby declare that all the information provided in this loan
                application is true, complete, and accurate to the best of my
                knowledge. I understand that any false or misleading information
                may result in rejection of my loan application. I also agree to
                repay the loan through monthly EMIs, accept an annual interest
                of 18%, a processing fee of 2%, and authorize recovery from my
                deposit and guarantors in case of default.
              </p>
            </label>
          </div>
        </div>
        {/* Error message displayed below checkbox */}
        {formData.showLoanTermsError && !formData.agreedToLoanTerms && (
          <div className="px-5 pb-4 text-sm text-red-600 font-medium">
            ⚠️ Please agree to the Terms and Conditions to continue
          </div>
        )}
      </div>

      {/* Edit Modal - Full Screen */}
      {editingSection && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-100">
            {/* Modal Header */}
            <div className="bg-green-600 text-white p-6 sticky top-0 z-10">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                  {editingSection === "memberLookup" && "Edit Member Details"}
                  {editingSection === "loanRequestDetails" &&
                    "Edit Loan Details"}
                  {editingSection === "guarantor1" &&
                    "Edit Guarantor 1 (Referrer)"}
                  {editingSection === "guarantor2" &&
                    "Edit Guarantor 2 (Member)"}
                  {editingSection === "documentsUpload" && "Edit Documents"}
                  {editingSection === "loanDeclaration" && "Edit Declaration"}
                </h3>
                <button
                  onClick={() => {
                    // Restore all previous data when close button (✕) is clicked
                    Object.keys(previousFormData).forEach((key) => {
                      onChange({
                        target: {
                          name: key,
                          value: previousFormData[key],
                        },
                      });
                    });
                    closeSectionEditor();
                  }}
                  className="text-white hover:bg-green-700 w-8 h-8 flex items-center justify-center rounded transition cursor-pointer"
                  title="Close and discard changes"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 bg-gray-50">
              {editingSection === "memberLookup" && (
                <MemberLookup
                  formData={formData}
                  onChange={handleModalChange}
                  modalErrors={modalFormErrors}
                />
              )}
              {editingSection === "loanRequestDetails" && (
                <LoanRequestDetails
                  formData={formData}
                  onChange={handleModalChange}
                  modalErrors={modalFormErrors}
                />
              )}
              {editingSection === "guarantor1" && (
                <Guarantor1
                  formData={formData}
                  onChange={handleModalChange}
                  modalErrors={modalFormErrors}
                />
              )}
              {editingSection === "guarantor2" && (
                <Guarantor2
                  formData={formData}
                  onChange={handleModalChange}
                  modalErrors={modalFormErrors}
                />
              )}
              {editingSection === "documentsUpload" && (
                <DocumentsUpload
                  formData={formData}
                  onChange={handleModalChange}
                  modalErrors={modalFormErrors}
                />
              )}
              {editingSection === "loanDeclaration" && (
                <LoanDeclaration
                  formData={formData}
                  onChange={handleModalChange}
                  modalErrors={modalFormErrors}
                />
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex gap-3 p-6 pt-4 border-t border-gray-200 sticky bottom-0 bg-white">
              <button
                onClick={() => {
                  // Restore all previous data when Cancel is clicked
                  // This ensures deleted values are restored
                  Object.keys(previousFormData).forEach((key) => {
                    onChange({
                      target: {
                        name: key,
                        value: previousFormData[key],
                      },
                    });
                  });
                  closeSectionEditor();
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={saveSectionAndClose}
                className={`flex-1 px-4 py-2 rounded-md font-medium transition ${
                  Object.keys(modalFormErrors).length === 0
                    ? "bg-green-600 text-white hover:bg-green-700 cursor-pointer"
                    : "bg-gray-400 text-gray-200 cursor-not-allowed"
                }`}
                disabled={Object.keys(modalFormErrors).length > 0}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoanReview;
