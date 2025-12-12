import React, { useEffect, useState } from "react";
import axios from "axios";

function Professional({ formData, onChange, formErrors = {} }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch pincode details when officePin changes
  useEffect(() => {
    if (formData.officePin && formData.officePin.length === 6) {
      fetchPincodeDetails(formData.officePin);
    } else {
      // Clear district and state if pincode is cleared
      if (!formData.officePin) {
        onChange({ target: { name: "officeState", value: "" } });
        onChange({ target: { name: "officeDistrict", value: "" } });
        setError("");
      }
    }
  }, [formData.officePin]);

  // Auto-calculate annual income when monthly income changes
  useEffect(() => {
    if (formData.monthlyIncome) {
      const annual = formData.monthlyIncome * 12;
      onChange({ target: { name: "annualIncome", value: annual.toString() } });
    } else {
      onChange({ target: { name: "annualIncome", value: "" } });
    }
  }, [formData.monthlyIncome]);

  // Fetch pincode details from API
  const fetchPincodeDetails = async (pincode) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      const postOffice = response.data[0]?.PostOffice?.[0];

      if (postOffice) {
        onChange({ target: { name: "officeState", value: postOffice.State } });
        onChange({
          target: { name: "officeDistrict", value: postOffice.District },
        });
        setError("");
      } else {
        onChange({ target: { name: "officeState", value: "" } });
        onChange({ target: { name: "officeDistrict", value: "" } });
        setError("Invalid pincode");
      }
    } catch (err) {
      console.error("API Error:", err);
      onChange({ target: { name: "officeState", value: "" } });
      onChange({ target: { name: "officeDistrict", value: "" } });
      setError("Error fetching pincode data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6 pb-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Professional Details
        </h2>
        <p className="text-gray-600 text-sm">
          Tell us about your occupation and income
        </p>
      </div>

      <div className="space-y-3 lg:space-y-2">
        {/* Occupation dropdown - Full width on mobile, 1/3 on larger */}
        <div className="w-full md:w-1/3">
          <label className="block text-sm lg:text-base font-semibold text-gray-800 mb-2">
            Occupation <span className="text-red-500 font-bold">*</span>
          </label>
          <select
            name="occupation"
            value={formData.occupation || ""}
            onChange={onChange}
            className="w-full border border-gray-300 rounded-md p-3 lg:p-4 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm lg:text-base"
            required
          >
            <option value="">Select occupation</option>
            <option value="Government Job">Government Job</option>
            <option value="Private Job">Private Job</option>
            <option value="Business">Business Man/Self-Employee</option>
            <option value="Farmer">Farmer</option>
            <option value="Student">Student</option>
            <option value="Retired">Retired</option>
            <option value="Other">Other</option>
          </select>
          {formErrors.occupation && (
            <p className="text-xs text-red-600 mt-1 font-medium">
              ⚠️ {formErrors.occupation}
            </p>
          )}

          {/* Show text input when user selects Other */}
          {formData.occupation === "Other" && (
            <input
              type="text"
              name="occupationOther"
              value={formData.occupationOther || ""}
              onChange={onChange}
              placeholder="Please specify"
              className="mt-2 lg:mt-3 w-full border border-gray-300 rounded-md p-3 lg:p-4 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm lg:text-base"
            />
          )}
        </div>

        {/* Employer and Designation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-2 pb-6 border-b border-gray-200">
          <div>
            <label className="block text-sm lg:text-base font-semibold text-gray-800 mb-2">
              Employer / Business Name{" "}
              <span className="text-red-500 font-bold">*</span>
            </label>
            <input
              type="text"
              name="employerName"
              value={formData.employerName || ""}
              onChange={onChange}
              placeholder="Employer or Business name"
              className="w-full border border-gray-300 rounded-md p-3 lg:p-4 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm lg:text-base"
              required
            />
            {formErrors.employerName && (
              <p className="text-xs text-red-600 mt-1 font-medium">
                ⚠️ {formErrors.employerName}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm lg:text-base font-semibold text-gray-800 mb-2">
              Designation / Role{" "}
              <span className="text-red-500 font-bold">*</span>
            </label>
            <input
              type="text"
              name="designation"
              value={formData.designation || ""}
              onChange={onChange}
              placeholder="Your role / designation"
              className="w-full border border-gray-300 rounded-md p-3 lg:p-4 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm lg:text-base"
              required
            />
            {formErrors.designation && (
              <p className="text-xs text-red-600 mt-1 font-medium">
                ⚠️ {formErrors.designation}
              </p>
            )}
          </div>
        </div>

        {/* Monthly and Annual income */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-2 pb-6 border-b border-gray-200">
          <div>
            <label className="block text-sm lg:text-base font-semibold text-gray-800 mb-2">
              Monthly Income (₹){" "}
              <span className="text-red-500 font-bold">*</span>
            </label>
            <input
              type="text"
              name="monthlyIncome"
              value={formData.monthlyIncome || ""}
              onChange={onChange}
              placeholder="Enter monthly income"
              pattern="\d*"
              className="w-full border border-gray-300 rounded-md p-3 lg:p-4 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm lg:text-base"
              required
            />
            {formErrors.monthlyIncome && (
              <p className="text-xs text-red-600 mt-1 font-medium">
                ⚠️ {formErrors.monthlyIncome}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm lg:text-base font-semibold text-gray-800 mb-2">
              Annual Income (₹)
            </label>
            <input
              type="text"
              name="annualIncome"
              value={formData.annualIncome || ""}
              onChange={onChange}
              disabled
              className="w-full border border-gray-300 rounded-md p-3 lg:p-4 bg-gray-100 text-gray-600 cursor-not-allowed text-sm lg:text-base"
            />
          </div>
        </div>

        {/* Office / Workplace Address */}
        <div>
          <label className="block text-sm lg:text-base font-semibold text-gray-800 mb-2">
            Office / Workplace Address{" "}
            <span className="text-red-500 font-bold">*</span>
          </label>

          <textarea
            name="officeAddress"
            value={formData.officeAddress || ""}
            onChange={onChange}
            rows="2"
            placeholder="Address"
            className="w-full mb-4 border border-gray-300 rounded-md p-3 lg:p-4 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm lg:text-base"
          />
          {formErrors.officeAddress && (
            <p className="text-xs text-red-600 mt-2 font-medium">
              ⚠️ {formErrors.officeAddress}
            </p>
          )}

          {/* PIN Code, District, State - Equal Width Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-2">
            {/* PIN Code */}
            <div>
              <label className="block text-sm lg:text-base font-semibold text-gray-800 mb-2">
                PIN Code <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                type="text"
                maxLength="6"
                inputMode="numeric"
                name="officePin"
                value={formData.officePin || ""}
                placeholder="PIN Code"
                onChange={onChange}
                className="w-full border border-gray-300 rounded-md p-3 lg:p-4 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm lg:text-base"
              />
              {loading && (
                <p className="text-xs text-blue-600 mt-1">Loading...</p>
              )}
              {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
              {formErrors.officePin && (
                <p className="text-xs text-red-600 mt-1 font-medium">
                  ⚠️ {formErrors.officePin}
                </p>
              )}
            </div>

            {/* District */}
            <div>
              <label className="block text-sm lg:text-base font-semibold text-gray-800 mb-2">
                District <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                type="text"
                value={formData.officeDistrict || ""}
                placeholder="District"
                readOnly
                className="w-full border border-gray-300 rounded-md p-3 lg:p-4 bg-gray-100 text-gray-600 cursor-not-allowed text-sm lg:text-base"
              />
              {formErrors.officeDistrict && (
                <p className="text-xs text-red-600 mt-1 font-medium">
                  ⚠️ {formErrors.officeDistrict}
                </p>
              )}
            </div>

            {/* State */}
            <div>
              <label className="block text-sm lg:text-base font-semibold text-gray-800 mb-2">
                State <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                type="text"
                value={formData.officeState || ""}
                placeholder="State"
                readOnly
                className="w-full border border-gray-300 rounded-md p-3 lg:p-4 bg-gray-100 text-gray-600 cursor-not-allowed text-sm lg:text-base"
              />
              {formErrors.officeState && (
                <p className="text-xs text-red-600 mt-1 font-medium">
                  ⚠️ {formErrors.officeState}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Professional;
