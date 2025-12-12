/**
 * Custom Dropdown Component
 * Replaces native select with styled dropdown menu
 * Features: Custom styling, hover effects, border styling
 */

import React, { useState, useRef, useEffect } from "react";
import { IoChevronDown } from "react-icons/io5";

function CustomDropdown({
  name,
  value,
  onChange,
  options,
  placeholder = "Select",
  label,
  error,
  required = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue) => {
    onChange({
      target: {
        name,
        value: optionValue,
      },
    });
    setIsOpen(false);
  };

  const displayValue =
    options.find((opt) => opt.value === value)?.label || placeholder;

  return (
    <div className="relative" ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Dropdown Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full border border-gray-300 rounded-md p-3 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm md:text-base text-left flex justify-between items-center hover:bg-gray-50 transition"
      >
        <span>{displayValue}</span>
        <IoChevronDown
          size={20}
          className={`transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-300 rounded-lg shadow-lg z-50">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={`w-full text-left px-4 py-3 transition-colors ${
                value === option.value
                  ? "bg-green-500 text-white font-medium"
                  : "text-gray-700 hover:bg-green-50"
              } border-b border-gray-200 last:border-b-0`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      {/* Error Message */}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

export default CustomDropdown;
