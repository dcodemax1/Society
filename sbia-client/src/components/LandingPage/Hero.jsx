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
  );
}

export default Hero;
