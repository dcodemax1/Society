/**
 * Referral By Component (Member Form Step 7)
 * Fields: Search input (Full Name, Membership ID, Mobile, Signature of Introducer)
 * Select and save referral member with profile image display
 */

import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { fetchAllMembers } from "../../services/memberApi";

function ReferralBy({ formData, onChange, formErrors = {} }) {
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isSaved, setIsSaved] = useState(!!formData.introducerMemberId);
  const [profileImageError, setProfileImageError] = useState(false);
  const [searchResultImageErrors, setSearchResultImageErrors] = useState({});

  // Get profile image - return profile image or null
  const getProfileImage = (member) => {
    return member.profile_image || member.profileImage || null;
  };

  /**
   * Handle member search from server
   * Search by Member ID or Mobile
   */
  const handleSearchMember = async () => {
    if (!searchInput.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetchAllMembers();

      if (response.success && response.data) {
        const query = searchInput.toLowerCase();
        // Search by member_id (stored in database) or mobile
        const results = response.data.filter((member) => {
          const memberId = member.member_id || member.memberId || "";
          const mobile = member.mobile || "";
          return (
            memberId.toLowerCase().includes(query) || mobile.includes(query)
          );
        });

        setSearchResults(results);
        setShowResults(true);
        setSearchResultImageErrors({});
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
      setShowResults(false);
    }

    setIsLoading(false);
  };

  /**
   * Handle member selection from search results
   */
  const handleSelectMember = (member) => {
    // Reset saved state when selecting a new member
    setIsSaved(false);

    onChange({
      target: {
        name: "introducerMemberId",
        value: member.member_id || member.memberId,
      },
    });
    onChange({
      target: {
        name: "introducerName",
        value: member.full_name || member.fullName,
      },
    });
    onChange({
      target: {
        name: "introducerMobile",
        value: member.mobile,
      },
    });
    onChange({
      target: {
        name: "referralMemberProfileImage",
        value: getProfileImage(member),
      },
    });
    setSearchInput("");
    setSearchResults([]);
    setShowResults(false);
    setProfileImageError(false);
    setSearchResultImageErrors({});
  };

  /**
   * Handle Save button click
   */
  const handleSave = () => {
    if (!formData.introducerMemberId) {
      alert("Please select a referral member before saving");
      return;
    }
    setIsSaved(true);
  };

  /**
   * Handle Clear selection
   */
  const handleClearSelection = () => {
    onChange({
      target: {
        name: "introducerMemberId",
        value: "",
      },
    });
    onChange({
      target: {
        name: "introducerName",
        value: "",
      },
    });
    onChange({
      target: {
        name: "introducerMobile",
        value: "",
      },
    });
    onChange({
      target: {
        name: "referralMemberProfileImage",
        value: "",
      },
    });
    setSearchInput("");
    setSearchResults([]);
    setShowResults(false);
    setIsSaved(false);
    setProfileImageError(false);
    setSearchResultImageErrors({});
  };

  return (
    <div className="space-y-6 lg:space-y-4">
      {/* Referral By Section */}
      <div className="p-6 rounded-lg border border-green-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Introducer / Referral By Member
        </h2>
        <p className="text-sm text-gray-600 mb-5">
          Search for an existing member who referred you or introduced you to
          Shreejan Credit Society.
        </p>

        {/* Search Type Selector and Input */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-800 mb-3">
            Search by Member ID
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 lg:gap-3">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => {
                // Allow only digits and limit to 20 characters
                const value = e.target.value.replace(/\D/g, "").slice(0, 20);
                setSearchInput(value);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearchMember();
                }
              }}
              placeholder="Enter Member ID"
              maxLength="20"
              className="sm:col-span-10 px-3 sm:px-4 py-2 sm:py-3 lg:py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-xs sm:text-sm lg:text-base text-gray-900"
            />
            <button
              type="button"
              onClick={handleSearchMember}
              disabled={isLoading}
              className="sm:col-span-2 px-3 sm:px-4 py-2 sm:py-3 lg:py-4 bg-green-600 hover:bg-green-700 text-white rounded-md disabled:bg-gray-400 font-semibold transition text-xs sm:text-sm lg:text-base cursor-pointer"
            >
              {isLoading ? "..." : "Search"}
            </button>
          </div>
        </div>

        {/* Search Results */}
        {showResults && (
          <div className="mb-6">
            {searchResults.length > 0 ? (
              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  Found {searchResults.length} member(s):
                </p>
                {searchResults.map((member) => (
                  <button
                    key={member.memberId || member.member_id}
                    type="button"
                    onClick={() => handleSelectMember(member)}
                    className="w-full text-left p-4 border border-gray-300 rounded-lg hover:bg-green-50 hover:border-green-400 transition cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0">
                          {getProfileImage(member) &&
                          !searchResultImageErrors[
                            member.member_id || member.memberId
                          ] ? (
                            <img
                              src={getProfileImage(member)}
                              alt={member.full_name || member.fullName}
                              className="w-12 h-12 rounded-full object-cover border-2 border-green-300"
                              onError={() => {
                                setSearchResultImageErrors((prev) => ({
                                  ...prev,
                                  [member.member_id || member.memberId]: true,
                                }));
                              }}
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-gray-300 border-2 border-green-300"></div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {member.full_name || member.fullName}
                          </p>
                          <p className="text-xs text-gray-600">
                            ID: {member.member_id || member.memberId} | Mobile:{" "}
                            {member.mobile}
                          </p>
                        </div>
                      </div>
                      <span className="text-green-600 font-medium text-sm">
                        Select →
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-700 font-medium">
                  No members found. Please try a different search term.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Selected Member Display with Profile Image */}
      {formData.introducerMemberId && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Member Details */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg border border-green-300">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Selected Referral Member
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <p className="text-sm text-gray-700 font-medium">Full Name</p>
                <p className="text-sm text-gray-900">
                  {formData.introducerName || "—"}
                </p>
              </div>
              {formErrors.introducerName && (
                <p className="text-xs text-red-600 font-medium">
                  ⚠️ {formErrors.introducerName}
                </p>
              )}
              <div className="flex justify-between border-t border-gray-200 pt-3">
                <p className="text-sm text-gray-700 font-medium">
                  Membership ID
                </p>
                <p className="text-sm text-gray-900">
                  {formData.introducerMemberId || "—"}
                </p>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-3">
                <p className="text-sm text-gray-700 font-medium">
                  Mobile Number
                </p>
                <p className="text-sm text-gray-900">
                  {formData.introducerMobile || "—"}
                </p>
              </div>
              {formErrors.introducerPhone && (
                <p className="text-xs text-red-600 font-medium">
                  ⚠️ {formErrors.introducerPhone}
                </p>
              )}
            </div>
          </div>

          {/* Profile Image Section */}
          <div className="lg:col-span-1 bg-green-50 p-6 rounded-lg border border-green-300 flex flex-col items-center justify-center">
            <p className="text-sm font-semibold text-gray-700 mb-4 text-center">
              Member Profile
            </p>
            <div className="w-28 h-28 mb-4 flex items-center justify-center">
              {formData.referralMemberProfileImage && !profileImageError ? (
                <img
                  src={formData.referralMemberProfileImage}
                  alt={formData.referralMemberName}
                  className="w-28 h-28 rounded-full border border-white shadow-md object-cover"
                  onError={(e) => {
                    setProfileImageError(true);
                  }}
                />
              ) : (
                <div className="w-28 h-28 rounded-full bg-gray-300 border border-white shadow-md flex items-center justify-center">
                  <p className="text-xs text-gray-600 font-medium">
                    No profile
                  </p>
                </div>
              )}
            </div>
            <p className="text-xs text-gray-600 text-center mb-4">
              {formData.referralMemberName}
            </p>
            {!isSaved ? (
              <button
                type="button"
                onClick={handleSave}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium transition text-sm cursor-pointer"
              >
                Save Selection
              </button>
            ) : (
              <div className="w-full bg-green-100 border border-green-300 rounded-md p-2 text-center">
                <p className="text-xs font-semibold text-green-700">
                  ✓ Selection Saved
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {formData.introducerMemberId && (
        <div className="flex justify-start sm:justify-end">
          <button
            type="button"
            onClick={handleClearSelection}
            className="flex items-center gap-2 px-4 sm:px-6 py-2 text-red-600 border border-red-300 rounded-md hover:bg-red-50 font-medium transition cursor-pointer text-xs sm:text-sm"
          >
            <RiDeleteBin6Line size={18} />
            <span>Clear Selection</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default ReferralBy;
