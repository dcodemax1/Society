import React, { useState, useEffect } from "react";
import { AdminHeader, AdminSidebar } from "./index";
import {
  FaUsers,
  FaCheckCircle,
  FaTimesCircle,
  FaUserPlus,
  FaEye,
  FaPrint,
  FaFilePdf,
  FaSearch,
  FaFilter,
  FaTimes,
  FaSpinner,
  FaChevronLeft,
  FaChevronRight,
  FaClock,
  FaChartLine,
  FaUserCheck,
} from "react-icons/fa";
import { fetchAllMembers } from "../../services/memberApi";

function MembersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [stateFilter, setStateFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch members from API
  useEffect(() => {
    const loadMembers = async () => {
      try {
        setLoading(true);
        setError("");
        const result = await fetchAllMembers();
        if (result.success) {
          setMembers(result.data);
        } else {
          setError(result.error || "Failed to fetch members");
          setMembers([]);
        }
      } catch (err) {
        setError("Error loading members: " + err.message);
        setMembers([]);
      } finally {
        setLoading(false);
      }
    };
    loadMembers();
  }, []);

  // Dummy members data - REMOVED, using API instead

  // Filter members based on search and filters
  const filteredMembers = members.filter((member) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      !searchTerm ||
      member.full_name?.toLowerCase().includes(searchLower) ||
      member.email?.toLowerCase().includes(searchLower) ||
      member.mobile?.includes(searchTerm);

    const matchesState =
      stateFilter === "all" || member.comm_state === stateFilter;

    const matchesStatus =
      statusFilter === "all" || member.status === statusFilter;

    return matchesSearch && matchesState && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedMembers = filteredMembers.slice(
    startIdx,
    startIdx + itemsPerPage
  );

  // Get unique states for filter
  const uniqueStates = [
    "all",
    ...new Set(members.map((m) => m.comm_state).filter(Boolean)),
  ];

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "APPROVED":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <FaCheckCircle className="mr-1" size={12} /> Approved
          </span>
        );
      case "PENDING":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
            <FaUserPlus className="mr-1" size={12} /> Pending
          </span>
        );
      case "REJECTED":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
            <FaTimesCircle className="mr-1" size={12} /> Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      {/* Header */}
      <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
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

        {/* Main Content Area */}
        <div className="flex-1 w-full transition-all duration-300">
          <div className="p-4 md:p-6 space-y-4">
            {/* Header Section */}
            <div className="rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-800">
                  Members Overview
                </h1>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-600 text-sm font-semibold mb-1">
                        Total Members
                      </p>
                      <h3 className="text-3xl font-bold text-blue-800">
                        {members.length}
                      </h3>
                      <p className="text-blue-500 text-xs mt-2">
                        Active in system
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-full p-4 shadow-lg transform hover:scale-110 transition-transform duration-300">
                      <FaUsers className="text-2xl text-white" />
                    </div>
                  </div>
                </div>

                {/* Approved Members Card */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-600 text-sm font-semibold mb-1">
                        Approved
                      </p>
                      <h3 className="text-3xl font-bold text-green-800">
                        {members.filter((m) => m.status === "APPROVED").length}
                      </h3>
                      <p className="text-green-500 text-xs mt-2">
                        Verified members
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-full p-4 shadow-lg transform hover:scale-110 transition-transform duration-300">
                      <FaCheckCircle className="text-2xl text-white" />
                    </div>
                  </div>
                </div>

                {/* Pending Members Card */}
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-yellow-600 text-sm font-semibold mb-1">
                        Pending
                      </p>
                      <h3 className="text-3xl font-bold text-yellow-800">
                        {members.filter((m) => m.status === "PENDING").length}
                      </h3>
                      <p className="text-yellow-500 text-xs mt-2">
                        Awaiting verification
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full p-4 shadow-lg transform hover:scale-110 transition-transform duration-300">
                      <FaClock className="text-2xl text-white" />
                    </div>
                  </div>
                </div>

                {/* Rejected Members Card */}
                <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-red-600 text-sm font-semibold mb-1">
                        Rejected
                      </p>
                      <h3 className="text-3xl font-bold text-red-800">
                        {members.filter((m) => m.status === "REJECTED").length}
                      </h3>
                      <p className="text-red-500 text-xs mt-2">Not qualified</p>
                    </div>
                    <div className="bg-gradient-to-br from-red-400 to-red-600 rounded-full p-4 shadow-lg transform hover:scale-110 transition-transform duration-300">
                      <FaTimesCircle className="text-2xl text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Search and Filter Section */}
            <div className="mb-6">
              <div className="w-full md:w-2/5 flex items-center gap-3">
                {/* Search Bar */}
                <div className="relative flex-1">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search By Member ID, Name and Mobile"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-sm bg-white"
                  />
                </div>

                {/* Status Filter Dropdown */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-sm bg-white cursor-pointer whitespace-nowrap"
                >
                  <option value="all">All Status</option>
                  <option value="APPROVED">Approved</option>
                  <option value="PENDING">Pending</option>
                  <option value="REJECTED">Rejected</option>
                </select>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <FaSpinner className="inline-block text-4xl text-blue-600 animate-spin" />
                <p className="mt-4 text-gray-600">Loading members...</p>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700 font-semibold">Error: {error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Members Table */}
            {!loading && !error && (
              <>
                {paginatedMembers.length === 0 ? (
                  <div className="bg-white rounded-lg shadow p-12 text-center">
                    <FaUsers className="inline-block text-4xl text-gray-300 mb-4" />
                    <p className="text-gray-500 text-lg">
                      {members.length === 0
                        ? "No members found. Members will appear here after registration."
                        : "No members match your search criteria."}
                    </p>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-green-50 border-b border-green-300">
                          <tr>
                            <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-green-700">
                              Member ID
                            </th>
                            <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-green-700 hidden md:table-cell">
                              Member Name
                            </th>
                            <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-green-700 hidden lg:table-cell">
                              Mobile Number
                            </th>
                            <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-green-700 hidden lg:table-cell">
                              State
                            </th>
                            <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-green-700 hidden xl:table-cell">
                              Occupation
                            </th>
                            <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-green-700 hidden xl:table-cell">
                              Monthly Income
                            </th>
                            <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-green-700 hidden 2xl:table-cell">
                              Monthly Contribution
                            </th>
                            <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-green-700 hidden 2xl:table-cell">
                              Referral by
                            </th>
                            <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-green-700">
                              Date
                            </th>
                            <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-green-700">
                              Status
                            </th>
                            <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-green-700">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {paginatedMembers.map((member, index) => (
                            <tr
                              key={member.id}
                              className={`border-b border-gray-200 hover:bg-gray-50 transition ${
                                index % 2 === 0 ? "bg-white" : "bg-gray-50"
                              }`}
                            >
                              <td className="px-4 md:px-6 py-4 text-xs md:text-sm font-medium text-blue-600">
                                {member.id}
                              </td>
                              <td className="px-4 md:px-6 py-4 text-xs md:text-sm text-gray-700 hidden md:table-cell">
                                {member.full_name || "N/A"}
                              </td>
                              <td className="px-4 md:px-6 py-4 text-xs md:text-sm text-gray-600 hidden lg:table-cell">
                                {member.mobile || "N/A"}
                              </td>
                              <td className="px-4 md:px-6 py-4 text-xs md:text-sm text-gray-600 hidden lg:table-cell">
                                {member.comm_state || "N/A"}
                              </td>
                              <td className="px-4 md:px-6 py-4 text-xs md:text-sm text-gray-600 hidden xl:table-cell">
                                {member.occupation || "N/A"}
                              </td>
                              <td className="px-4 md:px-6 py-4 text-xs md:text-sm text-gray-600 hidden xl:table-cell">
                                {member.monthly_income
                                  ? `₹${member.monthly_income}`
                                  : "N/A"}
                              </td>
                              <td className="px-4 md:px-6 py-4 text-xs md:text-sm text-gray-600 hidden 2xl:table-cell">
                                {member.monthly_contribution
                                  ? `₹${member.monthly_contribution}`
                                  : "N/A"}
                              </td>
                              <td className="px-4 md:px-6 py-4 text-xs md:text-sm text-gray-600 hidden 2xl:table-cell">
                                {member.referral_by || "N/A"}
                              </td>
                              <td className="px-4 md:px-6 py-4 text-xs md:text-sm text-gray-600">
                                {member.joining_date
                                  ? new Date(
                                      member.joining_date
                                    ).toLocaleDateString()
                                  : new Date(
                                      member.created_at
                                    ).toLocaleDateString()}
                              </td>
                              <td className="px-4 md:px-6 py-4 text-xs md:text-sm">
                                {getStatusBadge(member.status)}
                              </td>
                              <td className="px-4 md:px-6 py-4 text-xs md:text-sm space-x-2 flex">
                                <button
                                  className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded transition"
                                  title="View"
                                >
                                  <FaEye size={14} />
                                </button>
                                <button
                                  className="text-gray-600 hover:text-gray-800 hover:bg-gray-200 p-2 rounded transition"
                                  title="Print"
                                >
                                  <FaPrint size={14} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                          Showing {startIdx + 1} to{" "}
                          {Math.min(
                            startIdx + itemsPerPage,
                            filteredMembers.length
                          )}{" "}
                          of {filteredMembers.length} members
                        </p>
                        <div className="flex gap-2">
                          <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                            className="p-2 border border-gray-300 rounded hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <FaChevronLeft size={14} />
                          </button>
                          {Array.from(
                            { length: totalPages },
                            (_, i) => i + 1
                          ).map((page) => (
                            <button
                              key={page}
                              onClick={() => setCurrentPage(page)}
                              className={`px-3 py-1 rounded text-sm ${
                                currentPage === page
                                  ? "bg-blue-600 text-white"
                                  : "border border-gray-300 hover:bg-white"
                              }`}
                            >
                              {page}
                            </button>
                          ))}
                          <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                            className="p-2 border border-gray-300 rounded hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <FaChevronRight size={14} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MembersPage;
