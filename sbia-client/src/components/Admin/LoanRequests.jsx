import React from "react";
import { useNavigate } from "react-router-dom";

function getStatusBadge(status) {
  switch (status) {
    case "ACTIVE":
      return (
        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium whitespace-nowrap">
          ACTIVE
        </span>
      );
    case "INACTIVE":
      return (
        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium whitespace-nowrap">
          INACTIVE
        </span>
      );
    case "pending":
      return (
        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-semibold whitespace-nowrap">
          pending
        </span>
      );
    case "approved":
      return (
        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold whitespace-nowrap">
          approved
        </span>
      );
    default:
      return null;
  }
}

function LoanRequests() {
  const navigate = useNavigate();

  const loanRequests = [
    {
      id: "LR-1001",
      memberId: "987654321008",
      memberName: "Amit Sharma",
      mobileNumber: "9876543210",
      membershipDuration: 12,
      monthlyContribution: "₹1,000",
      loanRequest: "₹50,000",
      tenure: "12 months",
      requestDate: "20-11-2025",
      loanRequired: "15-12-2025",
      status: "pending",
    },
    {
      id: "LR-1002",
      memberId: "976543210927",
      memberName: "Meera Patel",
      mobileNumber: "9765432109",
      membershipDuration: 24,
      monthlyContribution: "₹1,500",
      loanRequest: "₹1,50,000",
      tenure: "18 months",
      requestDate: "10-11-2025",
      loanRequired: "10-01-2026",
      status: "approved",
    },
    {
      id: "LR-1003",
      memberId: "965432109804",
      memberName: "Ravi Kumar",
      mobileNumber: "9654321098",
      membershipDuration: 8,
      monthlyContribution: "₹800",
      loanRequest: "₹30,000",
      tenure: "6 months",
      requestDate: "28-11-2025",
      loanRequired: "20-12-2025",
      status: "pending",
    },
    {
      id: "LR-1004",
      memberId: "954321098711",
      memberName: "Priya Singh",
      mobileNumber: "9543210987",
      membershipDuration: 18,
      monthlyContribution: "₹1,200",
      loanRequest: "₹75,000",
      tenure: "15 months",
      requestDate: "25-11-2025",
      loanRequired: "25-01-2026",
      status: "approved",
    },
    {
      id: "LR-1005",
      memberId: "943210987615",
      memberName: "Vikram Das",
      mobileNumber: "9432109876",
      membershipDuration: 30,
      monthlyContribution: "₹2,000",
      loanRequest: "₹2,00,000",
      tenure: "24 months",
      requestDate: "15-11-2025",
      loanRequired: "15-02-2026",
      status: "pending",
    },
  ];

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
              <th className="px-3 md:px-6 py-3 text-left font-semibold text-green-700 hidden md:table-cell">
                Request Date
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
                <td className="px-3 md:px-6 py-3 text-gray-700 hidden md:table-cell text-xs md:text-sm">
                  {loan.requestDate}
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
