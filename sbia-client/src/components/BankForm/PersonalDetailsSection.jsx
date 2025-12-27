import React, { useState, useEffect } from "react";

/**
 * Personal Details Section Component
 * Displays personal information in table format
 */
function PersonalDetailsSection({ formData }) {
  const [photoUrl, setPhotoUrl] = useState(null);

  // Create object URL from passport photo on mount and when it changes
  useEffect(() => {
    console.log("formData.passportPhoto:", formData.passportPhoto);
    console.log("Type:", typeof formData.passportPhoto);
    console.log("Is File?", formData.passportPhoto instanceof File);

    if (formData.passportPhoto) {
      try {
        if (formData.passportPhoto instanceof File) {
          console.log("Creating URL for File object");
          const url = URL.createObjectURL(formData.passportPhoto);
          console.log("Created URL:", url);
          setPhotoUrl(url);

          // Cleanup function to revoke object URL
          return () => {
            URL.revokeObjectURL(url);
          };
        } else if (typeof formData.passportPhoto === "string") {
          // If it's already a URL string
          console.log("Using string URL:", formData.passportPhoto);
          setPhotoUrl(formData.passportPhoto);
        } else if (
          formData.passportPhoto &&
          typeof formData.passportPhoto === "object"
        ) {
          // Handle case where it might be a blob
          console.log("Creating URL for Blob/Object");
          const url = URL.createObjectURL(formData.passportPhoto);
          console.log("Created URL:", url);
          setPhotoUrl(url);
          return () => {
            URL.revokeObjectURL(url);
          };
        }
      } catch (error) {
        console.error("Error processing passport photo:", error);
        setPhotoUrl(null);
      }
    } else {
      console.log("No passport photo found");
      setPhotoUrl(null);
    }
  }, [formData.passportPhoto]);
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-center text-gray-800 mb-6 py-4">
        Membership Form
      </h2>

      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Personal Details
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-400">
          <tbody>
            {/* Row 1: Full Name & Email Address */}
            <tr>
              <td className="border border-gray-400 p-2 font-semibold text-gray-700 bg-gray-50 w-1/6">
                Full Name
              </td>
              <td className="border border-gray-400 p-2 text-gray-800 w-2/6">
                {formData.fullName || "N/A"}
              </td>
              <td className="border border-gray-400 p-2 font-semibold text-gray-700 bg-gray-50 w-1/6">
                Email Address
              </td>
              <td className="border border-gray-400 p-2 text-gray-800 w-2/6">
                {formData.email || "N/A"}
              </td>
              <td
                className="border-t border-b border-r border-gray-400 p-0 bg-white w-1/6"
                rowSpan="6"
              >
                <div
                  className="flex justify-center items-center w-full h-full"
                  style={{ minHeight: "200px" }}
                >
                  <div
                    style={{
                      width: "160px",
                      height: "200px",
                      border: "2px solid #9ca3af",
                      backgroundColor: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      flexShrink: 0,
                      position: "relative",
                      clipPath: "inset(0)",
                    }}
                  >
                    {photoUrl ? (
                      <img
                        src={photoUrl}
                        alt="Passport Photo"
                        style={{
                          width: "160px",
                          height: "200px",
                          objectFit: "cover",
                          objectPosition: "center",
                          display: "block",
                          position: "absolute",
                          top: 0,
                          left: 0,
                        }}
                      />
                    ) : (
                      <span className="text-gray-400 text-xs text-center px-2">
                        Passport Size Photo
                      </span>
                    )}
                  </div>
                </div>
              </td>
            </tr>

            {/* Row 2: Father's Name & Mother's Name */}
            <tr>
              <td className="border border-gray-400 p-2 font-semibold text-gray-700 bg-gray-50 w-1/6">
                Father's Name
              </td>
              <td className="border border-gray-400 p-2 text-gray-800 w-2/6">
                {formData.fatherName || "N/A"}
              </td>
              <td className="border border-gray-400 p-2 font-semibold text-gray-700 bg-gray-50 w-1/6">
                Mother's Name
              </td>
              <td className="border border-gray-400 p-2 text-gray-800 w-2/6">
                {formData.motherName || "N/A"}
              </td>
            </tr>

            {/* Row 3: Mobile Number & WhatsApp Number */}
            <tr>
              <td className="border border-gray-400 p-2 font-semibold text-gray-700 bg-gray-50 w-1/6">
                Mobile Number
              </td>
              <td className="border border-gray-400 p-2 text-gray-800 w-2/6">
                {formData.mobile || "N/A"}
              </td>
              <td className="border border-gray-400 p-2 font-semibold text-gray-700 bg-gray-50 w-1/6">
                WhatsApp Number
              </td>
              <td className="border border-gray-400 p-2 text-gray-800 w-2/6">
                {formData.whatsappNumber || "N/A"}
              </td>
            </tr>

            {/* Row 4: Gender & Date of Birth */}
            <tr>
              <td className="border border-gray-400 p-2 font-semibold text-gray-700 bg-gray-50 w-1/6">
                Gender
              </td>
              <td className="border border-gray-400 p-2 text-gray-800 w-2/6">
                {formData.gender || "N/A"}
              </td>
              <td className="border border-gray-400 p-2 font-semibold text-gray-700 bg-gray-50 w-1/6">
                Date of Birth
              </td>
              <td className="border border-gray-400 p-2 text-gray-800 w-2/6">
                {formData.dobDay && formData.dobMonth && formData.dobYear
                  ? `${String(formData.dobDay).padStart(2, "0")}/${String(
                      formData.dobMonth
                    ).padStart(2, "0")}/${formData.dobYear}`
                  : "N/A"}
              </td>
            </tr>

            {/* Row 5: Religion & Nationality */}
            <tr>
              <td className="border border-gray-400 p-2 font-semibold text-gray-700 bg-gray-50 w-1/6">
                Religion
              </td>
              <td className="border border-gray-400 p-2 text-gray-800 w-2/6">
                {formData.religion || "N/A"}
              </td>
              <td className="border border-gray-400 p-2 font-semibold text-gray-700 bg-gray-50 w-1/6">
                Nationality
              </td>
              <td className="border border-gray-400 p-2 text-gray-800 w-2/6">
                {formData.nationality || "Indian"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PersonalDetailsSection;
