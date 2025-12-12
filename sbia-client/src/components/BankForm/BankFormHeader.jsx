import React from "react";

/**
 * Bank Form Header Component
 * Displays logo and header information
 */
function BankFormHeader() {
  return (
    <div className="mb-8">
      {/* Logo and Title */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <img src="/logo.png" alt="Shreejan Logo" className="h-16 w-auto" />
      </div>

      {/* Header Info */}
      <div className="text-sm text-gray-700 space-y-1 text-center mb-6 pb-4 border-b-2 border-gray-400">
        <p className="font-semibold">
          SHREEJAN MULTISTATE CREDIT CO-OPERATIVE SOCIETY
        </p>
        <p>
          (Registered under the Multi-State Cooperative Societies Act, 2002)
        </p>
        <p className="text-gray-600">
          Registered with Ministry of Corporate Affairs, Govt. of India
        </p>
      </div>
    </div>
  );
}

export default BankFormHeader;
