import React, { useState } from "react";
import {
  AdminHeader,
  AdminSidebar,
  StatsCards,
  LoanRequests,
  RecentMembers,
} from "../components/Admin";

function AdminPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      {/* Header - Always Full Width */}
      <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Container */}
      <div className="flex flex-1 relative">
        {/* Mobile Overlay - Disable content when sidebar is open */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 lg:hidden z-30"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Sidebar - Fixed on Mobile, Static on Desktop */}
        <AdminSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main Content - Full Width */}
        <div className="flex-1 w-full transition-all duration-300">
          {/* Dashboard Content */}
          <div className="p-4 md:p-6 space-y-6">
            {/* Stats Cards */}
            <StatsCards />

            {/* Loan Requests and Recent Members - 65/35 Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Loan Requests Section - 65% width */}
              <div className="lg:col-span-8">
                <LoanRequests />
              </div>

              {/* Recent Members Section - 35% width */}
              <div className="lg:col-span-4">
                <RecentMembers />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
