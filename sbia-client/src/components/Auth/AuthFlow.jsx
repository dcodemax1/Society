import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLogin from "./AdminLogin";
import OTPVerification from "./OTPVerification";
import SetPassword from "./SetPassword";
import Login from "./Login";
import { authApi } from "../../services/authApi";
import { tokenService } from "../../services/tokenService";

/**
 * Multi-step authentication flow:
 * Step 1: Email + Send OTP -> calls POST /auth/request-otp
 * Step 2: OTP Verification (6 digits) -> calls POST /auth/verify-otp
 * Step 3: Set Password -> calls POST /auth/set-password
 * Step 4: Login -> calls POST /auth/login
 * Step 5: Redirect to Dashboard based on role
 */

function AuthFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: SetPassword, 4: Login
  const [email, setEmail] = useState("");

  // Step 1: Send OTP
  const handleSendOTP = async (emailValue) => {
    try {
      const response = await authApi.requestOTP(emailValue);
      if (response?.data?.success) {
        setEmail(emailValue);
        setStep(2); // Move to OTP verification
      }
    } catch (err) {
      console.error("Failed to send OTP:", err);
      throw err;
    }
  };

  // Step 2: Verify OTP and move to Set Password
  const handleOTPVerifySuccess = () => {
    setStep(3); // Move to SetPassword
  };

  // Step 3: Set Password and move to Login
  const handleSetPasswordSuccess = () => {
    setStep(4); // Move to Login
  };

  // Step 4: Login and redirect to Dashboard based on role
  const handleLoginSuccess = () => {
    const userRole = tokenService.getUserRole();
    if (userRole === "admin") {
      navigate("/admin");
    } else {
      navigate("/member-dashboard");
    }
  };

  // Handle back button to return to signup (email step)
  const handleBackToSignup = () => {
    setStep(1);
    setEmail("");
  };

  return (
    <>
      {step === 1 && <AdminLogin onSendOTP={handleSendOTP} />}

      {step === 2 && (
        <OTPVerification
          email={email}
          onSuccess={handleOTPVerifySuccess}
          onBack={handleBackToSignup}
        />
      )}

      {step === 3 && (
        <SetPassword
          email={email}
          onSuccess={handleSetPasswordSuccess}
          onBack={() => setStep(2)}
        />
      )}

      {step === 4 && (
        <Login
          onSuccess={handleLoginSuccess}
          onBackToSignup={handleBackToSignup}
        />
      )}
    </>
  );
}

export default AuthFlow;
