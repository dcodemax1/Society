import React from "react";
import BankFormHeader from "./BankFormHeader";
import PersonalDetailsSection from "./PersonalDetailsSection";
import ProfessionalDetailsSection from "./ProfessionalDetailsSection";
import AddressDetailsSection from "./AddressDetailsSection";
import PermanentAddressSection from "./PermanentAddressSection";
import NomineeDetailsSection from "./NomineeDetailsSection";
import ContributionDetailsSection from "./ContributionDetailsSection";
import DeclarationSection from "./DeclarationSection";
import IntroducerReferralSection from "./IntroducerReferralSection";
import ProofOfIdentityAddressSection from "./ProofOfIdentityAddressSection";
import TermsConditionsSection from "./TermsConditionsSection";

/**
 * Bank Form Component
 * Comprehensive membership form displaying all submitted data
 * Responsive design for mobile, tablet, and desktop
 */
function BankForm({ formData = {} }) {
  return (
    <div className="min-h-screen bg-white p-1 sm:p-2 md:p-4">
      <div
        className="w-full sm:w-full md:max-w-4xl lg:max-w-4xl"
        style={{ maxWidth: "100%", margin: "0 auto" }}
      >
        <div
          className="max-w-full md:max-w-none"
          style={{ maxWidth: "800px", margin: "0 auto" }}
        >
          {/* Header with Logo */}
          <BankFormHeader />

          {/* Personal Details Section */}
          <PersonalDetailsSection formData={formData} />

          {/* Professional Details Section */}
          <ProfessionalDetailsSection formData={formData} />

          {/* Permanent Address Section */}
          <PermanentAddressSection formData={formData} />

          {/* Present and Communication Address Section */}
          <AddressDetailsSection formData={formData} />

          {/* Nominee Details Section */}
          <NomineeDetailsSection formData={formData} />

          {/* Contribution Details Section */}
          <ContributionDetailsSection formData={formData} />

          {/* Introducer/Referral By Section */}
          <IntroducerReferralSection formData={formData} />

          {/* Proof of Identity & Address Section */}
          <ProofOfIdentityAddressSection formData={formData} />

          {/* Declaration Section */}
          <DeclarationSection formData={formData} />

          {/* Terms & Conditions Section */}
          <TermsConditionsSection formData={formData} />
        </div>
      </div>
    </div>
  );
}

export default BankForm;
