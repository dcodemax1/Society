/**
 * Loan Request Details Component (Loan Form Step 2)
 * Fields: Request Date, Purpose of Loan, When Loan Required, Loan Amount (₹), EMI Tenure, Payment Transfer Mode
 * Conditional: UPI ID (for UPI modes) or Bank Details (for Net Banking)
 * Auto-calculates Membership Duration based on Date of Joining
 */

import React, { useState } from "react";
import CustomDropdown from "./components/CustomDropdown";

function LoanRequestDetails({ formData, onChange, modalErrors = {} }) {
  const [upiError, setUpiError] = useState("");

  // Loan purposes dropdown options
  const loanPurposes = [
    "Medical",
    "Education",
    "Marriage",
    "Business",
    "Home Repair",
    "Emergency",
    "Other",
  ];

  // When Loan Required options
  const loanRequiredOptions = [
    "Select",
    "Immediately",
    "Within 1 month",
    "Within 2 months",
    "Within 3 months",
  ];

  // Transfer mode options
  const transferModes = [
    "PhonePe",
    "Google Pay (GPay)",
    "Paytm",
    "BHIM UPI",
    "Net Banking",
  ];

  // Tenure options (in months)
  const tenureOptions = [3, 6, 9, 12];

  // Account type options for Net Banking
  const accountTypes = ["Select", "Savings", "Current"];

  /**
   * Validate UPI format (username@upi or vpa format)
   */
  const validateUPI = (upi) => {
    const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/;
    return upiRegex.test(upi);
  };

  /**
   * Handle UPI input with real-time validation
   */
  const handleUPIChange = (e) => {
    const upi = e.target.value;
    onChange(e);
    if (upi && !validateUPI(upi)) {
      setUpiError("Invalid UPI format. Use format: username@upi");
    } else {
      setUpiError("");
    }
  };

  /**
   * Handle loan amount change
   */
  const handleLoanAmountChange = (e) => {
    onChange(e);
  };

  /**
   * Get today's date in YYYY-MM-DD format
   */
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  /**
   * Calculate membership duration in months based on date of joining
   */
  const calculateMembershipDuration = () => {
    if (!formData.dateOfJoining) {
      return "";
    }
    const joiningDate = new Date(formData.dateOfJoining);
    const today = new Date();

    let months = (today.getFullYear() - joiningDate.getFullYear()) * 12;
    months += today.getMonth() - joiningDate.getMonth();

    return Math.max(0, months).toString();
  };

  /**
   * Handle transfer mode change to clear previous data
   */
  const handleTransferModeChange = (e) => {
    const mode = e.target.value;
    onChange(e);

    const isUPI = [
      "PhonePe",
      "Google Pay (GPay)",
      "Paytm",
      "BHIM UPI",
    ].includes(mode);
    const isNetBanking = mode === "Net Banking";
    const previousMode = formData.paymentTransferMode;

    const wasPreviouslyUPI =
      previousMode &&
      ["PhonePe", "Google Pay (GPay)", "Paytm", "BHIM UPI"].includes(
        previousMode
      );
    const wasPreviouslyNetBanking = previousMode === "Net Banking";

    // If switching between different UPI modes - clear UPI data
    if (wasPreviouslyUPI && isUPI && previousMode !== mode) {
      onChange({
        target: {
          name: "upiId",
          value: "",
        },
      });
      setUpiError("");
    }

    // If switching from UPI to Net Banking - clear UPI data
    if (wasPreviouslyUPI && isNetBanking) {
      onChange({
        target: {
          name: "upiId",
          value: "",
        },
      });
      setUpiError("");
    }

    // If switching from Net Banking to UPI - clear bank data
    if (wasPreviouslyNetBanking && isUPI) {
      onChange({
        target: {
          name: "bankName",
          value: "",
        },
      });
      onChange({
        target: {
          name: "accountNumber",
          value: "",
        },
      });
      onChange({
        target: {
          name: "ifscCode",
          value: "",
        },
      });
      onChange({
        target: {
          name: "accountType",
          value: "",
        },
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Loan Request Details Section */}
      <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-6">
          Loan Request Details
        </h2>

        {/* Grid Layout: 2 columns for all rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Row 1, Col 1: Request Date - displays current date (read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Request Date
              <span className="text-red-500">*</span>
            </label>
            <div className="w-full border border-gray-300 rounded-md p-3 bg-gray-50 text-gray-700 text-sm md:text-base flex items-center cursor-not-allowed">
              {new Date()
                .toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })
                .replace(/\//g, "-")}
            </div>
            <input type="hidden" name="requestDate" value={getTodayDate()} />
          </div>

          {/* Row 1, Col 2: Loan Amount (₹) - Min: 25,000, Max: 80,000 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Amount (₹)
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="loanAmount"
              value={formData.loanAmount || ""}
              onChange={handleLoanAmountChange}
              placeholder="e.g., 50000"
              className="w-full border border-gray-300 rounded-md p-3 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm md:text-base"
            />
            <p className="text-xs text-gray-500 mt-1">
              Min: ₹10,000 | Max: ₹200,000
            </p>
            {(modalErrors.loanAmount || !formData.loanAmount) && (
              <p className="text-xs text-red-500 mt-1">
                {modalErrors.loanAmount || "Loan amount required"}
              </p>
            )}
            {!modalErrors.loanAmount &&
              formData.loanAmount &&
              parseFloat(formData.loanAmount) < 10000 && (
                <p className="text-xs text-red-500 mt-1">
                  Minimum loan amount is ₹10,000
                </p>
              )}
            {!modalErrors.loanAmount &&
              formData.loanAmount &&
              parseFloat(formData.loanAmount) > 200000 && (
                <p className="text-xs text-red-500 mt-1">
                  Maximum loan amount is ₹200,000
                </p>
              )}
          </div>

          {/* Row 2, Col 1: Purpose of Loan */}
          <div>
            <CustomDropdown
              name="purposeOfLoan"
              value={formData.purposeOfLoan || ""}
              onChange={onChange}
              options={loanPurposes
                .filter((p) => p !== "Select")
                .map((purpose) => ({
                  value: purpose,
                  label: purpose,
                }))}
              placeholder="Select Purpose"
              label="Purpose of Loan"
              required
              error={
                modalErrors.purposeOfLoan ||
                (!formData.purposeOfLoan ? "Purpose of loan required" : "")
              }
            />

            {/* Show input if Other selected */}
            {formData.purposeOfLoan === "Other" && (
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specify Loan Purpose
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="purposeOfLoanOther"
                  value={formData.purposeOfLoanOther || ""}
                  onChange={onChange}
                  placeholder="Please specify your loan purpose"
                  maxLength="100"
                  className="w-full border border-gray-300 rounded-md p-3 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm md:text-base"
                />
                {(modalErrors.purposeOfLoanOther ||
                  !formData.purposeOfLoanOther) && (
                  <p className="text-xs text-red-500 mt-1">
                    {modalErrors.purposeOfLoanOther ||
                      "Please specify the loan purpose"}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Maximum 100 characters
                </p>
              </div>
            )}
          </div>

          {/* Row 2, Col 2: EMI Tenure (months) */}
          <CustomDropdown
            name="emiTenure"
            value={formData.emiTenure || ""}
            onChange={onChange}
            options={tenureOptions.map((months) => ({
              value: months.toString(),
              label: `${months} months`,
            }))}
            placeholder="Select Tenure"
            label="EMI Tenure (months)"
            required
            error={
              modalErrors.emiTenure ||
              (!formData.emiTenure ? "Please select tenure" : "")
            }
          />

          {/* Row 3, Col 1: When is Loan Required? */}
          <CustomDropdown
            name="whenLoanRequired"
            value={formData.whenLoanRequired || ""}
            onChange={onChange}
            options={loanRequiredOptions
              .filter((opt) => opt !== "Select")
              .map((option) => ({
                value: option,
                label: option,
              }))}
            placeholder="Select"
            label="Loan Required?"
            required
            error={
              modalErrors.whenLoanRequired ||
              (!formData.whenLoanRequired
                ? "Please select when loan is required"
                : "")
            }
          />

          {/* Row 3, Col 2: Payment Transfer Mode */}
          <CustomDropdown
            name="paymentTransferMode"
            value={formData.paymentTransferMode || ""}
            onChange={handleTransferModeChange}
            options={transferModes.map((mode) => ({
              value: mode,
              label: mode,
            }))}
            placeholder="Select Transfer Mode"
            label="Payment Transfer Mode"
            required
            error={
              modalErrors.paymentTransferMode ||
              (!formData.paymentTransferMode
                ? "Please select a transfer mode"
                : "")
            }
          />
        </div>

        {/* Conditional UPI Details Section */}
        {formData.paymentTransferMode &&
          ["PhonePe", "Google Pay (GPay)", "Paytm", "BHIM UPI"].includes(
            formData.paymentTransferMode
          ) && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
              <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-4">
                UPI Details
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  UPI ID
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="upiId"
                  value={formData.upiId || ""}
                  onChange={handleUPIChange}
                  placeholder="e.g., yourname@upi"
                  className={`w-full border rounded-md p-3 bg-white text-gray-700 focus:outline-none text-sm md:text-base ${
                    formData.upiId
                      ? upiError
                        ? "border-red-500 focus:ring-0"
                        : "border-emerald-400 focus:ring-2 focus:ring-emerald-300"
                      : "border-gray-300 focus:ring-2 focus:ring-green-500"
                  }`}
                />
                {(modalErrors.upiId || upiError) && (
                  <p className="text-xs text-red-500 mt-1">
                    {modalErrors.upiId || upiError}
                  </p>
                )}
                {!modalErrors.upiId && !upiError && !formData.upiId && (
                  <p className="text-xs text-red-500 mt-1">UPI ID required</p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Format: username@upi (e.g., john.doe@upi)
                </p>
              </div>
            </div>
          )}

        {/* Conditional Bank Details Section */}
        {formData.paymentTransferMode === "Net Banking" && (
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
            <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-4">
              Bank Transfer Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bank Name
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="bankName"
                  value={formData.bankName || ""}
                  onChange={onChange}
                  placeholder="e.g., State Bank of India"
                  className="w-full border border-gray-300 rounded-md p-3 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm md:text-base"
                />
                {(modalErrors.bankName || !formData.bankName) && (
                  <p className="text-xs text-red-500 mt-1">
                    {modalErrors.bankName || "Bank name required"}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Number
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="accountNumber"
                  value={formData.accountNumber || ""}
                  onChange={(e) => {
                    const value = e.target.value
                      .replace(/[^0-9]/g, "")
                      .slice(0, 25);
                    onChange({
                      target: { name: "accountNumber", value },
                    });
                  }}
                  placeholder="Enter account number"
                  maxLength="25"
                  className="w-full border border-gray-300 rounded-md p-3 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm md:text-base"
                />
                {(modalErrors.accountNumber || !formData.accountNumber) && (
                  <p className="text-xs text-red-500 mt-1">
                    {modalErrors.accountNumber || "Account number required"}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  IFSC Code
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="ifscCode"
                  value={formData.ifscCode || ""}
                  onChange={onChange}
                  placeholder="e.g., SBIN0001234"
                  maxLength="11"
                  className="w-full border border-gray-300 rounded-md p-3 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm md:text-base"
                />
                {(modalErrors.ifscCode || !formData.ifscCode) && (
                  <p className="text-xs text-red-500 mt-1">
                    {modalErrors.ifscCode || "IFSC code required"}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Type
                  <span className="text-red-500">*</span>
                </label>
                <select
                  name="accountType"
                  value={formData.accountType || "Select"}
                  onChange={onChange}
                  className="w-full border border-gray-300 rounded-md p-3 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm md:text-base"
                >
                  {accountTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {(modalErrors.accountType ||
                  !formData.accountType ||
                  formData.accountType === "Select") && (
                  <p className="text-xs text-red-500 mt-1">
                    {modalErrors.accountType || "Account type required"}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoanRequestDetails;
