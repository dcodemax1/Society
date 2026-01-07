import React, { useState, useEffect } from "react";
import { FaUsers, FaCheckCircle, FaFileAlt, FaClock } from "react-icons/fa";
import memberApi from "../../services/memberApi";
import api from "../../services/loanApi";

function StatsCards() {
  const [stats, setStats] = useState({
    totalMembers: 0,
    activeMembers: 0,
    totalLoanRequests: 0,
    pendingLoans: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);

        // Fetch members
        const membersResult = await memberApi.fetchAllMembers();
        const totalMembers = (membersResult?.data || []).length;
        const activeMembers = (membersResult?.data || []).filter(
          (m) => m.status === "ACTIVE"
        ).length;

        // Fetch loans
        const loansResponse = await api.get("/loans");
        const loans = loansResponse?.data?.data || [];
        const totalLoanRequests = loans.length;
        const pendingLoans = loans.filter(
          (l) => l.status?.toUpperCase() === "PENDING"
        ).length;

        setStats({
          totalMembers,
          activeMembers,
          totalLoanRequests,
          pendingLoans,
        });
      } catch (error) {
        console.error("Error loading stats:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const dashboardStats = [
    {
      label: "Total Members",
      value: stats.totalMembers.toString(),
      color: "bg-blue-50",
      iconColor: "text-blue-600",
      icon: <FaUsers />,
    },
    {
      label: "Active Members",
      value: stats.activeMembers.toString(),
      color: "bg-orange-50",
      iconColor: "text-orange-600",
      icon: <FaCheckCircle />,
    },
    {
      label: "Total Loan Requests",
      value: stats.totalLoanRequests.toString(),
      color: "bg-indigo-50",
      iconColor: "text-indigo-600",
      icon: <FaFileAlt />,
    },
    {
      label: "Pending Loans",
      value: stats.pendingLoans.toString(),
      color: "bg-yellow-50",
      iconColor: "text-yellow-600",
      icon: <FaClock />,
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
