import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { authApi } from "../services/authApi";
import { tokenService } from "../services/tokenService";

function MemberDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Check if access token exists
        const token = tokenService.getToken();
        if (!token) {
          navigate("/");
          return;
        }

        const response = await authApi.getMe();
        if (response?.data?.success && response?.data?.data) {
          setUser(response.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch user data:", err);
        setError("Failed to load user data");
        // Redirect to login if unauthorized
        if (err?.response?.status === 401) {
          tokenService.clearTokens();
          navigate("/");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      // Clear tokens and redirect
      tokenService.clearTokens();
      navigate("/");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-300 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">Member Dashboard</h1>
            {user && <p className="text-emerald-50 mt-1">{user.email}</p>}
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors font-semibold"
          >
            <MdLogout className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* Welcome Card */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8 border-l-4 border-emerald-600">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome, {user?.email?.split("@")[0]}!
          </h2>
          <p className="text-gray-600">
            You have successfully logged into your account.
          </p>
        </div>

        {/* User Info Card */}
        <div className="bg-white rounded-xl shadow-md p-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              User ID
            </label>
            <p className="text-gray-900 font-medium">{user?.id}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Email
            </label>
            <p className="text-gray-900 font-medium">{user?.email}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Verification Status
            </label>
            <p className="text-gray-900 font-medium">
              {user?.is_verified ? (
                <span className="text-green-600 font-semibold">✓ Verified</span>
              ) : (
                <span className="text-yellow-600 font-semibold">
                  ⚠ Pending Verification
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberDashboard;
