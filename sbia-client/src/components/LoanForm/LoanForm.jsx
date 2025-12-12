import React, { useState, useRef } from "react";
import ProgressBar from "../MemberForm/ProgressBar";
import FormMessage from "../MemberForm/FormMessage";
import LoanFormHeader from "./components/LoanFormHeader";
import LoanStepRenderer from "./components/LoanStepRenderer";
import LoanFormNavigation from "./components/LoanFormNavigation";
import LoanThankYou from "./LoanThankYou";
import { LOAN_STEPS, LOAN_TOTAL_STEPS } from "./config/loanFormConfig";
import {
  handleLoanNext,
  handleLoanPrevious,
  handleLoanSubmit,
} from "./utils/loanFormHandlers";

function LoanForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Create refs for step components that need validation
  const memberLookupRef = useRef(null);
  const documentsUploadRef = useRef(null);

  // ============================================
  // Event Handlers
  // ============================================

  /**
   * Handle input changes - updates form data
   */
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "radio" ? (checked ? value : prev[name]) : value,
    }));
  };

  /**
   * Show message with auto-clear for info messages
   */
  const showMessage = (text, type = "info") => {
    setMessage(text);
    setMessageType(type);
    if (type === "info") {
      setTimeout(() => setMessage(""), 4000);
    }
  };

  /**
   * Calculate form completion percentage
   */
  const calculatePercentage = () => {
    return Math.round((currentStep / LOAN_TOTAL_STEPS) * 100);
  };

  /**
   * Handle edit button click - jump to specific step
   */
  const handleEdit = (stepNumber) => {
    setCurrentStep(stepNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /**
   * Handle new application - reset form
   */
  const handleNewApplication = () => {
    setFormData({});
    setCurrentStep(1);
    setIsSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ============================================
  // Derived State
  // ============================================

  const currentStepName =
    LOAN_STEPS.find((s) => s.id === currentStep)?.name || "";
  const percentage = calculatePercentage();

  // ============================================
  // Render
  // ============================================

  return (
    <>
      {/* OUTER CONTAINER - Green Background */}
      <div className="min-h-screen bg-green-50 py-8 px-4">
        <div className="w-full max-w-4xl mx-auto">
          {/* Header Section - Outside White Container */}
          {!isSubmitted && (
            <div className="mb-6 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-green-700">
                  Loan Application (Members Only)
                </h2>
              </div>
              <div className="text-right">
                <p className="text-sm text-green-600 font-semibold">
                  Step {currentStep} of {LOAN_TOTAL_STEPS} • {percentage}%
                </p>
              </div>
            </div>
          )}

          {/* Progress Bar - Outside White Container */}
          {!isSubmitted && (
            <ProgressBar
              current={currentStep}
              total={LOAN_TOTAL_STEPS}
              color="green"
            />
          )}

          {/* Message Display */}
          <FormMessage message={message} type={messageType} />

          {/* INNER CONTAINER - White Background */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Show Thank You Page or Form */}
            {isSubmitted ? (
              <LoanThankYou
                formData={formData}
                onNewApplication={handleNewApplication}
              />
            ) : (
              /* Form Content */
              <form noValidate>
                {/* Dynamic Step Component */}
                <LoanStepRenderer
                  currentStep={currentStep}
                  formData={formData}
                  onChange={handleInputChange}
                  onEdit={handleEdit}
                  stepRefs={{
                    memberLookup: memberLookupRef,
                    documentsUpload: documentsUploadRef,
                  }}
                />

                {/* Navigation Buttons */}
                <LoanFormNavigation
                  currentStep={currentStep}
                  totalSteps={LOAN_TOTAL_STEPS}
                  steps={LOAN_STEPS}
                  onPrevious={() =>
                    handleLoanPrevious(currentStep, setCurrentStep, showMessage)
                  }
                  onNext={() =>
                    handleLoanNext(
                      currentStep,
                      formData,
                      setCurrentStep,
                      showMessage,
                      LOAN_TOTAL_STEPS,
                      { memberLookup: memberLookupRef }
                    )
                  }
                  onSubmit={(e) =>
                    handleLoanSubmit(
                      e,
                      formData,
                      currentStep,
                      showMessage,
                      setFormData,
                      setCurrentStep,
                      LOAN_TOTAL_STEPS,
                      setIsSubmitted
                    )
                  }
                />
              </form>
            )}
          </div>

          {/* Footer Text - Outside Container */}
          <p className="text-xs text-center text-green-600 mt-4">
            * Interest 18% p.a. Processing 2% deducted upfront. Subject to
            committee approval and society rules.
          </p>
        </div>
      </div>
    </>
  );
}

export default LoanForm;
