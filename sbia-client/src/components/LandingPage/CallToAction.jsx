import React from "react";
import { Link } from "react-router-dom";

function CallToAction() {
  return (
    <section
      id="join"
      className="bg-green-700 text-white py-12 sm:py-16 md:py-20 text-center px-4 sm:px-6 md:px-8"
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 sm:mb-4 leading-snug">
        Join hands with Shreejan Credit
      </h2>
      <p className="mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">
        Let's Grow Together and build a financially secure community.
      </p>
      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 max-w-lg mx-auto">
        <Link
          to="/member-form"
          className="bg-yellow-400 text-white font-semibold py-2 px-3 sm:px-6 md:px-8 rounded hover:bg-yellow-500 transition-colors text-center text-xs sm:text-sm md:text-base"
        >
          Become a Member
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

export default CallToAction;
