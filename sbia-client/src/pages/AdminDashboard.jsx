import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdLogout,
  MdDashboard,
  MdPeople,
  MdRequestQuote,
  MdSettings,
} from "react-icons/md";

function AdminDashboard() {
  const navigate = useNavigate();
  const [adminEmail, setAdminEmail] = useState(
    localStorage.getItem("adminEmail") || "admin@shreejan.com"
  );

  const handleLogout = () => {
    localStorage.removeItem("adminEmail");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-yellow-500 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-green-50">{adminEmail}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
          >
            <MdLogout className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Stats Cards */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Total Members
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">1,234</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <MdPeople className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Loan Requests
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">45</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <MdRequestQuote className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Pending Approvals
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">12</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <MdDashboard className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Active Loans
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">89</p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <MdSettings className="w-8 h-8 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <MdPeople className="w-6 h-6 text-blue-600" />
              Member Management
            </h2>
            <div className="space-y-3">
              <button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-2 px-4 rounded-lg transition-all">
                View All Members
              </button>
              <button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-all">
                Approve New Members
              </button>
              <button className="w-full bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-all">
                Export Member List
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <MdRequestQuote className="w-6 h-6 text-yellow-600" />
              Loan Management
            </h2>
            <div className="space-y-3">
              <button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold py-2 px-4 rounded-lg transition-all">
                Review Loan Requests
              </button>
              <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition-all">
                Approve/Reject Loans
              </button>
              <button className="w-full bg-gradient-to-r from-yellow-300 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-gray-900 font-semibold py-2 px-4 rounded-lg transition-all">
                Track Active Loans
              </button>
            </div>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="mt-8 bg-gradient-to-r from-green-50 to-yellow-50 border-2 border-green-200 rounded-xl p-8 text-center">
          <p className="text-gray-700 text-lg">
            Welcome to the Admin Dashboard! This is your centralized hub for
            managing members and loan requests.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
