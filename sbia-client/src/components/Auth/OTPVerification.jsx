import React, { useState, useRef } from "react";
import { MdEmail, MdArrowBack } from "react-icons/md";
import { authApi } from "../../services/authApi";

function OTPVerification({ email, onSuccess, onBack }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  const handleInputChange = (index, value) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      setError("Please enter all 6 digits");
      setIsLoading(false);
      return;
    }

    try {
      const response = await authApi.verifyOTP(email, otpCode);
      if (response?.data?.success) {
        onSuccess();
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Failed to verify OTP. Please try again."
      );
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Left Side - Image */}
      <div
        className="hidden lg:flex lg:absolute lg:left-0 lg:top-0 lg:w-1/2 lg:h-full items-center justify-center bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: "url(/small-group-network-bxiOjnbjRM0-unsplash.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full max-w-md lg:max-w-lg lg:absolute lg:right-0 p-6 sm:p-8 lg:p-10">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold mb-8 transition-colors"
        >
          <MdArrowBack className="w-5 h-5" />
          Back
        </button>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Verify OTP
        </h1>
        <p className="text-slate-600 mb-8">
          Enter the 6-digit code sent to <strong>{email}</strong>
        </p>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-3 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleVerifyOTP} className="space-y-8">
          {/* OTP Input Fields */}
          <div className="flex justify-center gap-3 sm:gap-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 sm:w-14 sm:h-14 text-2xl font-bold text-center border-2 border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
                disabled={isLoading}
                autoFocus={index === 0}
              />
            ))}
          </div>

          {/* Verify Button */}
          <button
            type="submit"
            disabled={otp.some((d) => !d) || isLoading}
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg text-center text-base cursor-pointer"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Verifying...
              </span>
            ) : (
              "Verify OTP"
            )}
          </button>

          {/* Resend OTP */}
          <div className="text-center">
            <p className="text-slate-600 text-sm">
              Didn't receive code?{" "}
              <button
                type="button"
                onClick={onBack}
                className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
              >
                Request new OTP
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OTPVerification;
