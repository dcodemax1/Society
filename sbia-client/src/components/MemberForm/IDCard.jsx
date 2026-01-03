import React, { useState, useEffect } from "react";

/**
 * Member ID Card Component
 * Displays member ID card with member details
 * Props:
 * - memberId: Generated member ID
 * - formData: Form data containing member information
 */
function IDCard({ memberId, formData }) {
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState(null);

  const joiningDate = new Date().toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Create and manage photo preview URL
  useEffect(() => {
    if (formData.passportPhoto instanceof File) {
      try {
        const url = URL.createObjectURL(formData.passportPhoto);
        setPhotoPreviewUrl(url);
        // Cleanup function
        return () => {
          URL.revokeObjectURL(url);
        };
      } catch (error) {
        console.error("Failed to create photo preview URL:", error);
      }
    } else {
      setPhotoPreviewUrl(null);
    }
  }, [formData.passportPhoto]);

  return (
    <div className="flex justify-center my-8">
      {/* ID Card Container - Credit Card Size (3.5" x 2.25") */}
      <div
        className="relative rounded-lg overflow-hidden shadow-2xl"
        style={{
          width: "350px",
          aspectRatio: "1.56",
          background: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
        }}
      >
        {/* Front Side of Card */}
        <div className="relative w-full h-full p-6 flex flex-col justify-between text-white">
          {/* Header - Company Name (Single Line) */}
          <div className="text-center mb-2">
            <h3 className="text-xs font-bold tracking-wider">
              SHREEJAN CREDIT CO-OPERATIVE SOCIETY LTD.
            </h3>
            <div className="w-12 h-0.5 bg-yellow-400 mx-auto mt-1"></div>
          </div>

          {/* Profile Image Section */}
          <div className="flex justify-center my-2">
            <div className="w-14 h-14 rounded-full border-2 border-yellow-400 overflow-hidden flex items-center justify-center bg-gray-200">
              <img
                src={photoPreviewUrl || "/profile11.avif"}
                alt="Member"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "/profile11.avif";
                }}
              />
            </div>
          </div>

          {/* Member Details */}
          <div className="space-y-2 text-center">
            {/* Member Name */}
            <div>
              <p className="text-xs text-gray-200">Member Name</p>
              <p className="text-sm font-bold truncate">
                {formData.fullName || "N/A"}
              </p>
            </div>

            {/* Member ID */}
            <div>
              <p className="text-xs text-gray-200">Member ID</p>
              <p className="text-lg font-bold font-mono tracking-wider">
                {memberId}
              </p>
            </div>

            {/* Mobile Number */}
            <div>
              <p className="text-xs text-gray-200">Mobile</p>
              <p className="text-xs font-semibold">
                {formData.mobile || "N/A"}
              </p>
            </div>

            {/* Joining Date */}
            <div>
              <p className="text-xs text-gray-200">Joining Date</p>
              <p className="text-xs font-semibold">{joiningDate}</p>
            </div>
          </div>

          {/* Footer - Valid From */}
          <div className="text-center pt-2 border-t border-gray-300 border-opacity-30">
            <p className="text-xs text-gray-300">
              Valid from {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IDCard;
