/**
 * Loan Step Renderer Component
 * Renders the appropriate loan form step component based on currentStep
 */

import React from "react";
import MemberLookup from "../MemberLookup";
import LoanRequestDetails from "../LoanRequestDetails";
import Guarantor1 from "../Guarantor1";
import Guarantor2 from "../Guarantor2";
import DocumentsUpload from "../DocumentsUpload";
import LoanDeclaration from "../LoanDeclaration";
import LoanReview from "../LoanReview";

export const LoanStepRenderer = ({
  currentStep,
  formData,
  onChange,
  onEdit,
  stepRefs,
}) => {
  const props = {
    formData,
    onChange,
  };

  switch (currentStep) {
    case 1:
      return <MemberLookup {...props} ref={stepRefs?.memberLookup} />;
    case 2:
      return <LoanRequestDetails {...props} />;
    case 3:
      return <Guarantor1 {...props} />;
    case 4:
      return <Guarantor2 {...props} />;
    case 5:
      return <DocumentsUpload {...props} ref={stepRefs?.documentsUpload} />;
    case 6:
      return <LoanDeclaration {...props} />;
    case 7:
      return <LoanReview {...props} onEdit={onEdit} />;
    default:
      return <div className="text-center text-gray-500">Unknown Step</div>;
  }
};

export default LoanStepRenderer;
