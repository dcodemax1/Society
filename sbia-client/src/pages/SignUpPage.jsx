import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdLogout, MdRefresh } from "react-icons/md";
import { authApi } from "../../services/authApi";
import { tokenService } from "../../services/tokenService";

function MemberDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await authApi.getMe();
      setUser(response.data);
    } catch (err) {
      setError("Failed to load user data");
      // If unauthorized, redirect to login
      if (err.response?.status === 401) {
        tokenService.clearTokens();
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      tokenService.clearTokens();
      navigate("/login");
    }
  };

  const handleRefreshData = () => {
    fetchUserData();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Welcome</h1>
            <div className="flex gap-3">
              <button
                onClick={handleRefreshData}
                className="flex items-center gap-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                <MdRefresh className="w-5 h-5" />
                Refresh
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                <MdLogout className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {user && (
            <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-200">
              <p className="text-lg text-gray-700">
                <span className="font-semibold">Email:</span> {user.email}
              </p>
              {user.name && (
                <p className="text-lg text-gray-700 mt-2">
                  <span className="font-semibold">Name:</span> {user.name}
                </p>
              )}
              {user.phone && (
                <p className="text-lg text-gray-700 mt-2">
                  <span className="font-semibold">Phone:</span> {user.phone}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <button
                onClick={() => navigate("/member-form")}
                className="w-full text-left bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                Complete Member Form
              </button>
              <button
                onClick={() => navigate("/loan-application")}
                className="w-full text-left bg-green-50 hover:bg-green-100 text-green-700 font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                Apply for Loan
              </button>
              <button
                onClick={() => navigate("/bank-form")}
                className="w-full text-left bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                Update Bank Details
              </button>
            </div>
          </div>

          {/* Account Information */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Account Information
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>
                <span className="font-semibold">Account Status:</span>
                <span className="ml-2 inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                  Active
                </span>
              </p>
              <p>
                <span className="font-semibold">Member Since:</span>
                <span className="ml-2">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A"}
                </span>
              </p>
              <p>
                <span className="font-semibold">Last Login:</span>
                <span className="ml-2">Just now</span>
              </p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8 text-gray-600 text-sm">
          <p>Need help? Contact support at support@sbia.com</p>
        </div>
      </div>
    </div>
  );
}

export default MemberDashboard;
