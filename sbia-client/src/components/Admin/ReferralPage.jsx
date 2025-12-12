import React, { useState } from "react";
import { AdminHeader, AdminSidebar } from "./index";
import {
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
  FaUsers,
  FaGift,
  FaStar,
  FaChartLine,
} from "react-icons/fa";

function ReferralPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Referral data with updated fields
  const allReferrals = [
    {
      id: "945678901227",
      referrerName: "Anushka Verma",
      referrerPhone: "9456789012",
      totalReferrals: 6,
      referredMembers: [
        "Sandeep Kumar",
        "Varun Nair",
        "Deepak Singh",
        "Isha Verma",
        "Rahul Desai",
        "Sanjay Kumar",
      ],
      status: "Active",
      lastReferralDate: "2025-11-27",
    },
    {
      id: "990123456709",
      referrerName: "Padma Reddy",
      referrerPhone: "9901234567",
      totalReferrals: 5,
      referredMembers: [
        "Lokesh Singh",
        "Divya Kumar",
        "Mohini Patel",
        "Sanjit Nair",
        "Preeti Verma",
      ],
      status: "Active",
      lastReferralDate: "2025-11-26",
    },
    {
      id: "987654321028",
      referrerName: "Amit Sharma",
      referrerPhone: "9876543210",
      totalReferrals: 5,
      referredMembers: [
        "Meera Patel",
        "Ravi Kumar",
        "Priya Singh",
        "Vikram Das",
        "Anushka Verma",
      ],
      status: "Active",
      lastReferralDate: "2025-11-28",
    },
    {
      id: "998765432105",
      referrerName: "Priya Singh",
      referrerPhone: "9987654321",
      totalReferrals: 4,
      referredMembers: [
        "Pankaj Sharma",
        "Divya Nair",
        "Arjun Singh",
        "Karan Verma",
      ],
      status: "Active",
      lastReferralDate: "2025-11-25",
    },
    {
      id: "978901234520",
      referrerName: "Pooja Desai",
      referrerPhone: "9789012345",
      totalReferrals: 4,
      referredMembers: [
        "Harsh Verma",
        "Nidhi Nair",
        "Rohan Singh",
        "Amrita Desai",
      ],
      status: "Active",
      lastReferralDate: "2025-11-22",
    },
    {
      id: "972345678919",
      referrerName: "Meera Patel",
      referrerPhone: "9723456789",
      totalReferrals: 3,
      referredMembers: ["Rajesh Kumar", "Neha Gupta", "Pooja Desai"],
      status: "Active",
      lastReferralDate: "2025-11-20",
    },
    {
      id: "967890123409",
      referrerName: "Neha Gupta",
      referrerPhone: "9678901234",
      totalReferrals: 3,
      referredMembers: ["Manish Kumar", "Shreya Singh", "Tanvi Patel"],
      status: "Inactive",
      lastReferralDate: "2025-11-08",
    },
    {
      id: "901234567806",
      referrerName: "Pankaj Sharma",
      referrerPhone: "9012345678",
      totalReferrals: 3,
      referredMembers: ["Chirag Singh", "Gauri Desai", "Hema Nair"],
      status: "Active",
      lastReferralDate: "2025-11-19",
    },
    {
      id: "988765432105",
      referrerName: "Ravi Kumar",
      referrerPhone: "9887654321",
      totalReferrals: 2,
      referredMembers: ["Suresh Nair", "Padma Reddy"],
      status: "Active",
      lastReferralDate: "2025-11-18",
    },
    {
      id: "965432109829",
      referrerName: "Vikram Das",
      referrerPhone: "9654321098",
      totalReferrals: 2,
      referredMembers: ["Rohit Singh", "Nisha Patel"],
      status: "Active",
      lastReferralDate: "2025-11-15",
    },
    {
      id: "989012345622",
      referrerName: "Suresh Nair",
      referrerPhone: "9890123456",
      totalReferrals: 2,
      referredMembers: ["Vikram Reddy", "Ashok Kumar"],
      status: "Inactive",
      lastReferralDate: "2025-11-12",
    },
    {
      id: "956789012305",
      referrerName: "Rajesh Kumar",
      referrerPhone: "9567890123",
      totalReferrals: 1,
      referredMembers: ["Ajay Singh"],
      status: "Active",
      lastReferralDate: "2025-11-10",
    },
  ];

  // Filter referrals
  const filteredReferrals = allReferrals.filter((referral) => {
    const matchesSearch =
      referral.referrerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      referral.referrerPhone.includes(searchTerm);
    return matchesSearch;
  });

  // Sort by total referrals (descending)
  const sortedReferrals = [...filteredReferrals].sort(
    (a, b) => b.totalReferrals - a.totalReferrals
  );

  // Calculate statistics
  const stats = {
    totalReferrers: allReferrals.filter((r) => r.status === "Active").length,
    totalReferralsGiven: allReferrals.reduce(
      (sum, curr) => sum + curr.totalReferrals,
      0
    ),
    topReferrer: allReferrals.reduce((max, curr) =>
      curr.totalReferrals > max.totalReferrals ? curr : max
    ),
  };

  // Calculate pagination
  const itemsPerPage = 10;
  const totalPages = Math.ceil(sortedReferrals.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedReferrals = sortedReferrals.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      {/* Header */}
      <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Container */}
      <div className="flex flex-1 relative">
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 lg:hidden z-30"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Sidebar */}
        <AdminSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main Content */}
        <div className="flex-1 w-full transition-all duration-300">
          <div className="p-4 md:p-6">
            {/* Header Section */}
            <div className="mb-8">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  Referrals
                </h1>
                <div className="bg-green-50 px-3 py-1 rounded-lg border border-green-200">
                  <h2 className="text-lg font-semibold text-green-700">
                    Overview
                  </h2>
                </div>
              </div>
            </div>

            {/* Dashboard Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Total Referrers Card */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-sm border border-blue-200 p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-blue-600 text-sm font-medium">
                      Total Referrers
                    </p>
                    <p className="text-3xl font-bold text-blue-900 mt-2">
                      {stats.totalReferrers}
                    </p>
                    <p className="text-xs text-blue-600 mt-2">
                      Active members referring
                    </p>
                  </div>
                  <FaUsers className="text-blue-600 text-3xl opacity-80" />
                </div>
              </div>

              {/* Total Referrals Card */}
              <div className="bg-gradient-to-br from-rose-50 to-rose-100 rounded-lg shadow-sm border border-rose-200 p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-rose-600 text-sm font-medium">
                      Total Referrals
                    </p>
                    <p className="text-3xl font-bold text-rose-900 mt-2">
                      {stats.totalReferralsGiven}
                    </p>
                    <p className="text-xs text-rose-600 mt-2">
                      Members added via referral
                    </p>
                  </div>
                  <FaGift className="text-rose-600 text-3xl opacity-80" />
                </div>
              </div>

              {/* Avg Referrals/Person Card */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow-sm border border-purple-200 p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-purple-600 text-sm font-medium">
                      Avg Referrals/Person
                    </p>
                    <p className="text-3xl font-bold text-purple-900 mt-2">
                      {(
                        stats.totalReferralsGiven / stats.totalReferrers
                      ).toFixed(1)}
                    </p>
                    <p className="text-xs text-purple-600 mt-2">
                      Average per referrer
                    </p>
                  </div>
                  <FaChartLine className="text-purple-600 text-3xl opacity-80" />
                </div>
              </div>

              {/* Top Referrer Card */}
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg shadow-sm border border-amber-200 p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-amber-600 text-sm font-medium">
                      Top Referrer
                    </p>
                    <p className="text-xl font-bold text-amber-900 mt-2">
                      {stats.topReferrer.referrerName}
                    </p>
                    <p className="text-sm text-amber-600 mt-2">
                      {stats.topReferrer.totalReferrals} referrals
                    </p>
                  </div>
                  <FaStar className="text-amber-600 text-3xl opacity-80" />
                </div>
              </div>
            </div>

            {/* Search Bar - Below Cards */}
            <div className="mb-6">
              <div className="w-80 relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or phone"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-sm"
                />
              </div>
            </div>

            {/* Referrals Table Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
              {/* Table */}
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 bg-green-50">
                      <th className="px-6 py-3 text-left font-semibold text-green-700">
                        Member ID
                      </th>
                      <th className="px-6 py-3 text-left font-semibold text-green-700">
                        Referrer Name
                      </th>
                      <th className="px-6 py-3 text-left font-semibold text-green-700">
                        Phone Number
                      </th>
                      <th className="px-6 py-3 text-left font-semibold text-green-700">
                        Total Referrals
                      </th>
                      <th className="px-6 py-3 text-left font-semibold text-green-700">
                        Referred Members
                      </th>
                      <th className="px-6 py-3 text-left font-semibold text-green-700">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left font-semibold text-green-700">
                        Last Referral
                      </th>
                      <th className="px-6 py-3 text-center font-semibold text-green-700">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedReferrals.length > 0 ? (
                      paginatedReferrals.map((referral) => (
                        <tr
                          key={referral.id}
                          className="border-b border-gray-200 hover:bg-gray-50 transition"
                        >
                          <td className="px-6 py-4 font-medium text-blue-600 text-xs">
                            {referral.id}
                          </td>
                          <td className="px-6 py-4 font-medium text-gray-800">
                            {referral.referrerName}
                          </td>
                          <td className="px-6 py-4 text-gray-600 text-sm">
                            {referral.referrerPhone}
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                              {referral.totalReferrals}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1">
                              {referral.referredMembers
                                .slice(0, 2)
                                .map((member, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium"
                                  >
                                    {member}
                                  </span>
                                ))}
                              {referral.referredMembers.length > 2 && (
                                <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs font-medium">
                                  +{referral.referredMembers.length - 2}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                referral.status === "Active"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {referral.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-600 text-sm">
                            {referral.lastReferralDate}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex justify-center gap-3">
                              <button className="text-blue-600 hover:text-blue-800 transition">
                                <FaEye size={16} title="View" />
                              </button>
                              <button className="text-amber-600 hover:text-amber-800 transition">
                                <FaEdit size={16} title="Edit" />
                              </button>
                              <button className="text-red-600 hover:text-red-800 transition">
                                <FaTrash size={16} title="Delete" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="8"
                          className="px-6 py-8 text-center text-gray-500"
                        >
                          No referrers found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  Showing {sortedReferrals.length > 0 ? startIndex + 1 : 0} -{" "}
                  {Math.min(endIndex, sortedReferrals.length)} of{" "}
                  {sortedReferrals.length}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    First
                  </button>
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <span className="px-3 py-2 text-sm font-medium text-gray-700">
                    {totalPages > 0
                      ? `${currentPage} / ${totalPages}`
                      : "0 / 0"}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Last
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReferralPage;
