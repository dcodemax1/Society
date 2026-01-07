import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loanApi } from "../../services/loanApi";

function getStatusBadge(status) {
  const normalizedStatus = status?.toUpperCase() || "";

  switch (normalizedStatus) {
    case "PENDING":
      return (
        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-semibold whitespace-nowrap">
          PENDING
        </span>
      );
    case "APPROVED":
      return (
        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold whitespace-nowrap">
          APPROVED
        </span>
      );
    case "REJECTED":
      return (
        <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold whitespace-nowrap">
          REJECTED
        </span>
      );
    case "DISBURSED":
      return (
        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold whitespace-nowrap">
          DISBURSED
        </span>
      );
    case "CLOSED":
      return (
        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-semibold whitespace-nowrap">
          CLOSED
        </span>
      );
    case "DEFAULTED":
      return (
        <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold whitespace-nowrap">
          DEFAULTED
        </span>
      );
    default:
      return (
        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-semibold whitespace-nowrap">
          {normalizedStatus || "UNKNOWN"}
        </span>
      );
  }
}

function LoanRequests() {
  const navigate = useNavigate();
  const [loanRequests, setLoanRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLoanRequests = async () => {
      try {
        setLoading(true);
        const result = await loanApi.getAllLoans();

        console.log("Loan API response:", result);
        console.log("Response data:", result?.data);

        if (result?.data?.success && result?.data?.data) {
          console.log("Loans received:", result.data.data);
          // Sort by loan_request_date (newest first) and take only 5
          const sorted = (result.data.data || [])
            .sort((a, b) => {
              const dateA = new Date(a.loan_request_date);
              const dateB = new Date(b.loan_request_date);
              return dateB - dateA;
            })
            .slice(0, 5)
            .map((loan) => ({
              id: loan.loan_id || Math.random(),
              memberId: loan.member_id || "N/A",
              memberName: loan.member_name || "N/A",
              loanRequest: loan.loan_amount
                ? `₹${loan.loan_amount.toLocaleString("en-IN")}`
                : "N/A",
              loanRequired: loan.when_loan_required || "N/A",
              status: loan.status?.toLowerCase() || "pending",
            }));

          console.log("Mapped loans:", sorted);
          setLoanRequests(sorted);
        } else {
          console.log("No success or data in response");
          setLoanRequests([]);
        }
      } catch (error) {
        console.error("Error loading loan requests:", error);
        if (error.response?.status === 401) {
          setError("You are not authorized. Please log in as admin.");
        } else {
          setError(error.message || "Failed to load loan requests");
        }
        setLoanRequests([]);
      } finally {
        setLoading(false);
      }
    };

    loadLoanRequests();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="text-lg md:text-xl font-bold text-gray-800">
          Loan Requests
        </h3>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate("/loan-requests");
          }}
          className="text-green-600 hover:text-green-700 font-medium text-sm"
        >
          View all
        </a>
      </div>

      <div className="overflow-x-auto flex-1">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-500">Loading loan requests...</div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-red-500">{error}</div>
          </div>
        ) : loanRequests.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-500">No loan requests found</div>
          </div>
        ) : (
          <table className="w-full text-xs md:text-sm">
            <thead>
              <tr className="border-b border-green-300 bg-green-50">
                <th className="px-3 md:px-6 py-3 text-left font-semibold text-green-700">
                  Member ID
                </th>
                <th className="px-3 md:px-6 py-3 text-left font-semibold text-green-700 hidden sm:table-cell">
                  Member Name
                </th>
                <th className="px-3 md:px-6 py-3 text-left font-semibold text-green-700">
                  Loan Request
                </th>
                <th className="px-3 md:px-6 py-3 text-left font-semibold text-green-700 hidden lg:table-cell">
                  Loan Required
                </th>
                <th className="px-3 md:px-6 py-3 text-left font-semibold text-green-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {loanRequests.map((loan) => (
                <tr
                  key={loan.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="px-3 md:px-6 py-3 font-medium text-blue-600 text-xs md:text-sm">
                    {loan.memberId}
                  </td>
                  <td className="px-3 md:px-6 py-3 text-gray-700 hidden sm:table-cell text-xs md:text-sm">
                    {loan.memberName}
                  </td>
                  <td className="px-3 md:px-6 py-3 font-semibold text-gray-800 text-xs md:text-sm">
                    {loan.loanRequest}
                  </td>
                  <td className="px-3 md:px-6 py-3 text-gray-600 text-xs md:text-sm hidden lg:table-cell">
                    {loan.loanRequired}
                  </td>
                  <td className="px-3 md:px-6 py-7">
                    {getStatusBadge(loan.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <p className="text-xs md:text-sm text-gray-600">
          Showing latest {loanRequests.length} loan requests
        </p>
      </div>
    </div>
  );
}

export default LoanRequests;
