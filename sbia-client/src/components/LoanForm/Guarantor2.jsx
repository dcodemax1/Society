/**
 * Guarantor 2 - Active Member (Search & Manual Entry) Component (Loan Form Step 4)
 * Fields: Search input, Guarantor 2 Name, Member ID, Mobile, Membership Duration, Consent checkbox
 * Auto-filled with dummy data (in future, will fetch from member search)
 */

import React, { useState, useEffect } from "react";

function Guarantor2({ formData, onChange }) {
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Auto-load dummy guarantor 2 data on component mount
   * In future, this will be populated from member search results
   */
  useEffect(() => {
    // Don't auto-fill on mount - let user enter data
    // Auto-fill will only happen when user searches
  }, []);

  const handleSearchGuarantor2 = async () => {
    const searchTerm = formData.guarantor2Search || "";
    if (!searchTerm.trim()) {
      alert("Please enter Member ID, Mobile, or Name to search");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Mock member data based on search term
      const mockMembers = {
        "MID-2001": {
          name: "Aarav Sharma",
          mobile: "9811122334",
          memberId: "MID-2001",
          membershipDuration: "24",
        },
        "MID-2002": {
          name: "Neha Singh",
          mobile: "9822233445",
          memberId: "MID-2002",
          membershipDuration: "18",
        },
        "MID-2003": {
          name: "Priya Patel",
          mobile: "9833344556",
          memberId: "MID-2003",
          membershipDuration: "36",
        },
        9811122334: {
          name: "Aarav Sharma",
          mobile: "9811122334",
          memberId: "MID-2001",
          membershipDuration: "24",
        },
        9822233445: {
          name: "Neha Singh",
          mobile: "9822233445",
          memberId: "MID-2002",
          membershipDuration: "18",
        },
        9833344556: {
          name: "Priya Patel",
          mobile: "9833344556",
          memberId: "MID-2003",
          membershipDuration: "36",
        },
        aarav: {
          name: "Aarav Sharma",
          mobile: "9811122334",
          memberId: "MID-2001",
          membershipDuration: "24",
        },
        neha: {
          name: "Neha Singh",
          mobile: "9822233445",
          memberId: "MID-2002",
          membershipDuration: "18",
        },
        priya: {
          name: "Priya Patel",
          mobile: "9833344556",
          memberId: "MID-2003",
          membershipDuration: "36",
        },
      };

      const member = mockMembers[searchTerm.toLowerCase()];
      if (member) {
        onChange({
          target: {
            name: "guarantor2Name",
            value: member.name,
          },
        });
        onChange({
          target: {
            name: "guarantor2MemberId",
            value: member.memberId,
          },
        });
        onChange({
          target: {
            name: "guarantor2Mobile",
            value: member.mobile,
          },
        });
        onChange({
          target: {
            name: "guarantor2MembershipDuration",
            value: member.membershipDuration,
          },
        });
        alert("Member found! Details auto-filled.");
      } else {
        alert("Member not found. Please enter details manually.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Delete guarantor 2 information to select another member
   */
  const handleDeleteGuarantor = () => {
    onChange({
      target: {
        name: "guarantor2Name",
        value: "",
      },
    });
    onChange({
      target: {
        name: "guarantor2MemberId",
        value: "",
      },
    });
    onChange({
      target: {
        name: "guarantor2Mobile",
        value: "",
      },
    });
    onChange({
      target: {
        name: "guarantor2MembershipDuration",
        value: "",
      },
    });
    onChange({
      target: {
        name: "guarantor2Search",
        value: "",
      },
    });
    onChange({
      target: {
        name: "guarantor2Consent",
        value: false,
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Guarantor 2 Section */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Guarantor 2 — Active Member
        </h2>

        {/* Search Bar */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search (Member ID / Mobile / Name)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 lg:gap-3">
            <input
              type="text"
              name="guarantor2Search"
              value={formData.guarantor2Search || ""}
              onChange={onChange}
              placeholder="e.g., MID-2002 or 98111... or Neha Singh"
              className="sm:col-span-10 border border-gray-300 rounded-md p-3 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="button"
              onClick={handleSearchGuarantor2}
              disabled={isLoading}
              className="sm:col-span-2 bg-green-600 text-white font-medium px-4 sm:px-6 py-3 rounded-md hover:bg-green-700 disabled:bg-gray-400 transition-colors text-xs sm:text-sm"
            >
              {isLoading ? "..." : "Search"}
            </button>
          </div>
        </div>

        {/* First Row: Guarantor 2 Name and Member ID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Guarantor 2 Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Guarantor 2 Name
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="guarantor2Name"
              value={formData.guarantor2Name || ""}
              onChange={onChange}
              placeholder="Enter Guarantor 2 Name"
              className="w-full border border-gray-300 rounded-md p-3 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {!formData.guarantor2Name && (
              <p className="text-xs text-red-500 mt-1">Guarantor 2 required</p>
            )}
          </div>

          {/* Member ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Member ID
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="guarantor2MemberId"
              value={formData.guarantor2MemberId || ""}
              onChange={onChange}
              placeholder="e.g., MID-2002"
              className="w-full border border-gray-300 rounded-md p-3 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {!formData.guarantor2MemberId && (
              <p className="text-xs text-red-500 mt-1">Guarantor 2 required</p>
            )}
          </div>
        </div>

        {/* Second Row: Mobile and Membership Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Mobile */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mobile
              <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="guarantor2Mobile"
              value={formData.guarantor2Mobile || ""}
              onChange={onChange}
              placeholder="e.g., 9876543212"
              className="w-full border border-gray-300 rounded-md p-3 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {!formData.guarantor2Mobile && (
              <p className="text-xs text-red-500 mt-1">Mobile required</p>
            )}
          </div>

          {/* Membership Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Membership Duration (months)
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="guarantor2MembershipDuration"
              value={formData.guarantor2MembershipDuration || ""}
              onChange={onChange}
              placeholder="e.g., 12"
              className="w-full border border-gray-300 rounded-md p-3 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {!formData.guarantor2MembershipDuration && (
              <p className="text-xs text-red-500 mt-1">
                Guarantor 2 must be {">="} 6 months
              </p>
            )}
            {formData.guarantor2MembershipDuration &&
              parseFloat(formData.guarantor2MembershipDuration) < 6 && (
                <p className="text-xs text-red-500 mt-1">
                  Guarantor 2 must be {">="} 6 months
                </p>
              )}
          </div>
        </div>

        {/* Third Row: Deposit Balance (Hidden) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Deposit Balance */}
          <div className="hidden">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deposit Balance (₹)
            </label>
            <input
              type="text"
              name="guarantor2DepositBalance"
              value={formData.guarantor2DepositBalance || "0"}
              readOnly
              className="w-full border border-gray-300 rounded-md p-3 bg-gray-50 text-gray-700 cursor-not-allowed focus:outline-none focus:ring-0 focus:border-gray-300"
            />
          </div>
        </div>

        {/* Consent Checkbox */}
        <div className="mb-6">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="guarantor2Consent"
              checked={formData.guarantor2Consent || false}
              onChange={(e) => {
                onChange({
                  target: {
                    name: "guarantor2Consent",
                    value: e.target.checked,
                  },
                });
              }}
              className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer"
            />
            <span className="text-sm font-medium text-gray-700">
              I consent to act as Guarantor 2 (Active Member)
            </span>
          </label>
        </div>

        {/* Delete Button */}
        {formData.guarantor2Name && (
          <div className="mb-6">
            <button
              type="button"
              onClick={handleDeleteGuarantor}
              className="bg-red-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete & Search Other Member
            </button>
            <p className="text-xs text-gray-600 mt-2">
              Clear this guarantor's information to search for another member.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Guarantor2;
