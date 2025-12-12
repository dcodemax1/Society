import React from "react";

/**
 * Form Sidebar Component
 * Displays "Empowering People" content on the left side of the form
 * Reusable across all form steps
 */
function FormSidebar() {
  return (
    <div className="hidden lg:block w-96 shrink-0 sticky top-8 ml-6">
      <div className="bg-linear-to-br  rounded-lg p-8 border border-green-200 h-full">
        <div className="mb-6 text-center">
          <img
            src="https://via.placeholder.com/60"
            alt="Shreejan Logo"
            className="h-16 w-auto mb-4 mx-auto"
          />
        </div>
        <h2 className="text-4xl font-bold text-green-900 mb-4 text-center">
          Empowering People.
          <br />
          Building Prosperity.
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-6 text-center">
          Join Shreejan Credit Co-operative Society Ltd.
        </p>
        <p className="text-gray-600 text-base leading-relaxed mb-6 text-center">
          Trusted Multi-State Co-operative Society serving members across India.
          Join over 5,000+ active members and be part of our growing community
          with ₹10 Cr+ deposits managed.
        </p>
        <div className="space-y-4">
          <div className=" rounded-lg p-4 shadow-sm text-center">
            <p className="text-green-700 font-semibold text-3xl">5,000+</p>
            <p className="text-gray-600 text-lg">Active Members</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm text-center">
            <p className="text-green-700 font-semibold text-3xl">₹10 Cr+</p>
            <p className="text-gray-600 text-lg">Deposits Managed</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm text-center">
            <p className="text-green-700 font-semibold text-3xl">10%</p>
            <p className="text-gray-600 text-lg">Annual Returns</p>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-green-200">
          <p className="text-base text-gray-600 leading-relaxed text-center">
            By joining, you become part of a community committed to financial
            independence and mutual growth.
          </p>
        </div>
      </div>
    </div>
  );
}

export default FormSidebar;
