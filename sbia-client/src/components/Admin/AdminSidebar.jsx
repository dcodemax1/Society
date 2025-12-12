import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MdDashboard, MdPeople, MdNoteAlt, MdHistory } from "react-icons/md";

function AdminSidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: <MdDashboard size={20} />, label: "Dashboard", path: "/admin" },
    { icon: <MdPeople size={20} />, label: "Members", path: "/members" },
    {
      icon: <MdNoteAlt size={20} />,
      label: "Loan Requests",
      path: "/loan-requests",
    },
    {
      icon: <MdPeople size={20} />,
      label: "Member Registration",
      path: "/member-registration",
    },
    {
      icon: <MdNoteAlt size={20} />,
      label: "Pending Approval",
      path: "/pending-approval",
    },
    {
      icon: <MdPeople size={20} />,
      label: "Referral",
      path: "/referral",
    },
    { icon: <MdHistory size={20} />, label: "Audit Log", path: "/audit-log" },
  ];

  return (
    <div
      className={`bg-white border-r border-gray-200 text-gray-800 transition-all duration-300 overflow-hidden fixed lg:static h-screen lg:h-auto z-40 lg:z-auto ${
        sidebarOpen ? "w-64" : "w-0 lg:w-20"
      }`}
    >
      <nav className="mt-0 space-y-2 px-4 pt-6 pb-20 border-t-2 border-gray-300">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <div
              key={index}
              className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer hover:bg-gray-100 hover:shadow-lg hover:scale-105 transition-all duration-300 ${
                isActive
                  ? "bg-green-50 border-l-4 border-green-700 text-green-700"
                  : "text-gray-700"
              }`}
              onClick={() => {
                navigate(item.path);
                // Close sidebar on mobile when item is clicked
                if (window.innerWidth < 1024) {
                  setSidebarOpen(false);
                }
              }}
            >
              {item.icon}
              <span className={`font-medium ${sidebarOpen ? "" : "hidden"}`}>
                {item.label}
              </span>
            </div>
          );
        })}
      </nav>

      <div className="px-4 py-4">{/* Empty space where logout was */}</div>
    </div>
  );
}

export default AdminSidebar;
