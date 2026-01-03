import React from "react";
import { MdClose } from "react-icons/md";
import AdminLogin from "./AdminLogin";

function LoginModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 md:p-4 z-50 overflow-y-auto">
      <div className="w-full max-w-7xl">
        {/* Close Button for Mobile */}
        <button
          onClick={onClose}
          className="md:hidden fixed top-4 right-4 flex items-center justify-center p-2 bg-white/90 hover:bg-white rounded-lg transition-all duration-200 shadow-lg cursor-pointer z-50"
        >
          <MdClose className="w-6 h-6 text-gray-800" />
        </button>
        <AdminLogin onClose={onClose} />
      </div>
    </div>
  );
}

export default LoginModal;

