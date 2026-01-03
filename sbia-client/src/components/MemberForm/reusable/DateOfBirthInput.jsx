import React, { useEffect, useState } from "react";

/**
 * Reusable Date of Birth Component
 * Handles DOB selection with auto age calculation
 *
 * Props:
 * - dayFieldName: name for day input (e.g., "dobDay")
 * - monthFieldName: name for month input (e.g., "dobMonth")
 * - yearFieldName: name for year input (e.g., "dobYear")
 * - ageFieldName: name for age display field (optional, e.g., "age")
 * - dayValue, monthValue, yearValue: current values
 * - onDateChange: callback function for field changes - (fieldName, value) => void
 * - onAgeChange: callback function when age is calculated - (age) => void (optional)
 * - label: custom label text (default: "Date of Birth")
 * - isRequired: whether field is required (default: true)
 * - layout: "cols-12" for standard, "cols-4" for 4-equal-width (default: "cols-12")
 * - containerClass: additional container classes
 * - showAge: whether to show age field (default: true)
 */
function DateOfBirthInput({
  dayFieldName = "dobDay",
  monthFieldName = "dobMonth",
  yearFieldName = "dobYear",
  ageFieldName = "age",
  dayValue = "",
  monthValue = "",
  yearValue = "",
  onDateChange = () => {},
  onAgeChange = null,
  label = "Date of Birth",
  isRequired = true,
  layout = "cols-12",
  containerClass = "",
  showAge = true,
  fontSize = "text-xs lg:text-sm",
  paddingSize = "p-2 lg:p-3",
}) {
  const [calculatedAge, setCalculatedAge] = useState("");
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [filteredYears, setFilteredYears] = useState([]);

  // Auto-calculate age from DOB
  useEffect(() => {
    if (dayValue && monthValue && yearValue) {
      const dobDate = new Date(
        `${yearValue}-${String(monthValue).padStart(2, "0")}-${String(
          dayValue
        ).padStart(2, "0")}`
      );
      const today = new Date();
      let age = today.getFullYear() - dobDate.getFullYear();
      const monthDiff = today.getMonth() - dobDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < dobDate.getDate())
      ) {
        age--;
      }

      const calculatedAgeValue = age > 0 ? age : "";
      setCalculatedAge(calculatedAgeValue);

      // Call callback if provided
      if (onAgeChange) {
        onAgeChange(calculatedAgeValue);
      }
    } else {
      setCalculatedAge("");
      if (onAgeChange) {
        onAgeChange("");
      }
    }
  }, [dayValue, monthValue, yearValue, onAgeChange]);

  // Get current year
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 80 }, (_, i) => currentYear - 18 - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Handle year input change with filtering
  const handleYearChange = (value) => {
    // Only allow numbers and max 4 digits
    const numericValue = value.replace(/\D/g, "").slice(0, 4);
    onDateChange(yearFieldName, numericValue);

    // Filter years based on input
    if (numericValue) {
      const filtered = years.filter((year) =>
        year.toString().includes(numericValue)
      );
      setFilteredYears(filtered);
      setShowYearDropdown(true);
    } else {
      setFilteredYears(years);
      setShowYearDropdown(false);
    }
  };

  // Handle year selection from filtered list
  const handleYearSelect = (year) => {
    onDateChange(yearFieldName, year.toString());
    setShowYearDropdown(false);
  };

  const gridClass = layout === "cols-4" ? "grid-cols-4" : "grid-cols-12";

  const colSpanDay = layout === "cols-4" ? "col-span-1" : "col-span-3";
  const colSpanMonth = layout === "cols-4" ? "col-span-1.5" : "col-span-4";
  const colSpanYear = layout === "cols-4" ? "col-span-1" : "col-span-3";
  const colSpanAge = layout === "cols-4" ? "col-span-0.5" : "col-span-2";

  const containerBg =
    layout === "cols-4" ? "bg-gray-50 p-4 lg:p-5 rounded-lg" : "";
  const labelSize =
    layout === "cols-4"
      ? "text-sm lg:text-base font-semibold text-gray-800 mb-4"
      : "text-xs lg:text-sm font-medium text-gray-700 mb-3";
  const sublabelSize =
    layout === "cols-4"
      ? "text-sm lg:text-base font-semibold text-gray-800 mb-2"
      : "text-sm lg:text-base font-semibold text-gray-800 mb-2";
  const inputPadding = layout === "cols-4" ? "p-3 lg:p-4" : "p-2 lg:p-3";
  const gapSize = layout === "cols-4" ? "gap-2 lg:gap-3" : "gap-2 lg:gap-3";

  return (
    <div className={containerClass}>
      <div className={containerBg}>
        <label className={`block ${labelSize} ${isRequired ? "" : ""}`}>
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>

        <div className={`grid ${gridClass} ${gapSize}`}>
          {/* Day */}
          <div className={colSpanDay}>
            <label className={`block ${sublabelSize}`}>Day</label>
            <select
              name={dayFieldName}
              value={dayValue || ""}
              onChange={(e) => onDateChange(dayFieldName, e.target.value)}
              className={`w-full border border-gray-300 rounded-md ${inputPadding} bg-white focus:outline-none focus:ring-2 focus:ring-green-500 ${fontSize}`}
            >
              <option value="">Day</option>
              {days.map((day) => (
                <option key={day} value={day}>
                  {String(day).padStart(2, "0")}
                </option>
              ))}
            </select>
          </div>

          {/* Month */}
          <div className={colSpanMonth}>
            <label className={`block ${sublabelSize}`}>Month</label>
            <select
              name={monthFieldName}
              value={monthValue || ""}
              onChange={(e) => onDateChange(monthFieldName, e.target.value)}
              className={`w-full border border-gray-300 rounded-md ${inputPadding} bg-white focus:outline-none focus:ring-2 focus:ring-green-500 ${fontSize}`}
            >
              <option value="">Month</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {monthNames[month - 1]}
                </option>
              ))}
            </select>
          </div>

          {/* Year - Searchable Input with Filtered Dropdown */}
          <div className={colSpanYear}>
            <label className={`block ${sublabelSize}`}>Year</label>
            <div className="relative">
              <input
                type="text"
                name={yearFieldName}
                value={yearValue || ""}
                onChange={(e) => handleYearChange(e.target.value)}
                onFocus={() => setShowYearDropdown(true)}
                placeholder="Search year"
                maxLength="4"
                inputMode="numeric"
                className={`w-full border border-gray-300 rounded-md ${inputPadding} bg-white focus:outline-none focus:ring-2 focus:ring-green-500 ${fontSize}`}
              />
              {/* Dropdown Icon - Hidden on mobile, visible on sm+ */}
              <svg
                className="hidden sm:block absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600 cursor-pointer"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                onClick={() => setShowYearDropdown(!showYearDropdown)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>

              {/* Filtered Year Dropdown */}
              {showYearDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-20 max-h-40 overflow-y-auto">
                  {(yearValue ? filteredYears : years).length > 0 ? (
                    (yearValue ? filteredYears : years).map((year) => (
                      <div
                        key={year}
                        onClick={() => handleYearSelect(year)}
                        className={`px-3 py-2 cursor-pointer hover:bg-green-100 ${
                          yearValue === year.toString()
                            ? "bg-green-50 font-semibold"
                            : ""
                        }`}
                      >
                        {year}
                      </div>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-gray-500 text-sm">
                      No years found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Age - Show only if showAge is true */}
          {showAge && (
            <div className={colSpanAge}>
              <label className={`block ${sublabelSize}`}>Age</label>
              <input
                type="text"
                value={calculatedAge}
                disabled
                placeholder="Age"
                className={`w-full border border-gray-300 rounded-md ${inputPadding} bg-gray-100 text-gray-600 cursor-not-allowed ${fontSize}`}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DateOfBirthInput;
