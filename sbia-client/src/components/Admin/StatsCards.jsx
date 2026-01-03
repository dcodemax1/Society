import React from "react";
import { FaUsers, FaCheckCircle, FaFileAlt, FaHandshake } from "react-icons/fa";

function StatsCards() {
  const dashboardStats = [
    {
      label: "Total Members",
      value: "3",
      color: "bg-blue-50",
      iconColor: "text-blue-600",
      icon: <FaUsers />,
    },
    {
      label: "Active Members",
      value: "2",
      color: "bg-orange-50",
      iconColor: "text-orange-600",
      icon: <FaCheckCircle />,
    },
    {
      label: "Total Loan Requests",
      value: "3",
      color: "bg-indigo-50",
      iconColor: "text-indigo-600",
      icon: <FaFileAlt />,
    },
    {
      label: "Approved Loans",
      value: "1",
      color: "bg-teal-50",
      iconColor: "text-teal-600",
      icon: <FaHandshake />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {dashboardStats.map((stat, index) => (
        <div
          key={index}
          className={`${stat.color} border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
              <h3 className={`${stat.iconColor} text-4xl font-bold mt-2`}>
                {stat.value}
              </h3>
              <p className="text-gray-600 text-sm mt-2">Last 30 days</p>
            </div>
            <div
              className={`${stat.iconColor} text-5xl opacity-30 transition-opacity duration-300`}
            >
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;
