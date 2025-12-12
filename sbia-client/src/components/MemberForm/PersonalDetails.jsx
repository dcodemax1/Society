import React from "react";
import { DateOfBirthInput } from "./reusable";

function PersonalDetails({ formData, onChange, formErrors = {} }) {
  // Handle WhatsApp same as mobile
  const handleWhatsAppSameAsChange = (e) => {
    if (e.target.checked) {
      onChange({
        target: {
          name: "whatsappNumber",
          value: formData.mobile || "",
        },
      });
    } else {
      // Clear WhatsApp number when unchecked
      onChange({
        target: {
          name: "whatsappNumber",
          value: "",
        },
      });
    }
  };

  // Handle DOB dropdown changes
  const handleDOBChange = (field, value) => {
    onChange({
      target: {
        name: field,
        value: value,
      },
    });

    // Calculate new DOB string with the updated field value
    let newDobYear = field === "dobYear" ? value : formData.dobYear;
    let newDobMonth = field === "dobMonth" ? value : formData.dobMonth;
    let newDobDay = field === "dobDay" ? value : formData.dobDay;

    if (newDobYear && newDobMonth && newDobDay) {
      const newDOB = `${newDobYear}-${String(newDobMonth).padStart(
        2,
        "0"
      )}-${String(newDobDay).padStart(2, "0")}`;
      onChange({
        target: {
          name: "dob",
          value: newDOB,
        },
      });
    }
  };

  // Handle mobile input
  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    onChange({
      target: {
        name: e.target.name,
        value: value,
      },
    });
  };

  return (
    <div>
      <div className="mb-6 pb-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Personal Details
        </h2>
        <p className="text-gray-600 text-sm">
          Please provide your basic information
        </p>
      </div>

      <div className="space-y-3 lg:space-y-4">
        {/* Row 1: Full Name (50%) & Email (50%) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
          <div>
            <label className="block text-sm lg:text-base font-semibold text-gray-800 mb-2">
              Full Name <span className="text-red-500 font-bold">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName || ""}
              onChange={onChange}
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded-md p-3 lg:p-4 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm lg:text-base"
              required
            />
            {formErrors.fullName && (
              <p className="text-xs text-red-600 mt-1 font-medium">
                ⚠️ {formErrors.fullName}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm lg:text-base font-semibold text-gray-800 mb-2">
              Email ID <span className="text-red-500 font-bold">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={onChange}
              placeholder="Enter your email address"
              className="w-full border border-gray-300 rounded-md p-3 lg:p-4 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm lg:text-base"
              required
            />
            {formErrors.email && (
              <p className="text-xs text-red-600 mt-1 font-medium">
                ⚠️ {formErrors.email}
              </p>
            )}
          </div>
        </div>

        {/* Row 2: Father's Name (50%) & Mother's Name (50%) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
          <div>
            <label className="block text-sm lg:text-base font-semibold text-gray-800 mb-2">
              Father's Name
            </label>
            <input
              type="text"
              name="fatherName"
              value={formData.fatherName || ""}
              onChange={onChange}
              placeholder="Enter father's name"
              className="w-full border border-gray-300 rounded-md p-3 lg:p-4 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm lg:text-base"
            />
            {formErrors.fatherName && (
              <p className="text-xs text-red-600 mt-1 font-medium">
                ⚠️ {formErrors.fatherName}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm lg:text-base font-semibold text-gray-800 mb-2">
              Mother's Name
            </label>
            <input
              type="text"
              name="motherName"
              value={formData.motherName || ""}
              onChange={onChange}
              placeholder="Enter mother's name"
              className="w-full border border-gray-300 rounded-md p-3 lg:p-4 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm lg:text-base"
            />
            {formErrors.motherName && (
              <p className="text-xs text-red-600 mt-1 font-medium">
                ⚠️ {formErrors.motherName}
              </p>
            )}
          </div>
        </div>

        {/* Row 3: Mobile Number, Checkbox, WhatsApp Number - Mobile Responsive */}
        <div className="space-y-3 sm:space-y-2">
          {/* Mobile Number - full width on mobile */}
          <div className="sm:hidden">
            <label className="block text-xs sm:text-sm lg:text-base font-semibold text-gray-800 ms-2 sm:ms-3 lg:ms-3 mb-2">
              Mobile Number <span className="text-red-500 font-bold">*</span>
            </label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile || ""}
              onChange={handleMobileChange}
              placeholder="Mobile"
              maxLength="10"
              className="w-full border border-gray-300 rounded-md p-2 sm:p-3 lg:p-4 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 text-xs sm:text-sm lg:text-base"
              required
            />
            {formErrors.mobile && (
              <p className="text-xs text-red-600 mt-1 font-medium">
                ⚠️ {formErrors.mobile}
              </p>
            )}
          </div>

          {/* Checkbox - Show on mobile only, between mobile and whatsapp */}
          <div className="sm:hidden">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                id="whatsappSame"
                onChange={handleWhatsAppSameAsChange}
                className="w-4 h-4 accent-green-600 rounded"
              />
              <span className="text-xs text-gray-700 font-medium">Same as</span>
            </label>
          </div>

          {/* WhatsApp Number - full width on mobile */}
          <div className="sm:hidden">
            <label className="block text-xs sm:text-sm lg:text-base font-semibold text-gray-800 me-2 sm:me-3 lg:me-3 mb-2">
              WhatsApp Number <span className="text-red-500 font-bold">*</span>
            </label>
            <input
              type="tel"
              name="whatsappNumber"
              value={formData.whatsappNumber || ""}
              onChange={handleMobileChange}
              placeholder="WhatsApp"
              maxLength="10"
              className="w-full border border-gray-300 rounded-md p-2 sm:p-3 lg:p-4 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 text-xs sm:text-sm lg:text-base"
              required
            />
            {formErrors.whatsappNumber && (
              <p className="text-xs text-red-600 mt-1 font-medium">
                ⚠️ {formErrors.whatsappNumber}
              </p>
            )}
          </div>

          {/* Desktop Layout - Labels row (hidden on mobile) */}
          <div className="hidden sm:grid grid-cols-1 sm:grid-cols-12 gap-1 lg:gap-1">
            <div className="sm:col-span-5">
              <label className="block text-xs sm:text-sm lg:text-base font-semibold text-gray-800 ms-2 sm:ms-3 lg:ms-3">
                Mobile Number <span className="text-red-500 font-bold">*</span>
              </label>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs sm:text-sm lg:text-base font-semibold text-gray-800 text-center">
                Same as
              </label>
            </div>
            <div className="sm:col-span-5">
              <label className="block text-xs sm:text-sm lg:text-base font-semibold text-gray-800 me-2 sm:me-3 lg:me-3">
                WhatsApp Number{" "}
                <span className="text-red-500 font-bold">*</span>
              </label>
            </div>
          </div>

          {/* Desktop Layout - Inputs row (hidden on mobile) */}
          <div className="hidden sm:grid grid-cols-1 sm:grid-cols-12 gap-0.5 sm:gap-0.5 lg:gap-1">
            {/* Mobile Number - 5 cols on sm+, full on mobile */}
            <div className="sm:col-span-5 ps-2 sm:ps-2 lg:ps-3 pe-0.5 sm:pe-0.5">
              <input
                type="tel"
                name="mobile"
                value={formData.mobile || ""}
                onChange={handleMobileChange}
                placeholder="Mobile"
                maxLength="10"
                className="w-full border border-gray-300 rounded-md p-2 sm:p-3 lg:p-4 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 text-xs sm:text-sm lg:text-base"
                required
              />
              {formErrors.mobile && (
                <p className="text-xs text-red-600 mt-1 font-medium">
                  ⚠️ {formErrors.mobile}
                </p>
              )}
            </div>

            {/* Checkbox - 2 cols on sm+, auto on mobile - CENTERED */}
            <div className="sm:col-span-2 flex items-center justify-center px-0.5 sm:px-0">
              <input
                type="checkbox"
                id="whatsappSame"
                onChange={handleWhatsAppSameAsChange}
                className="w-4 sm:w-4 h-4 sm:h-4 accent-green-600 rounded cursor-pointer flex-shrink-0"
              />
            </div>

            {/* WhatsApp Number - 5 cols on sm+, full on mobile */}
            <div className="sm:col-span-5 pe-2 sm:pe-2 lg:pe-3 ps-0.5 sm:ps-0.5">
              <input
                type="tel"
                name="whatsappNumber"
                value={formData.whatsappNumber || ""}
                onChange={handleMobileChange}
                placeholder="WhatsApp"
                maxLength="10"
                className="w-full border border-gray-300 rounded-md p-2 sm:p-3 lg:p-4 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 text-xs sm:text-sm lg:text-base"
                required
              />
              {formErrors.whatsappNumber && (
                <p className="text-xs text-red-600 mt-1 font-medium">
                  ⚠️ {formErrors.whatsappNumber}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Row 4: Gender (30%) & Date of Birth (70%) - SAME ROW */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 lg:gap-4">
          {/* Gender - Left 30% (3.6 cols) */}
          <div className="md:col-span-4 bg-gray-50 p-3 lg:p-4 rounded-lg">
            <label className="block text-sm lg:text-base font-semibold text-gray-800 mb-3 md:mb-5">
              Gender <span className="text-red-500 font-bold">*</span>
            </label>
            <div className="flex flex-row md:flex-col gap-3 md:gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={onChange}
                  className="w-4 h-4 accent-green-600"
                />
                <span className="text-gray-800 text-sm lg:text-base font-medium">
                  Male
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={onChange}
                  className="w-4 h-4 accent-green-600"
                />
                <span className="text-gray-800 text-sm lg:text-base font-medium">
                  Female
                </span>
              </label>
            </div>
            {formErrors.gender && (
              <p className="text-xs text-red-600 mt-2 font-medium">
                ⚠️ {formErrors.gender}
              </p>
            )}
          </div>

          {/* Date of Birth - Right 70% (8.4 cols) */}
          <div className="md:col-span-8">
            <div>
              <DateOfBirthInput
                dayFieldName="dobDay"
                monthFieldName="dobMonth"
                yearFieldName="dobYear"
                dayValue={formData.dobDay}
                monthValue={formData.dobMonth}
                yearValue={formData.dobYear}
                onDateChange={handleDOBChange}
                label="Date of Birth"
                isRequired={true}
                layout="cols-3"
                containerClass="bg-gray-50 p-3 lg:p-4 rounded-lg"
                showAge={true}
              />
              {(formErrors.dobDay ||
                formErrors.dobMonth ||
                formErrors.dobYear) && (
                <p className="text-xs text-red-600 mt-2 font-medium">
                  ⚠️ Date of Birth is required
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Row 5: Religion (50%) & Nationality (50%) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
          <div className="bg-gray-50 p-3 lg:p-4 rounded-lg">
            <label className="block text-sm lg:text-base font-semibold text-gray-800 mb-2">
              Religion <span className="text-red-500 font-bold">*</span>
            </label>
            <select
              name="religion"
              value={formData.religion || ""}
              onChange={onChange}
              className="w-full border border-gray-300 rounded-md p-3 lg:p-4 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm lg:text-base"
              required
            >
              <option value="">Select religion</option>
              <option value="Hindu">Hindu</option>
              <option value="Muslim">Muslim</option>
              <option value="Christian">Christian</option>
              <option value="Sikh">Sikh</option>
              <option value="Jain">Jain</option>
              <option value="Buddhist">Buddhist</option>
              <option value="Other">Other</option>
            </select>
            {formErrors.religion && (
              <p className="text-xs text-red-600 mt-1 font-medium">
                ⚠️ {formErrors.religion}
              </p>
            )}
          </div>

          <div className="bg-gray-50 p-3 lg:p-4 rounded-lg">
            <label className="block text-sm lg:text-base font-semibold text-gray-800 mb-2">
              Nationality
            </label>
            <input
              type="text"
              name="nationality"
              value={formData.nationality || "Indian"}
              disabled
              className="w-full border border-gray-300 rounded-md p-3 lg:p-4 bg-gray-100 text-gray-600 cursor-not-allowed text-sm lg:text-base"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalDetails;
