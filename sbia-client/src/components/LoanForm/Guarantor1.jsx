/**
 * Guarantor 1 - Referrer Component (Loan Form Step 3)
 * Fields: Guarantor 1 Name, Member ID, Mobile, Membership Duration (auto-filled from referrer)
 * Auto-filled from member's introducer details fetched from server
 */

import React, { useEffect, useState } from "react";

function Guarantor1({ formData, onChange, modalErrors = {} }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /**
   * Fetch introducer details from server based on Member ID from loan form
   * Auto-fill Guarantor 1 fields whenever memberId changes
   */
  useEffect(() => {
    const fetchIntroducerData = async () => {
      try {
        setLoading(true);
        setError("");

        // Get Member ID from loan form (filled in MemberLookup step)
        const memberId = formData.memberId;

        console.log("Member ID from loan form:", memberId);

        if (!memberId || memberId.trim() === "") {
          setError("Please enter Member ID in Member Details section first");
          setLoading(false);
          return;
        }

        // Fetch member details from server to get introducer information
        // Use local development server URL
        const apiUrl = `http://localhost:8000/api/v1/members/${memberId}`;
        console.log("Fetching member details from API:", apiUrl);

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`Member not found. Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Member details API Response:", data);

        if (data.status === "success" && data.data) {
          const member = data.data;
          const { introducer_name, introducer_member_id, introducer_mobile } =
            member;

          console.log("Extracted introducer data:", {
            introducer_name,
            introducer_member_id,
            introducer_mobile,
          });

          // Auto-fill basic introducer fields
          onChange({
            target: {
              name: "guarantor1Name",
              value: introducer_name || "",
            },
          });

          onChange({
            target: {
              name: "guarantor1MemberId",
              value: introducer_member_id || "",
            },
          });

          onChange({
            target: {
              name: "guarantor1Mobile",
              value: introducer_mobile || "",
            },
          });

          // Now fetch the introducer's own record to get their joining date
          if (introducer_member_id) {
            try {
              const introducerApiUrl = `http://localhost:8000/api/v1/members/${introducer_member_id}`;
              console.log(
                "Fetching introducer's joining date from:",
                introducerApiUrl
              );

              const introducerResponse = await fetch(introducerApiUrl);
              if (introducerResponse.ok) {
                const introducerData = await introducerResponse.json();

                if (
                  introducerData.status === "success" &&
                  introducerData.data &&
                  introducerData.data.joining_date
                ) {
                  const joiningDate = new Date(
                    introducerData.data.joining_date
                  );
                  const currentDate = new Date();
                  const membershipDurationMonths = Math.floor(
                    (currentDate - joiningDate) / (1000 * 60 * 60 * 24 * 30.44)
                  );

                  console.log(
                    "Introducer joining date:",
                    introducerData.data.joining_date
                  );
                  console.log(
                    "Calculated membership duration:",
                    membershipDurationMonths
                  );

                  onChange({
                    target: {
                      name: "guarantor1MembershipDuration",
                      value: Math.max(0, membershipDurationMonths).toString(),
                    },
                  });
                }
              }
            } catch (err) {
              console.error("Error fetching introducer's joining date:", err);
              // Don't stop the process if this fails, other fields are already filled
            }
          }

          setLoading(false);
        } else {
          throw new Error("Invalid member data received");
        }
      } catch (err) {
        console.error("Error fetching introducer details:", err);
        setError(
          `Error: ${err.message || "Failed to load introducer details"}`
        );
        setLoading(false);
      }
    };

    // Trigger fetch when memberId changes
    if (formData.memberId) {
      fetchIntroducerData();
    }
  }, [formData.memberId, onChange]);
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
            {modalErrors.guarantor1Name && (
              <p className="text-xs text-red-500 mt-1">
                {modalErrors.guarantor1Name}
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
