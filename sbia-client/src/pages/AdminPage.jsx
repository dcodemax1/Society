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
      <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-1 relative">
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 lg:hidden z-30"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        <AdminSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="flex-1 w-full transition-all duration-300">
          <div className="p-4 md:p-6 space-y-6">
            <StatsCards />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8">
                <LoanRequests />
              </div>

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
