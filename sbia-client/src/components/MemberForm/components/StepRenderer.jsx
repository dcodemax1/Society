/**
 * Step Renderer Component
 * Renders the appropriate form step component based on currentStep
 */

import React from "react";
import PersonalDetails from "../PersonalDetails";
import Address from "../Address";
import Professional from "../Professional";
import KYCDetails from "../KYCDetails";
import Nominee from "../Nominee";
import Contribution from "../Contribution";
import ReferralBy from "../ReferralBy";
import Declaration from "../Declaration";
import Review from "../Review";

export const StepRenderer = ({ currentStep, formData, onChange, onEdit }) => {
  const props = {
    formData,
    onChange,
  };

  switch (currentStep) {
    case 1:
      return <PersonalDetails {...props} />;
    case 2:
      return <Professional {...props} />;
    case 3:
      return <Address {...props} />;
    case 4:
      return <KYCDetails {...props} />;
    case 5:
      return <Nominee {...props} />;
    case 6:
      return <Contribution {...props} />;
    case 7:
      return <ReferralBy {...props} />;
    case 8:
      return <Declaration {...props} />;
    case 9:
      return <Review {...props} onEdit={onEdit} />;
    default:
      return <div className="text-center text-gray-500">Unknown Step</div>;
  }
};

export default StepRenderer;
