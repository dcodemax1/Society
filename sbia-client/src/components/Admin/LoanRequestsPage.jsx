import React, { useState, useEffect } from "react";
import { AdminHeader, AdminSidebar } from "./index";
import { loanApi } from "../../services/loanApi";
import {
  FaSearch,
  FaFileAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

function getStatusBadge(status) {
  const normalizedStatus = status?.toUpperCase() || "";

  switch (normalizedStatus) {
    case "PENDING":
      return (
        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold whitespace-nowrap">
          Pending
        </span>
      );
    case "APPROVED":
      return (
        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold whitespace-nowrap">
          Approved
        </span>
      );
    case "REJECTED":
      return (
        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold whitespace-nowrap">
          Rejected
        </span>
      );
    case "DISBURSED":
      return (
        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold whitespace-nowrap">
          Disbursed
        </span>
      );
    case "CLOSED":
      return (
        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold whitespace-nowrap">
          Closed
        </span>
      );
    case "DEFAULTED":
      return (
        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold whitespace-nowrap">
          Defaulted
        </span>
      );
    default:
      return null;
  }
}

function LoanRequestsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [allLoanRequests, setAllLoanRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const itemsPerPage = 10;

  useEffect(() => {
    const loadLoanRequests = async () => {
      try {
        setLoading(true);
        const result = await loanApi.getAllLoans();

        if (result?.data?.success && result?.data?.data) {
          const loans = (result.data.data || []).map((loan) => ({
            id: loan.loan_id || Math.random(),
            memberId: loan.member_id || "N/A",
            memberName: loan.member_name || "N/A",
            mobileNumber: loan.registered_mobile || "N/A",
            membershipDuration:
              loan.membership_duration !== null &&
              loan.membership_duration !== undefined
                ? loan.membership_duration
                : "N/A",
            monthlyContribution: loan.monthly_contribution
              ? `₹${loan.monthly_contribution.toLocaleString("en-IN")}`
              : "N/A",
            loanRequest: loan.loan_amount
              ? `₹${loan.loan_amount.toLocaleString("en-IN")}`
              : "N/A",
            tenure: loan.emi_tenure ? `${loan.emi_tenure} months` : "N/A",
            requestDate: loan.loan_request_date
              ? new Date(loan.loan_request_date).toLocaleDateString("en-IN")
              : "N/A",
            loanRequired: loan.when_loan_required || "N/A",
            status: loan.status?.toLowerCase() || "pending",
          }));
          setAllLoanRequests(loans);
          setError(null);
        } else {
          setAllLoanRequests([]);
          setError("No loan requests found");
        }
      } catch (err) {
        console.error("Error loading loan requests:", err);
        if (err.response?.status === 401) {
          setError("You are not authorized. Please log in as admin.");
        } else {
          setError("Failed to load loan requests");
        }
        setAllLoanRequests([]);
      } finally {
        setLoading(false);
      }
    };

    loadLoanRequests();
  }, []);

  // Filter loan requests based on search and status
  const filteredLoanRequests = allLoanRequests.filter((loan) => {
    const matchesSearch =
      loan.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.memberId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.memberName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || loan.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredLoanRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedLoanRequests = filteredLoanRequests.slice(
    startIndex,
    endIndex
  );

  // Calculate statistics
  const stats = {
    total: allLoanRequests.length,
    pending: allLoanRequests.filter((l) => l.status === "pending").length,
    approved: allLoanRequests.filter((l) => l.status === "approved").length,
    rejected: allLoanRequests.filter((l) => l.status === "rejected").length,
  };

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
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                Loan Requests
              </h1>
              <p className="text-gray-600">
                Manage and review all loan requests
              </p>
            </div>

            {/* Statistics Cards */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Card */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300">
                  <div className="flex h-24">
                    {/* Left Half - Colored Background with Border and Icon */}
                    <div className="w-1/2 bg-blue-50 border-l-4 border-blue-500 flex items-center justify-center">
                      <FaFileAlt className="text-4xl text-blue-600" />
                    </div>
                    {/* Right Half - Label and Value */}
                    <div className="w-1/2 flex flex-col items-start justify-center p-4">
                      <p className="text-gray-600 text-xs md:text-sm font-medium">
                        Total
                      </p>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
                        {stats.total}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Pending Card */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300">
                  <div className="flex h-24">
                    {/* Left Half - Colored Background with Border and Icon */}
                    <div className="w-1/2 bg-yellow-50 border-l-4 border-yellow-500 flex items-center justify-center">
                      <FaClock className="text-4xl text-yellow-600" />
                    </div>
                    {/* Right Half - Label and Value */}
                    <div className="w-1/2 flex flex-col items-start justify-center p-4">
                      <p className="text-gray-600 text-xs md:text-sm font-medium">
                        Pending
                      </p>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
                        {stats.pending}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Approved Card */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300">
                  <div className="flex h-24">
                    {/* Left Half - Colored Background with Border and Icon */}
                    <div className="w-1/2 bg-green-50 border-l-4 border-green-500 flex items-center justify-center">
                      <FaCheckCircle className="text-4xl text-green-600" />
                    </div>
                    {/* Right Half - Label and Value */}
                    <div className="w-1/2 flex flex-col items-start justify-center p-4">
                      <p className="text-gray-600 text-xs md:text-sm font-medium">
                        Approved
                      </p>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
                        {stats.approved}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Rejected Card */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300">
                  <div className="flex h-24">
                    {/* Left Half - Colored Background with Border and Icon */}
                    <div className="w-1/2 bg-red-50 border-l-4 border-red-500 flex items-center justify-center">
                      <FaTimesCircle className="text-4xl text-red-600" />
                    </div>
                    {/* Right Half - Label and Value */}
                    <div className="w-1/2 flex flex-col items-start justify-center p-4">
                      <p className="text-gray-600 text-xs md:text-sm font-medium">
                        Rejected
                      </p>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
                        {stats.rejected}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Search and Filter Section */}
            <div className="mb-6">
              <div className="w-full md:w-2/5 flex items-center gap-3">
                {/* Search Bar - Takes more space */}
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

                {/* Status Filter Dropdown - Compact */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-sm bg-white cursor-pointer whitespace-nowrap"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {loading ? (
                <div className="flex justify-center items-center h-96">
                  <div className="text-gray-500">Loading loan requests...</div>
                </div>
              ) : error ? (
                <div className="flex justify-center items-center h-96">
                  <div className="text-red-500">{error}</div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs md:text-sm">
                    <thead>
                      <tr className="border-b border-green-300 bg-green-50">
                        <th className="px-3 md:px-6 py-4 text-left font-semibold text-green-700 text-xs md:text-sm">
                          Member ID
                        </th>
                        <th className="px-3 md:px-6 py-4 text-left font-semibold text-green-700 hidden sm:table-cell text-xs md:text-sm">
                          Member Name
                        </th>
                        <th className="px-3 md:px-6 py-4 text-left font-semibold text-green-700 hidden md:table-cell text-xs md:text-sm">
                          Mobile Number
                        </th>
                        <th className="px-3 md:px-6 py-4 text-left font-semibold text-green-700 hidden lg:table-cell text-xs md:text-sm">
                          Membership Duration
                        </th>
                        <th className="px-3 md:px-6 py-4 text-left font-semibold text-green-700 hidden xl:table-cell text-xs md:text-sm">
                          Monthly Contribution
                        </th>
                        <th className="px-3 md:px-6 py-4 text-left font-semibold text-green-700 text-xs md:text-sm">
                          Loan Request
                        </th>
                        <th className="px-3 md:px-6 py-4 text-left font-semibold text-green-700 hidden xl:table-cell text-xs md:text-sm">
                          Tenure
                        </th>
                        <th className="px-3 md:px-6 py-4 text-left font-semibold text-green-700 hidden md:table-cell text-xs md:text-sm">
                          Request Date
                        </th>
                        <th className="px-3 md:px-6 py-4 text-left font-semibold text-green-700 hidden lg:table-cell text-xs md:text-sm">
                          Loan Required
                        </th>
                        <th className="px-3 md:px-6 py-4 text-left font-semibold text-green-700 text-xs md:text-sm">
                          Status
                        </th>
                        <th className="px-3 md:px-6 py-4 text-left font-semibold text-green-700 text-xs md:text-sm">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedLoanRequests.length > 0 ? (
                        paginatedLoanRequests.map((loan) => (
                          <tr
                            key={loan.id}
                            className="border-b border-gray-200 hover:bg-gray-50 transition"
                          >
                            <td className="px-3 md:px-6 py-4 font-medium text-blue-600 text-xs md:text-sm">
                              {loan.memberId}
                            </td>
                            <td className="px-3 md:px-6 py-4 text-gray-700 hidden sm:table-cell text-xs md:text-sm">
                              {loan.memberName}
                            </td>
                            <td className="px-3 md:px-6 py-4 text-gray-600 hidden md:table-cell text-xs md:text-sm">
                              {loan.mobileNumber}
                            </td>
                            <td className="px-1 md:px-2 py-4 text-gray-600 hidden lg:table-cell text-xs md:text-sm">
                              {loan.membershipDuration === "N/A"
                                ? "N/A"
                                : `${loan.membershipDuration} months`}
                            </td>
                            <td className="px-1 md:px-2 py-4 text-gray-600 hidden xl:table-cell text-xs md:text-sm">
                              {loan.monthlyContribution}
                            </td>
                            <td className="px-4 md:px-6 py-4 font-semibold text-gray-800 text-xs md:text-sm">
                              {loan.loanRequest}
                            </td>
                            <td className="px-3 md:px-5 py-4 text-gray-600 hidden xl:table-cell text-xs md:text-sm">
                              {loan.tenure}
                            </td>
                            <td className="px-3 md:px-5 py-4 text-gray-700 hidden md:table-cell text-xs md:text-sm">
                              {loan.requestDate}
                            </td>
                            <td className="px-3 md:px-6 py-4 text-gray-600 text-xs md:text-sm hidden lg:table-cell">
                              {loan.loanRequired}
                            </td>
                            <td className="px-3 md:px-6 py-4 text-xs md:text-sm">
                              {getStatusBadge(loan.status)}
                            </td>
                            <td className="px-3 md:px-6 py-4 text-xs md:text-sm">
                              <button className="bg-green-600 text-white hover:bg-green-700 font-medium text-xs md:text-sm px-3 py-1 rounded transition">
                                View
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="12"
                            className="px-6 py-8 text-center text-gray-500"
                          >
                            No loan requests found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Footer */}
              <div className="px-4 md:px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-xs md:text-sm text-gray-600">
                  Showing {filteredLoanRequests.length > 0 ? startIndex + 1 : 0}{" "}
                  - {Math.min(endIndex, filteredLoanRequests.length)} of{" "}
                  {filteredLoanRequests.length} loan requests
                </p>

                {/* Pagination Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs md:text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    Prev
                  </button>

                  <span className="px-3 py-1.5 text-xs md:text-sm font-medium text-gray-700">
                    Page {currentPage} / {totalPages || 1}
                  </span>

                  <button
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs md:text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    Next
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

export default LoanRequestsPage;
