/**
 * Guarantor 1 - Referrer Component (Loan Form Step 3)
 * Fields: Guarantor 1 Name, Member ID, Mobile, Membership Duration (auto-filled from referrer)
 * Auto-filled from membership introducer/referrer data
 */

import React, { useEffect } from "react";

function Guarantor1({ formData, onChange }) {
  /**
   * Auto-load dummy referrer data on component mount
   * In future, this will fetch from actual membership introducer/referrer records
   */
  useEffect(() => {
    // Auto-fill with dummy referrer data (from membership introducer)
    if (!formData.guarantor1Name) {
      onChange({
        target: {
          name: "guarantor1Name",
          value: "Rajesh Kumar",
        },
      });
    }
    if (!formData.guarantor1MemberId) {
      onChange({
        target: {
          name: "guarantor1MemberId",
          value: "MID-1001",
        },
      });
    }
    if (!formData.guarantor1Mobile) {
      onChange({
        target: {
          name: "guarantor1Mobile",
          value: "9876543210",
        },
      });
    }
    if (!formData.guarantor1MembershipDuration) {
      onChange({
        target: {
          name: "guarantor1MembershipDuration",
          value: "24",
        },
      });
    }
  }, []);
  return (
    <div className="space-y-6">
      {/* Guarantor 1 Section */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Guarantor 1 — Referrer
        </h2>

        {/* First Row: Guarantor 1 Name and Member ID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Guarantor 1 Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Guarantor 1 Name
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="guarantor1Name"
              value={formData.guarantor1Name || ""}
              readOnly
              className="w-full border border-gray-300 rounded-md p-3 bg-gray-50 text-gray-700 cursor-not-allowed focus:outline-none focus:ring-0 focus:border-gray-300"
            />
            {!formData.guarantor1Name && (
              <p className="text-xs text-red-500 mt-1">
                Guarantor 1 name required
              </p>
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
              name="guarantor1MemberId"
              value={formData.guarantor1MemberId || ""}
              readOnly
              className="w-full border border-gray-300 rounded-md p-3 bg-gray-50 text-gray-700 cursor-not-allowed focus:outline-none focus:ring-0 focus:border-gray-300"
            />
            {!formData.guarantor1MemberId && (
              <p className="text-xs text-red-500 mt-1">Member ID required</p>
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
              name="guarantor1Mobile"
              value={formData.guarantor1Mobile || ""}
              readOnly
              className="w-full border border-gray-300 rounded-md p-3 bg-gray-50 text-gray-700 cursor-not-allowed focus:outline-none focus:ring-0 focus:border-gray-300"
            />
            {!formData.guarantor1Mobile && (
              <p className="text-xs text-red-500 mt-1">
                Mobile number required
              </p>
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
              name="guarantor1MembershipDuration"
              value={formData.guarantor1MembershipDuration || ""}
              readOnly
              className="w-full border border-gray-300 rounded-md p-3 bg-gray-50 text-gray-700 cursor-not-allowed focus:outline-none focus:ring-0 focus:border-gray-300"
            />
            {!formData.guarantor1MembershipDuration && (
              <p className="text-xs text-red-500 mt-1">
                Membership duration required
              </p>
            )}
            {formData.guarantor1MembershipDuration &&
              parseFloat(formData.guarantor1MembershipDuration) < 6 && (
                <p className="text-xs text-red-500 mt-1">
                  Guarantor 1 must be {">="} 6 months
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
              name="guarantor1DepositBalance"
              value={formData.guarantor1DepositBalance || "0"}
              readOnly
              className="w-full border border-gray-300 rounded-md p-3 bg-gray-50 text-gray-700 cursor-not-allowed focus:outline-none focus:ring-0 focus:border-gray-300"
            />
          </div>
        </div>

        {/* Info Note */}
        <p className="text-xs text-gray-600 mb-6">
          * Referrer details auto-loaded from membership records.
        </p>
      </div>
    </div>
  );
}

export default Guarantor1;
