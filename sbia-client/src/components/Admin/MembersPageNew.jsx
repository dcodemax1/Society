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
} from "react-icons/fa";
import { fetchAllMembers } from "../../services/memberApi";

function MembersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search and filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [stateFilter, setStateFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch members from API on component mount
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
          <div className="p-4 md:p-6 space-y-6">
            {/* Header Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                  <FaUsers className="mr-3 text-blue-600" /> Members Directory
                </h1>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center">
                  <FaUserPlus className="mr-2" /> Add Member
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded">
                  <p className="text-gray-600 text-sm">Total Members</p>
                  <h3 className="text-2xl font-bold text-blue-600">
                    {members.length}
                  </h3>
                </div>
                <div className="bg-green-50 p-4 rounded">
                  <p className="text-gray-600 text-sm">Approved</p>
                  <h3 className="text-2xl font-bold text-green-600">
                    {members.filter((m) => m.status === "APPROVED").length}
                  </h3>
                </div>
                <div className="bg-yellow-50 p-4 rounded">
                  <p className="text-gray-600 text-sm">Pending</p>
                  <h3 className="text-2xl font-bold text-yellow-600">
                    {members.filter((m) => m.status === "PENDING").length}
                  </h3>
                </div>
                <div className="bg-red-50 p-4 rounded">
                  <p className="text-gray-600 text-sm">Rejected</p>
                  <h3 className="text-2xl font-bold text-red-600">
                    {members.filter((m) => m.status === "REJECTED").length}
                  </h3>
                </div>
              </div>

              {/* Search and Filters */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Search */}
                  <div className="flex-1">
                    <div className="relative">
                      <FaSearch className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search by name, email, or mobile..."
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* State Filter */}
                  <select
                    value={stateFilter}
                    onChange={(e) => {
                      setStateFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {uniqueStates.map((state) => (
                      <option key={state} value={state}>
                        {state === "all" ? "All States" : state}
                      </option>
                    ))}
                  </select>

                  {/* Status Filter */}
                  <select
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="PENDING">Pending</option>
                    <option value="APPROVED">Approved</option>
                    <option value="REJECTED">Rejected</option>
                  </select>
                </div>
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
                        <thead className="bg-gray-100 border-b border-gray-300">
                          <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                              ID
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                              Full Name
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                              Email
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                              Mobile
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                              State
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                              Status
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                              Joined
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                              Actions
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
                              <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                                {member.id}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-700">
                                {member.full_name || "N/A"}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-600">
                                {member.email || "N/A"}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-600">
                                {member.mobile || "N/A"}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-600">
                                {member.comm_state || "N/A"}
                              </td>
                              <td className="px-6 py-4 text-sm">
                                {getStatusBadge(member.status)}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-600">
                                {member.joining_date
                                  ? new Date(
                                      member.joining_date
                                    ).toLocaleDateString()
                                  : new Date(
                                      member.created_at
                                    ).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 text-sm space-x-2 flex">
                                <button className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded transition">
                                  <FaEye size={16} />
                                </button>
                                <button className="text-gray-600 hover:text-gray-800 hover:bg-gray-200 p-2 rounded transition">
                                  <FaPrint size={16} />
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
