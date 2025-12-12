/**
 * Member Lookup & Details Component (Loan Form Step 1)
 * Manual member information entry with auto-calculation of membership duration
 */

import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";

const MemberLookup = forwardRef(function MemberLookup(
  { formData, onChange },
  ref
) {
  const [errors, setErrors] = useState({});

  /**
   * Validate fields and show errors
   */
  const validateFields = () => {
    const newErrors = {};

    if (!formData.memberId || formData.memberId.trim() === "") {
      newErrors.memberId = "Member ID required";
    } else if (formData.memberId.length !== 12) {
      newErrors.memberId = "Member ID should be 12 digits";
    }

    if (!formData.memberName || formData.memberName.trim() === "") {
      newErrors.memberName = "Member Name required";
    }
    if (!formData.fathersName || formData.fathersName.trim() === "") {
      newErrors.fathersName = "Father's / Husband's Name required";
    }
    if (!formData.registeredMobile || formData.registeredMobile.trim() === "") {
      newErrors.registeredMobile = "Registered Mobile required";
    } else if (formData.registeredMobile.length !== 10) {
      newErrors.registeredMobile = "Mobile number should be valid (10 digits)";
    }
    if (
      !formData.registeredAddress ||
      formData.registeredAddress.trim() === ""
    ) {
      newErrors.registeredAddress = "Registered Address required";
    }
    if (
      !formData.monthlyContribution ||
      formData.monthlyContribution.trim() === ""
    ) {
      newErrors.monthlyContribution = "Monthly Contribution required";
    }
    if (!formData.dateOfJoining || formData.dateOfJoining.trim() === "") {
      newErrors.dateOfJoining = "Date of Joining required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Expose validateFields to parent component
  useImperativeHandle(ref, () => ({
    validateFields,
  }));

  /**
   * Handle input change and clear error for that field
   */
  const handleInputChange = (e) => {
    const { name } = e.target;
    onChange(e);

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };
  /**
   * Calculate membership duration in months based on date of joining
   */
  const calculateMembershipDuration = (dateOfJoining) => {
    if (!dateOfJoining) {
      return "";
    }
    const joiningDate = new Date(dateOfJoining);
    const today = new Date();

    let months = (today.getFullYear() - joiningDate.getFullYear()) * 12;
    months += today.getMonth() - joiningDate.getMonth();

    return Math.max(0, months).toString();
  };

  /**
   * Auto-update membership duration when date of joining changes
   */
  useEffect(() => {
    if (formData.dateOfJoining) {
      const calculatedDuration = calculateMembershipDuration(
        formData.dateOfJoining
      );
      if (
        calculatedDuration &&
        calculatedDuration !== formData.membershipDuration
      ) {
        onChange({
          target: {
            name: "membershipDuration",
            value: calculatedDuration,
          },
        });
      }
    }
  }, [formData.dateOfJoining, formData.membershipDuration, onChange]);

  /**
   * Handle mobile number input - only allow 10 numeric digits
   */
  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    onChange({
      target: {
        name: "registeredMobile",
        value: value,
      },
    });
  };

  /**
   * Handle member ID input - only allow 12 numeric digits
   */
  const handleMemberIdChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 12);
    onChange({
      target: {
        name: "memberId",
        value: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Member Details Section */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Member Details
        </h2>

        {/* Member Details - 2 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Member ID (Editable) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Member ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="memberId"
              value={formData.memberId || ""}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 12);
                onChange({
                  target: { name: "memberId", value },
                });
                if (errors.memberId) {
                  setErrors((prev) => ({ ...prev, memberId: "" }));
                }
              }}
              onBlur={validateFields}
              placeholder="e.g., 987654321008"
              maxLength="12"
              className="w-full border border-gray-300 rounded-md p-3 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.memberId && (
              <p className="text-xs text-red-500 mt-1">{errors.memberId}</p>
            )}
          </div>

          {/* Member Name (Editable) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Member Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="memberName"
              value={formData.memberName || ""}
              onChange={handleInputChange}
              onBlur={validateFields}
              placeholder="Enter member name"
              className="w-full border border-gray-300 rounded-md p-3 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.memberName && (
              <p className="text-xs text-red-500 mt-1">{errors.memberName}</p>
            )}
          </div>

          {/* Father's / Husband's Name (Editable) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Father's / Husband's Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="fathersName"
              value={formData.fathersName || ""}
              onChange={handleInputChange}
              onBlur={validateFields}
              placeholder="Enter father's or husband's name"
              className="w-full border border-gray-300 rounded-md p-3 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.fathersName && (
              <p className="text-xs text-red-500 mt-1">{errors.fathersName}</p>
            )}
          </div>

          {/* Registered Mobile (Editable) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Registered Mobile <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="registeredMobile"
              value={formData.registeredMobile || ""}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                onChange({
                  target: { name: "registeredMobile", value },
                });
                if (errors.registeredMobile) {
                  setErrors((prev) => ({ ...prev, registeredMobile: "" }));
                }
              }}
              onBlur={validateFields}
              placeholder="e.g., 9876543210"
              maxLength="10"
              className="w-full border border-gray-300 rounded-md p-3 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.registeredMobile && (
              <p className="text-xs text-red-500 mt-1">
                {errors.registeredMobile}
              </p>
            )}
          </div>

          {/* Registered Address (Editable) - 50% Width */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Registered Address <span className="text-red-500">*</span>
            </label>
            <textarea
              name="registeredAddress"
              value={formData.registeredAddress || ""}
              onChange={handleInputChange}
              onBlur={validateFields}
              placeholder="Enter complete registered address"
              rows="2"
              className="w-full border border-gray-300 rounded-md p-3 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 resize-none overflow-hidden"
            />
            {errors.registeredAddress && (
              <p className="text-xs text-red-500 mt-1">
                {errors.registeredAddress}
              </p>
            )}
          </div>

          {/* Monthly Contribution (Editable) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Contribution (₹) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="monthlyContribution"
              value={formData.monthlyContribution || ""}
              onChange={handleInputChange}
              onBlur={validateFields}
              placeholder="e.g., 500"
              className="w-full border border-gray-300 rounded-md p-3 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.monthlyContribution && (
              <p className="text-xs text-red-500 mt-1">
                {errors.monthlyContribution}
              </p>
            )}
          </div>

          {/* Date of Joining (Editable) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Joining <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="dateOfJoining"
              value={formData.dateOfJoining || ""}
              onChange={handleInputChange}
              onBlur={validateFields}
              className="w-full border border-gray-300 rounded-md p-3 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.dateOfJoining && (
              <p className="text-xs text-red-500 mt-1">
                {errors.dateOfJoining}
              </p>
            )}
          </div>

          {/* Membership Duration (months) (Auto-calculated, Read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Membership Duration (months)
            </label>
            <input
              type="text"
              name="membershipDuration"
              value={formData.membershipDuration || ""}
              readOnly
              className="w-full border border-gray-300 rounded-md p-3 bg-gray-50 text-gray-700 cursor-not-allowed focus:outline-none focus:ring-0 focus:border-gray-300"
            />
            <p className="text-xs text-gray-500 mt-1">
              Auto-calculated based on Date of Joining
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default MemberLookup;
