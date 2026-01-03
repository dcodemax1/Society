import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdShield,
  MdEmail,
  MdArrowBack,
  MdLock,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import { authApi } from "../../services/authApi";
import { tokenService } from "../../services/tokenService";

function AdminLogin({ onClose }) {
  const navigate = useNavigate();
  // Step management
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Password, 4: Login
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // OTP inputs
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  // Password inputs
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Login inputs
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Step 1: Send OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    try {
      const response = await authApi.requestOTP(email);
      if (response?.data?.status === "success") {
        setSuccess("OTP sent to your email!");
        setStep(2); // Move to OTP verification
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to send OTP. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Handle OTP input
  const handleOTPChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOTPKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError("");
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }
    setIsLoading(true);
    try {
      const response = await authApi.verifyOTP(email, otpCode);
      if (response?.data?.status === "success") {
        setStep(3); // Move to Set Password
        setError(""); // Clear any errors
      }
    } catch (err) {
      setError(
        err?.response?.data?.message || "Invalid OTP. Please try again."
      );
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  // Step 3: Set Password
  const handleSetPassword = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setIsLoading(true);
    try {
      const response = await authApi.setPassword(email, password);
      if (response?.data?.status === "success") {
        setSuccess("Password created successfully!");
        setStep(4); // Move to Login
        setLoginEmail(email);
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Failed to set password. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Step 4: Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const response = await authApi.login(loginEmail, loginPassword);
      if (
        response?.data?.status === "success" &&
        response?.data?.data?.accessToken
      ) {
        tokenService.setToken(response.data.data.accessToken);
        window.location.href = "/member-dashboard";
      }
    } catch (err) {
      setError(
        err?.response?.data?.message || "Invalid credentials. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setStep(1);
    setOtp(["", "", "", "", "", ""]);
    setPassword("");
    setConfirmPassword("");
    setError("");
    setSuccess("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        className="bg-white rounded-2xl shadow-xl overflow-hidden"
        style={{ width: "672px", height: "450px" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 h-full">
          {/* Left Side - Image (Hidden on Mobile) - 50% */}
          <div
            className="hidden lg:block relative overflow-hidden bg-cover bg-center lg:col-span-1"
            style={{
              backgroundImage:
                "url(/small-group-network-bxiOjnbjRM0-unsplash.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/10"></div>

            {/* Back to Website Button - Top Right */}
            <button
              onClick={() => {
                if (onClose) {
                  onClose();
                } else {
                  navigate("/");
                }
              }}
              type="button"
              className="absolute top-4 right-4 bg-gray-600/50 hover:bg-gray-600/70 text-white font-semibold py-2 px-4 rounded-full transition-all duration-200 backdrop-blur-sm z-50 cursor-pointer"
            >
              Back to website →
            </button>

            {/* Welcome Text Overlay */}
            <div className="absolute inset-0 p-8 bg-gradient-to-b from-transparent via-black/20 to-transparent flex flex-col items-center justify-center">
              <h2 className="text-xl font-bold text-white mb-3 text-center">
                Welcome to Shreejan Cooperative Society
              </h2>
            </div>
          </div>

          {/* Right Side - Form Container - 50% */}
          <div className="flex items-center justify-center bg-gradient-to-br from-emerald-100 via-yellow-100 to-emerald-200 p-3 md:p-4 relative z-10 lg:col-span-1">
            <div className="w-full max-w-xs">
              {/* Error & Success Messages */}
              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}
              {success && (
                <div className="mb-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700 text-sm">
                  {success}
                </div>
              )}

              {/* STEP 1: Email & Send OTP */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">
                      Create an Account
                    </h1>
                  </div>
                  <form onSubmit={handleSendOTP} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your.email@example.com"
                          className="w-full pl-10 pr-4 py-2.5 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
                          required
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={!email.includes("@") || isLoading}
                      className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 disabled:from-gray-300 disabled:to-gray-300 text-white font-semibold py-2.5 px-4 rounded-lg transition-all transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Sending OTP...
                        </>
                      ) : (
                        <>
                          <MdEmail className="w-5 h-5" />
                          Send OTP
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}

              {/* STEP 2: OTP Verification */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">
                      Verify OTP
                    </h1>
                    <p className="text-sm text-slate-600">
                      Enter the 6-digit code sent to {email}
                    </p>
                  </div>
                  <form onSubmit={handleVerifyOTP} className="space-y-6">
                    <div className="flex justify-center gap-2">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          ref={(el) => (inputRefs.current[index] = el)}
                          type="text"
                          maxLength="1"
                          value={digit}
                          onChange={(e) =>
                            handleOTPChange(index, e.target.value)
                          }
                          onKeyDown={(e) => handleOTPKeyDown(index, e)}
                          className="w-10 h-10 text-lg font-bold text-center border-2 border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
                          disabled={isLoading}
                          autoFocus={index === 0}
                        />
                      ))}
                    </div>
                    <button
                      type="submit"
                      disabled={otp.some((d) => !d) || isLoading}
                      className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 disabled:from-gray-300 disabled:to-gray-300 text-white font-semibold py-2.5 px-4 rounded-lg transition-all transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Verifying...
                        </>
                      ) : (
                        "Verify OTP"
                      )}
                    </button>
                  </form>
                </div>
              )}

              {/* STEP 3: Set Password */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">
                      Create Password
                    </h1>
                    <p className="text-sm text-slate-600">
                      Set a secure password for your account
                    </p>
                  </div>
                  <form onSubmit={handleSetPassword} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter password"
                          className="w-full pl-10 pr-10 py-2.5 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showPassword ? (
                            <MdVisibilityOff className="w-5 h-5" />
                          ) : (
                            <MdVisibility className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm password"
                          className="w-full pl-10 pr-10 py-2.5 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showConfirmPassword ? (
                            <MdVisibilityOff className="w-5 h-5" />
                          ) : (
                            <MdVisibility className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={!password || !confirmPassword || isLoading}
                      className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 disabled:from-gray-300 disabled:to-gray-300 text-white font-semibold py-2.5 px-4 rounded-lg transition-all transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Creating Account...
                        </>
                      ) : (
                        "Create Account"
                      )}
                    </button>
                  </form>
                </div>
              )}

              {/* STEP 4: Login */}
              {step === 4 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">
                      Login
                    </h1>
                    <p className="text-sm text-slate-600">
                      Sign in to your account
                    </p>
                  </div>
                  <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="email"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          placeholder="your.email@example.com"
                          className="w-full pl-10 pr-4 py-2.5 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type={showLoginPassword ? "text" : "password"}
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          placeholder="Enter your password"
                          className="w-full pl-10 pr-10 py-2.5 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowLoginPassword(!showLoginPassword)
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showLoginPassword ? (
                            <MdVisibilityOff className="w-5 h-5" />
                          ) : (
                            <MdVisibility className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={!loginEmail || !loginPassword || isLoading}
                      className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 disabled:from-gray-300 disabled:to-gray-300 text-white font-semibold py-2.5 px-4 rounded-lg transition-all transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Logging in...
                        </>
                      ) : (
                        "Login"
                      )}
                    </button>
                  </form>
                </div>
              )}

              {/* Progress Indicator - Bottom Center */}
              <div className="mt-6 flex justify-center">
                <div className="flex gap-1 w-32">
                  {[1, 2, 3, 4].map((stepNum) => (
                    <div
                      key={stepNum}
                      className={`flex-1 h-1.5 rounded-full transition-all ${
                        stepNum <= step ? "bg-emerald-500" : "bg-gray-300"
                      }`}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              {step === 1 && (
                <>
                  <div className="mt-8 space-y-2 text-center text-sm">
                    <div className="text-slate-600">
                      Already registered?{" "}
                      <button
                        onClick={() => setStep(4)}
                        className="text-emerald-600 hover:text-emerald-700 font-medium cursor-pointer transition-colors"
                      >
                        Login
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
