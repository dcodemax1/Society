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
    default:
      return null;
  }
}

function RecentMembers() {
  const navigate = useNavigate();
  const recentMembers = [
    {
      id: 1,
      name: "Amit Sharma",
      email: "amit@example.com",
      mobile: "+91 98765 43210",
      status: "ACTIVE",
      joinDate: "2025-11-28",
    },
    {
      id: 2,
      name: "Meera Patel",
      email: "meera@example.com",
      mobile: "+91 97234 56789",
      status: "ACTIVE",
      joinDate: "2025-11-27",
    },
    {
      id: 3,
      name: "Ravi Kumar",
      email: "ravi@example.com",
      mobile: "+91 98876 54321",
      status: "ACTIVE",
      joinDate: "2025-11-26",
    },
    {
      id: 4,
      name: "Priya Singh",
      email: "priya@example.com",
      mobile: "+91 99876 54321",
      status: "ACTIVE",
      joinDate: "2025-11-25",
    },
    {
      id: 5,
      name: "Vikram Das",
      email: "vikram@example.com",
      mobile: "+91 96543 21098",
      status: "ACTIVE",
      joinDate: "2025-11-24",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="text-lg md:text-xl font-bold text-gray-800">
          New Members
        </h3>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate("/members");
          }}
          className="text-green-600 hover:text-green-700 font-medium text-sm"
        >
          View all
        </a>
      </div>

      <div className="space-y-2 flex-1">
        {recentMembers.map((member) => (
          <div
            key={member.id}
            className="flex flex-col sm:flex-row items-center justify-between p-2 md:p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition gap-2"
          >
            {/* Member Info - Left Side */}
            <div className="flex items-center gap-3 w-full sm:flex-1">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                <span className="text-green-700 font-bold text-sm md:text-lg">
                  {member.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1 min-w-0 text-center sm:text-left">
                <h4 className="font-semibold text-gray-800 text-sm md:text-base truncate">
                  {member.name}
                </h4>
                <p className="text-xs md:text-sm text-gray-600 truncate">
                  {member.email}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {member.mobile}
                </p>
              </div>
            </div>

            {/* Status and Join Date - Right Side, Horizontally Aligned on Mobile */}
            <div className="flex items-center justify-between gap-4 w-full sm:flex-col sm:items-end sm:gap-2">
              <div>{getStatusBadge(member.status)}</div>
              <p className="text-xs text-gray-500">Joined {member.joinDate}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-center">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate("/members");
          }}
          className="text-green-600 hover:text-green-700 font-medium text-sm"
        >
          View all members →
        </a>
      </div>
    </div>
  );
}

export default RecentMembers;
