import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdShield,
  MdEmail,
  MdLock,
  MdVisibility,
  MdVisibilityOff,
  MdCheckCircle,
  MdError,
} from "react-icons/md";
import { authApi } from "../../services/authApi";

function AdminRegistration({ onClose }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Form, 2: Success
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validateForm = () => {
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address");
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await authApi.registerAdmin(email, password);
      if (response?.data?.status === "success") {
        setSuccess("Admin created successfully!");
        setStep(2); // Move to success step
        setTimeout(() => {
          // Optional: redirect or clear form
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          if (onClose) onClose();
        }, 3000);
      }
    } catch (err) {
      const errorMsg =
        err?.response?.data?.message ||
        "Failed to create admin. Please try again.";
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-center mb-8">
          <MdShield className="w-8 h-8 text-indigo-600 mr-3" />
          <h1 className="text-2xl font-bold text-gray-800">Admin Setup</h1>
        </div>

        {step === 1 ? (
          <form onSubmit={handleCreateAdmin} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MdEmail className="inline w-4 h-4 mr-2" />
                Admin Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                This email will be used for admin login
              </p>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MdLock className="inline w-4 h-4 mr-2" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter a strong password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <MdVisibilityOff className="w-5 h-5" />
                  ) : (
                    <MdVisibility className="w-5 h-5" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Minimum 6 characters required
              </p>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MdLock className="inline w-4 h-4 mr-2" />
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? (
                    <MdVisibilityOff className="w-5 h-5" />
                  ) : (
                    <MdVisibility className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
                <MdError className="text-red-500 w-5 h-5 flex-shrink-0" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              {isLoading ? "Creating Admin..." : "Create Admin Account"}
            </button>
          </form>
        ) : (
          /* Success Step */
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <MdCheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Success!</h2>
            <p className="text-gray-600">
              Admin account has been created successfully.
            </p>
            <p className="text-sm text-gray-500">
              Email:{" "}
              <span className="font-semibold text-gray-700">{email}</span>
            </p>
            <button
              onClick={() => {
                if (onClose) onClose();
                navigate("/admin-login");
              }}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              Go to Admin Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminRegistration;
