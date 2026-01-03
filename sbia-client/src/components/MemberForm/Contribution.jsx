import React from "react";

// Contribution step (Step 6)
// Monthly Contribution Amount: ₹500, ₹1000, ₹1500, ₹2000 (as buttons)
// Payment Mode: Net Banking, UPI, BHIM, Bank Transfer (as buttons)
function Contribution({ formData, onChange, formErrors = {} }) {
  const amounts = [500, 1000, 1500, 2000];
  const paymentModes = [
    "PhonePe",
    "Google Pay (GPay)",
    "Paytm",
    "BHIM UPI",
    "Net Banking",
  ];
  const upiOptions = ["PayTM", "PhonePay", "Google Pay"];

  const handleAmountSelect = (amount) => {
    onChange({ target: { name: "monthlyContribution", value: amount } });
  };

  const handleModeSelect = (mode) => {
    onChange({ target: { name: "paymentMode", value: mode } });
    // Reset UPI option when changing payment mode
    if (mode !== "UPI") {
      onChange({ target: { name: "upiProvider", value: "" } });
    }
  };

  const handleUpiSelect = (provider) => {
    onChange({ target: { name: "upiProvider", value: provider } });
  };

  return (
    <div className="space-y-8">
      {/* Contribution Heading */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Contribution Details
        </h2>
      </div>

      {/* Monthly Contribution Amount */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-4">
          Monthly Contribution Amount{" "}
          <span className="text-red-500 font-bold">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          {amounts.map((amount) => (
            <div
              key={amount}
              onClick={() => handleAmountSelect(amount)}
              className={`py-3 px-2 sm:px-4 rounded border text-center font-medium transition-all cursor-pointer text-sm sm:text-base ${
                formData.monthlyContribution === amount
                  ? "border-green-500 bg-green-50 text-green-700"
                  : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
              }`}
            >
              ₹{amount}
            </div>
          ))}
        </div>
        {formErrors.monthlyContribution && (
          <p className="text-xs text-red-600 mt-2 font-medium">
            ⚠️ {formErrors.monthlyContribution}
          </p>
        )}
      </div>

      {/* Payment Mode */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-4">
          Payment Mode
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {paymentModes.map((mode) => (
            <div
              key={mode}
              onClick={() => handleModeSelect(mode)}
              className={`py-3 px-4 rounded border text-center font-medium transition-all cursor-pointer ${
                formData.paymentMode === mode
                  ? "border-green-500 bg-green-50 text-green-700"
                  : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
              }`}
            >
              {mode}
            </div>
          ))}
        </div>
        {formErrors.paymentMode && (
          <p className="text-xs text-red-600 mt-2 font-medium">
            ⚠️ {formErrors.paymentMode}
          </p>
        )}
      </div>
    </div>
  );
}

export default Contribution;
