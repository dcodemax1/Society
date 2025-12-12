import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import FormMessage from "./FormMessage";
import FormHeader from "./components/FormHeader";
import StepIndicators from "./components/StepIndicators";
import StepRenderer from "./components/StepRenderer";
import FormNavigation from "./components/FormNavigation";
import SubmissionSuccess from "./SubmissionSuccess";
import { FORM_STEPS, TOTAL_STEPS, REQUIRED_FIELDS } from "./config/formConfig";
import { handleNext, handlePrevious, handleSubmit } from "./utils/formHandlers";
import { isStepValid } from "./utils/formValidation";

function MemberForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ============================================
  // Event Handlers
  // ============================================

  /**
   * Handle input changes - updates form data
   */
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Log only file uploads for debugging
    if (type === "file" || value instanceof File) {
      console.log("📁 File uploaded:", { name, isFile: value instanceof File });
    }
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
   * Calculate form completion percentage based on filled required fields in current step
   */
  const calculatePercentage = () => {
    const requiredFields = REQUIRED_FIELDS[currentStep] || [];
    if (requiredFields.length === 0) return 0;

    const filledCount = requiredFields.filter((field) => {
      const value = formData[field];
      if (!value) return false;
      if (typeof value === "string") return value.trim().length > 0;
      if (typeof value === "number") return value > 0;
      if (value instanceof File) return value.size > 0;
      return !!value;
    }).length;

    return Math.round((filledCount / requiredFields.length) * 100);
  };

  // ============================================
  // Derived State
  // ============================================

  const currentStepName =
    FORM_STEPS.find((s) => s.id === currentStep)?.name || "";
  const percentage = calculatePercentage();
  const isValid = isStepValid(currentStep, formData);

  // ============================================
  // Render
  // ============================================

  // Show success page after submission
  if (isSubmitted) {
    return <SubmissionSuccess formData={formData} />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Main Container - Responsive Layout */}
      <div className="flex flex-col lg:flex-row items-start gap-0">
        {/* Left Sidebar - Empowering People Content (Sticky) - Hidden on mobile */}
        <div className="hidden lg:block w-full lg:w-1/3 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto px-4 lg:px-8 py-6 lg:py-12">
          <div className="max-w-sm">
            <h2 className="text-xl lg:text-2xl font-bold text-black mb-1">
              Empowering People.
            </h2>
            <h2 className="text-xl lg:text-2xl font-bold text-black mb-4 lg:mb-6">
              Building Prosperity.
            </h2>

            <p className="text-gray-600 text-xs lg:text-sm leading-relaxed mb-3 lg:mb-6">
              Join Shreejan Credit Co-operative Society Ltd.
            </p>

            <p className="text-gray-600 text-xs leading-relaxed mb-6 lg:mb-8">
              Trusted Multi-State Co-operative Society serving members across
              India. Join over 5,000+ active members and be part of our growing
              community with ₹10 Cr+ deposits managed.
            </p>

            {/* Stats - Horizontal Layout (2 columns) */}
            <div className="grid grid-cols-2 gap-4 lg:gap-3 mb-6 lg:mb-8">
              <div>
                <p className="text-xl lg:text-2xl font-bold text-green-700">
                  5,000+
                </p>
                <p className="text-gray-600 text-xs">Active Members</p>
              </div>
              <div>
                <p className="text-xl lg:text-2xl font-bold text-green-700">
                  ₹10 Cr+
                </p>
                <p className="text-gray-600 text-xs">Deposits Managed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="w-full lg:w-2/3 min-h-screen py-4 sm:py-6 lg:py-2 px-3 sm:px-4 lg:px-1">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-50 rounded-lg shadow-lg p-4 sm:p-6 md:p-6 lg:p-4">
              {/* Header: Step indicator, title, percentage */}
              <FormHeader
                currentStep={currentStep}
                totalSteps={TOTAL_STEPS}
                stepName={currentStepName}
                percentage={percentage}
              />

              {/* Progress Bar */}
              <ProgressBar current={currentStep} total={TOTAL_STEPS} percentage={percentage} />

              {/* Step Indicators: Circles for all steps */}
              <StepIndicators steps={FORM_STEPS} currentStep={currentStep} />

              {/* Message Display */}
              <FormMessage message={message} type={messageType} />

              {/* Form Content */}
              <form noValidate onSubmit={(e) => e.preventDefault()}>
                {/* Dynamic Step Component */}
                <StepRenderer
                  currentStep={currentStep}
                  formData={formData}
                  onChange={handleInputChange}
                  onEdit={(stepId) => setCurrentStep(stepId)}
                />

                {/* Navigation Buttons */}
                <FormNavigation
                  currentStep={currentStep}
                  totalSteps={TOTAL_STEPS}
                  steps={FORM_STEPS}
                  isValid={isValid}
                  onPrevious={() =>
                    handlePrevious(currentStep, setCurrentStep, showMessage)
                  }
                  onNext={() =>
                    handleNext(
                      currentStep,
                      formData,
                      setCurrentStep,
                      showMessage,
                      TOTAL_STEPS
                    )
                  }
                  onSubmit={(e) =>
                    handleSubmit(
                      e,
                      formData,
                      currentStep,
                      showMessage,
                      setFormData,
                      setCurrentStep,
                      TOTAL_STEPS,
                      setIsSubmitted
                    )
                  }
                />
              </form>

              <p className="text-xs text-center text-gray-500 mt-3 sm:mt-4 leading-relaxed px-2">
                By submitting, you agree to the rules and regulations of
                Shreejan Credit Co-operative Society Ltd.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberForm;
