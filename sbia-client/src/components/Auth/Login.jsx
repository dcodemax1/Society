import React, { useState } from "react";
import {
  MdEmail,
  MdLock,
  MdVisibility,
  MdVisibilityOff,
  MdArrowBack,
} from "react-icons/md";
import { authApi } from "../../services/authApi";
import { tokenService } from "../../services/tokenService";

function Login({ onSuccess, onBackToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email || !password) {
      setError("Email and password are required");
      setIsLoading(false);
      return;
    }

    try {
      const response = await authApi.login(email, password);
      if (
        response?.data?.status === "success" &&
        response?.data?.data?.accessToken
      ) {
        // Save access token
        tokenService.setToken(response.data.data.accessToken);
        // Store user role for route protection
        const userRole =
          response?.data?.data?.user?.role || response?.data?.data?.role;
        if (userRole) {
          tokenService.setUserRole(userRole);
        }

        // Call onSuccess callback to let parent component handle navigation
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Invalid email or password. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = email.trim().length > 0 && password.trim().length > 0;

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
          onClick={onBackToSignup}
          className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold mb-8 transition-colors"
        >
          <MdArrowBack className="w-5 h-5" />
          Back to Signup
        </button>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Login
        </h1>
        <p className="text-slate-600 mb-8">
          Welcome back! Sign in to your account
        </p>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-3 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full pl-12 pr-4 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all text-gray-900 placeholder-gray-400"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <MdLock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-12 pr-14 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all text-gray-900 placeholder-gray-400"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showPassword ? (
                  <MdVisibilityOff className="w-5 h-5" />
                ) : (
                  <MdVisibility className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg text-center text-base cursor-pointer"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-slate-600 text-sm mt-6">
          Don't have an account?{" "}
          <button
            onClick={onBackToSignup}
            className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
          >
            Sign up here
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
