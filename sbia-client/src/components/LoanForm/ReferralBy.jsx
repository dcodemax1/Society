/**
 * Referral By Component (Loan Form Step 6)
 * Fields: Search input (Name, Mobile, Member ID), Select referral member
 * Referral member must be an existing member
 */

import React, { useState } from "react";

function ReferralBy({ formData, onChange }) {
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // Mock member database for referral search - 3 dummy data (consistent across forms)
  const mockMemberDatabase = [
    {
      memberId: "MID-REF-001",
      name: "Rajesh Kumar",
      mobile: "9876543210",
      joinDate: "2022-01-15",
      membershipDuration: 24,
      
    },
    {
      memberId: "MID-REF-002",
      name: "Priya Singh",
      mobile: "9876543211",
      joinDate: "2022-03-20",
      membershipDuration: 22,
      
    },
    {
      memberId: "MID-REF-003",
      name: "Amit Patel",
      mobile: "9876543212",
      joinDate: "2021-11-10",
      membershipDuration: 38,
      
    },
  ];

  /**
   * Handle referral member search
   * Search by Member ID, Mobile, or Name
   */
  const handleSearch = async () => {
    if (!searchInput.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const query = searchInput.toLowerCase();
    const results = mockMemberDatabase.filter(
      (member) =>
        member.memberId.toLowerCase().includes(query) ||
        member.mobile.includes(query) ||
        member.name.toLowerCase().includes(query)
    );

    setSearchResults(results);
    setShowResults(true);
    setIsLoading(false);
  };

  /**
   * Handle member selection from search results
   */
  const handleSelectMember = (member) => {
    onChange({
      target: {
        name: "referralMemberId",
        value: member.memberId,
      },
    });
    onChange({
      target: {
        name: "referralMemberName",
        value: member.name,
      },
    });
    onChange({
      target: {
        name: "referralMemberMobile",
        value: member.mobile,
      },
    });
    onChange({
      target: {
        name: "referralMembershipDuration",
        value: member.membershipDuration,
      },
    });
    onChange({
      target: {
        name: "referralDepositBalance",
        value: member.depositBalance,
      },
    });
    setSearchInput("");
    setSearchResults([]);
    setShowResults(false);
  };

  /**
   * Clear selection
   */
  const handleClearSelection = () => {
    onChange({
      target: {
        name: "referralMemberId",
        value: "",
      },
    });
    onChange({
      target: {
        name: "referralMemberName",
        value: "",
      },
    });
    onChange({
      target: {
        name: "referralMemberMobile",
        value: "",
      },
    });
    onChange({
      target: {
        name: "referralMembershipDuration",
        value: "",
      },
    });
    onChange({
      target: {
        name: "referralDepositBalance",
        value: "",
      },
    });
    setSearchInput("");
    setSearchResults([]);
    setShowResults(false);
  };

  /**
   * Handle Enter key press
   */
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="space-y-6">
      {/* Referral By Section */}
      <div className="bg-green-50 p-6 rounded-lg border border-green-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Referral By - Member Introduction
        </h2>

        <p className="text-sm text-gray-600 mb-6">
          Please select an existing member who is introducing you to the
          society. You can search by Name, Mobile Number, or Member ID.
        </p>

        {/* Search Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Referral Member
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter Member ID, Mobile, or Name..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
            <button
              type="button"
              onClick={handleSearch}
              disabled={isLoading}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 font-medium transition"
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>

        {/* Search Results */}
        {showResults && (
          <div className="mb-6">
            {searchResults.length > 0 ? (
              <div className="space-y-2">
                <p className="text-sm text-gray-600 mb-3">
                  Found {searchResults.length} member(s):
                </p>
                {searchResults.map((member) => (
                  <button
                    key={member.memberId}
                    type="button"
                    onClick={() => handleSelectMember(member)}
                    className="w-full text-left p-3 border border-gray-200 rounded-md hover:bg-green-50 transition"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">
                          {member.name}
                        </p>
                        <p className="text-xs text-gray-600">
                          ID: {member.memberId} | Mobile: {member.mobile}
                        </p>
                        <p className="text-xs text-gray-500">
                          Member Since: {member.joinDate} | Deposit: ₹
                          {member.depositBalance}
                        </p>
                      </div>
                      <span className="text-green-600 font-medium">
                        Select →
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-sm text-yellow-700">
                  No members found. Please try a different search term.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Selected Member Display */}
        {formData.referralMemberId && (
          <div className="bg-white p-4 rounded-md border border-green-200 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Selected Referral Member
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-700">Name</p>
                    <p className="text-sm font-medium text-gray-900">
                      {formData.referralMemberName || "—"}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-700">Member ID</p>
                    <p className="text-sm font-medium text-gray-900">
                      {formData.referralMemberId || "—"}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-700">Mobile</p>
                    <p className="text-sm font-medium text-gray-900">
                      {formData.referralMemberMobile || "—"}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-700">Deposit Balance</p>
                    <p className="text-sm font-medium text-gray-900">
                      ₹{formData.referralDepositBalance || "0"}
                    </p>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClearSelection}
                className="text-red-600 hover:text-red-700 font-medium text-sm"
              >
                Clear
              </button>
            </div>
          </div>
        )}

        {/* Info Note */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-xs text-blue-700">
            <strong>Note:</strong> The referral member must be an existing
            member of the Shreejan Credit Co-operative Society. This person will
            be recorded as your introduction to the society.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ReferralBy;
