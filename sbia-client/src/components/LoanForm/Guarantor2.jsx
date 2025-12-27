/**
 * Guarantor 2 - Active Member (Search & Manual Entry) Component (Loan Form Step 4)
 * Fields: Search input, Guarantor 2 Name, Member ID, Mobile, Membership Duration, Consent checkbox
 * Fetches member details from database based on Member ID search
 */

import React, { useState, useEffect } from "react";
import { fetchMemberById } from "../../services/memberApi";

function Guarantor2({ formData, onChange, modalErrors = {} }) {
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // Auto-hide notification after 3 seconds
  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification({ ...notification, show: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification.show]);

  const handleSearchGuarantor2 = async () => {
    const searchTerm = formData.guarantor2Search || "";
    if (!searchTerm.trim()) {
      setNotification({
        show: true,
        message: "Please enter Member ID to search",
        type: "error",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Fetch member data from API using Member ID
      const result = await fetchMemberById(searchTerm.trim());

      if (result.success && result.data) {
        const member = result.data;

        // Calculate membership duration in months based on joining_date
        const joiningDate = new Date(member.joining_date);
        const today = new Date();
        let monthsDifference =
          (today.getFullYear() - joiningDate.getFullYear()) * 12;
        monthsDifference += today.getMonth() - joiningDate.getMonth();

        // If current day is before joining day in the month, subtract 1
        if (today.getDate() < joiningDate.getDate()) {
          monthsDifference--;
        }

        const membershipDuration = Math.max(0, monthsDifference).toString();

        // Auto-fill the form fields
        onChange({
          target: {
            name: "guarantor2Name",
            value: member.full_name || "",
          },
        });
        onChange({
          target: {
            name: "guarantor2MemberId",
            value: member.member_id || "",
          },
        });
        onChange({
          target: {
            name: "guarantor2Mobile",
            value: member.mobile || "",
          },
        });
        onChange({
          target: {
            name: "guarantor2MembershipDuration",
            value: membershipDuration,
          },
        });
        setNotification({
          show: true,
          message: "Member found! Details auto-filled.",
          type: "success",
        });
      } else {
        setNotification({
          show: true,
          message:
            result.error || "Member not found. Please enter details manually.",
          type: "error",
        });
      }
    } catch (error) {
      setNotification({
        show: true,
        message: "Error searching member: " + error.message,
        type: "error",
      });
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
            Search by Member ID
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 lg:gap-3">
            <input
              type="text"
              name="guarantor2Search"
              value={formData.guarantor2Search || ""}
              onChange={onChange}
              placeholder="e.g., 800984788902"
              className="sm:col-span-10 border border-gray-300 rounded-md p-3 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="button"
              onClick={handleSearchGuarantor2}
              disabled={isLoading}
              className="sm:col-span-2 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold px-4 sm:px-6 py-3 rounded-lg hover:from-green-700 hover:to-green-800 disabled:bg-gray-400 disabled:from-gray-400 disabled:to-gray-400 transition-all duration-200 text-xs sm:text-sm shadow-md hover:shadow-lg"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Searching...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  Search
                </span>
              )}
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
            {(modalErrors.guarantor2Name || !formData.guarantor2Name) && (
              <p className="text-xs text-red-500 mt-1">
                {modalErrors.guarantor2Name || "Guarantor 2 required"}
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
              name="guarantor2MemberId"
              value={formData.guarantor2MemberId || ""}
              onChange={onChange}
              placeholder="e.g., MID-2002"
              className="w-full border border-gray-300 rounded-md p-3 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {(modalErrors.guarantor2MemberId ||
              !formData.guarantor2MemberId) && (
              <p className="text-xs text-red-500 mt-1">
                {modalErrors.guarantor2MemberId || "Guarantor 2 required"}
              </p>
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
            {(modalErrors.guarantor2Mobile || !formData.guarantor2Mobile) && (
              <p className="text-xs text-red-500 mt-1">
                {modalErrors.guarantor2Mobile || "Mobile required"}
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
              name="guarantor2MembershipDuration"
              value={formData.guarantor2MembershipDuration || ""}
              onChange={onChange}
              placeholder="e.g., 12"
              className="w-full border border-gray-300 rounded-md p-3 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {(modalErrors.guarantor2MembershipDuration ||
              !formData.guarantor2MembershipDuration) && (
              <p className="text-xs text-red-500 mt-1">
                {modalErrors.guarantor2MembershipDuration ||
                  "Membership Duration required"}
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

        {/* Action Buttons */}
        {formData.guarantor2Name && (
          <div className="mb-6 flex items-center gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleDeleteGuarantor}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold px-5 py-2.5 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-md hover:shadow-lg"
              title="Clear and search for another member"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Delete
            </button>
          </div>
        )}

        {/* Notification Toast */}
        {notification.show && (
          <div
            className={`fixed top-4 right-4 flex items-center gap-3 px-5 py-3 rounded-lg shadow-lg animate-in fade-in slide-in-from-top-4 ${
              notification.type === "success"
                ? "bg-emerald-500 border border-emerald-600"
                : "bg-red-100 border border-red-300"
            } z-50`}
          >
            {notification.type === "success" ? (
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 text-red-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            <span
              className={
                notification.type === "success"
                  ? "text-white font-medium"
                  : "text-red-700 font-medium"
              }
            >
              {notification.message}
            </span>
            <button
              onClick={() => setNotification({ ...notification, show: false })}
              className="ml-2 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Guarantor2;
