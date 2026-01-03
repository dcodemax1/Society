import React, { useState, useRef, useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import { FaUsers, FaHandshake } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";

function AdminHeader({ sidebarOpen, setSidebarOpen }) {
  const [profileDropdown, setProfileDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdown(false);
      }
    }

    if (profileDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [profileDropdown]);

  // Disable body scroll when sidebar is open on mobile
  useEffect(() => {
    if (sidebarOpen && window.innerWidth < 1024) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [sidebarOpen]);

  return (
    <div className="bg-white shadow-sm p-4 md:p-6 flex justify-between items-center w-full sticky top-0 z-30">
      {/* Left: Menu Icon and Logo */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Menu Icon - Always visible */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-gray-100 rounded"
        >
          <FiMenu size={24} />
        </button>

        {/* Logo - Always visible on left */}
        <div className="flex items-center gap-2">
          <FaHandshake className="text-green-700 text-2xl" />
          <span className="text-lg md:text-xl font-bold text-green-700 hidden sm:inline">
            Shreejan Grow
          </span>
        </div>
      </div>

      {/* Right side - Notification and Profile */}
      <div className="flex items-center gap-2 md:gap-4 shrink-0">
        {/* Notification Icon */}
        <button className="relative p-2 hover:bg-gray-100 rounded text-gray-700">
          <IoNotifications size={24} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
        </button>

        {/* Admin Name and Profile - Desktop */}
        <div className="relative hidden md:flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-800">Admin User</p>
          </div>
          <button
            onClick={() => setProfileDropdown(!profileDropdown)}
            className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center hover:bg-green-200 transition shrink-0"
          >
            <span className="text-green-700 font-bold text-lg">A</span>
          </button>

          {/* Profile Dropdown - Desktop */}
          {profileDropdown && (
            <div
              ref={dropdownRef}
              className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
            >
              <div className="p-4 border-b border-gray-200">
                <p className="text-sm font-semibold text-gray-800">
                  Admin User
                </p>
                <p className="text-xs text-gray-500">admin@example.com</p>
              </div>
              <button className="w-full text-left px-4 py-3 hover:bg-gray-50 text-gray-700 text-sm flex items-center gap-2 transition">
                <FaUsers size={16} />
                View Profile
              </button>
              <button className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 text-sm flex items-center gap-2 transition border-t border-gray-200 font-medium">
                <MdLogout size={16} />
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Profile Button */}
        <div className="relative md:hidden" ref={dropdownRef}>
          <button
            onClick={() => setProfileDropdown(!profileDropdown)}
            className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center hover:bg-green-200 transition shrink-0"
          >
            <span className="text-green-700 font-bold text-lg">A</span>
          </button>

          {/* Profile Dropdown - Mobile */}
          {profileDropdown && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="p-4 border-b border-gray-200">
                <p className="text-sm font-semibold text-gray-800">
                  Admin User
                </p>
                <p className="text-xs text-gray-500">admin@example.com</p>
              </div>
              <button className="w-full text-left px-4 py-3 hover:bg-gray-50 text-gray-700 text-sm flex items-center gap-2 transition">
                <FaUsers size={16} />
                View Profile
              </button>
              <button className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 text-sm flex items-center gap-2 transition border-t border-gray-200 font-medium">
                <MdLogout size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminHeader;
