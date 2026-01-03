<<<<<<< HEAD
import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginModal from "../Auth/LoginModal";

function Hero() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <section className="bg-gradient-to-r from-green-800 to-yellow-500 text-white text-center py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 relative">
        {/* Sign Up Button - Top Right */}
        <button
          onClick={() => setIsLoginOpen(true)}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 hover:scale-105 transition-transform duration-200"
          title="Sign Up"
        >
          <div className="bg-white text-green-800 hover:bg-yellow-300 px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 rounded-full font-semibold text-sm sm:text-base transition-colors shadow-lg">
            Sign Up
          </div>
        </button>

        {/* Logo Centered */}
        <div className="flex justify-center mb-4 sm:mb-5">
          <img
            src="/logo.png"
            alt="Shreejan Logo"
            className="h-20 sm:h-24 md:h-32 w-auto"
          />
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 leading-snug">
          Empowering People. Building Prosperity.
        </h1>

        <p className="max-w-2xl mx-auto mb-6 sm:mb-8 text-xs sm:text-sm md:text-base leading-relaxed px-2">
          Trusted Multi-State Credit Co-operative Society serving members across
          India.
        </p>

        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 max-w-lg mx-auto">
          <Link
            to="/member-form"
            className="bg-white text-green-700 font-semibold py-2 px-3 sm:px-6 md:px-8 rounded hover:bg-gray-100 transition-colors text-center text-xs sm:text-sm md:text-base"
          >
            Join as Member
          </Link>
          <Link
            to="/loan-application"
            className="bg-yellow-400 text-white font-semibold py-2 px-3 sm:px-6 md:px-8 rounded hover:bg-yellow-500 transition-colors text-center text-xs sm:text-sm md:text-base"
          >
            Apply for Loan
          </Link>
        </div>
      </section>

      {/* Login Modal */}
      {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}
    </>
=======
import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-gradient-to-r from-green-800 to-yellow-500 text-white text-center py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
      {/* Logo Centered */}
      <div className="flex justify-center mb-4 sm:mb-5">
        <img
          src="/logo.png"
          alt="Shreejan Logo"
          className="h-20 sm:h-24 md:h-32 w-auto"
        />
      </div>

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 leading-snug">
        Empowering People. Building Prosperity.
      </h1>

      <p className="max-w-2xl mx-auto mb-6 sm:mb-8 text-xs sm:text-sm md:text-base leading-relaxed px-2">
        Trusted Multi-State Credit Co-operative Society serving members across
        India.
      </p>

      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 max-w-lg mx-auto">
        <Link
          to="/member-form"
          className="bg-white text-green-700 font-semibold py-2 px-3 sm:px-6 md:px-8 rounded hover:bg-gray-100 transition-colors text-center text-xs sm:text-sm md:text-base"
        >
          Join as Member
        </Link>
        <Link
          to="/loan-application"
          className="bg-yellow-400 text-white font-semibold py-2 px-3 sm:px-6 md:px-8 rounded hover:bg-yellow-500 transition-colors text-center text-xs sm:text-sm md:text-base"
        >
          Apply for Loan
        </Link>
      </div>
    </section>
>>>>>>> 34f949a57693ffc7e458c65d4c0d489add73950d
  );
}

export default Hero;
