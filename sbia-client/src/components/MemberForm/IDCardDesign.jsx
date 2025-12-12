import React from "react";

/**
 * Member ID Card Design Component
 * Matches the exact design from the screenshot
 * Member ID format: RegisteredMobileNumber + StateCode
 */
function IDCardDesign({ memberId, formData, stateCode, stateName }) {
  const joiningDate = new Date().toLocaleDateString("en-IN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <div className="flex justify-center my-4 sm:my-6 md:my-8 px-2 sm:px-4">
      {/* ID Card - Cream Background with Shadow */}
      <div
        className="relative rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-5 md:p-8 w-full max-w-xs sm:max-w-sm md:max-w-lg"
        style={{
          backgroundColor: "#FFF8E7",
          border: "1px solid #E0D4B8",
          boxShadow:
            "0 20px 40px rgba(0, 0, 0, 0.15), 8px 8px 30px rgba(0, 0, 0, 0.1), -8px 8px 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Company Name - Single Line (Dark Teal) */}
        <div className="text-center mb-3 sm:mb-4 md:mb-6">
          <h1
            className="text-[10px] sm:text-xs md:text-lg font-bold whitespace-nowrap overflow-hidden text-ellipsis"
            style={{ color: "#004B49" }}
          >
            Shreejan Multistate Credit Co-operative Society
          </h1>
        </div>

        {/* Main Content - Flex Layout Responsive */}
        <div className="flex flex-row gap-6 sm:gap-8 md:gap-12 items-start md:items-center justify-between">
          {/* Left Section - Member Details */}
          <div className="flex-1 space-y-2 sm:space-y-3 md:space-y-4 min-w-0 pt-1 sm:pt-2 md:pt-0">
            {/* Member Name and Joining Date - Horizontal */}
            <div className="flex justify-between items-start gap-2 sm:gap-3 md:gap-4">
              {/* Member Name */}
              <div className="flex-1">
                <p className="text-[9px] sm:text-xs md:text-xs font-semibold text-gray-700 mb-0.5 sm:mb-1">
                  Member Name
                </p>
                <p className="text-[11px] sm:text-sm md:text-lg font-bold text-black max-w-xs overflow-hidden text-ellipsis">
                  {formData.fullName || "N/A"}
                </p>
              </div>

              {/* Joining Date */}
              <div className="flex-shrink-0">
                <p className="text-[9px] sm:text-xs md:text-xs font-semibold text-gray-700 mb-0.5 sm:mb-1">
                  Joining Date
                </p>
                <p className="text-[11px] sm:text-sm md:text-lg font-bold text-black">
                  {joiningDate}
                </p>
              </div>
            </div>

            {/* Member ID and Mobile - Horizontal */}
            <div className="flex justify-between items-start gap-2 sm:gap-3 md:gap-4 pt-1 sm:pt-2">
              {/* Member ID */}
              <div className="flex-1">
                <p className="text-[9px] sm:text-xs md:text-xs font-semibold text-gray-700 mb-0.5 sm:mb-1">
                  Member ID
                </p>
                <p className="text-[10px] sm:text-xs md:text-base font-bold text-black font-mono">
                  {memberId}
                </p>
              </div>

              {/* Mobile */}
              <div className="flex-shrink-0">
                <p className="text-[9px] sm:text-xs md:text-xs font-semibold text-gray-700 mb-0.5 sm:mb-1">
                  Mobile
                </p>
                <p className="text-[10px] sm:text-xs md:text-base font-bold text-black">
                  {formData.mobile || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Right Section - Profile Image */}
          <div className="shrink-0">
            <div className="w-20 h-24 sm:w-28 sm:h-40 md:w-40 md:h-48 rounded-lg border-4 border-gray-300 overflow-hidden flex items-center justify-center bg-gray-200 shadow-md">
              {formData.passportPhoto && (
                <img
                  src={URL.createObjectURL(formData.passportPhoto)}
                  alt="Member"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Note Section - Removed */}
        {/* Removed the note: "Note: Member ID is permanent once issued..." */}
      </div>
    </div>
  );
}

export default IDCardDesign;
