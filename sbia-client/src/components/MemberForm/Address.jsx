import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

function Address({ formData, onChange, formErrors = {} }) {
  const [loadingPresent, setLoadingPresent] = useState(false);
  const [errorPresent, setErrorPresent] = useState("");
  const [loadingPermanent, setLoadingPermanent] = useState(false);
  const [errorPermanent, setErrorPermanent] = useState("");
  const checkboxTriggered = useRef(false);

  // Fetch pincode details when permanentPinCode changes
  useEffect(() => {
    if (formData.permanentPinCode && formData.permanentPinCode.length === 6) {
      fetchPermanentPincodeDetails(formData.permanentPinCode);
    } else {
      // Clear district and state if pincode is cleared
      if (!formData.permanentPinCode) {
        onChange({ target: { name: "permanentState", value: "" } });
        onChange({ target: { name: "permanentDistrict", value: "" } });
        setErrorPermanent("");
      }
    }
  }, [formData.permanentPinCode]);

  // Fetch permanent pincode details from API
  const fetchPermanentPincodeDetails = async (pincode) => {
    setLoadingPermanent(true);
    setErrorPermanent("");
    try {
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      const postOffice = response.data[0]?.PostOffice?.[0];

      if (postOffice) {
        onChange({
          target: { name: "permanentState", value: postOffice.State },
        });
        onChange({
          target: { name: "permanentDistrict", value: postOffice.District },
        });
        setErrorPermanent("");
      } else {
        onChange({ target: { name: "permanentState", value: "" } });
        onChange({ target: { name: "permanentDistrict", value: "" } });
        setErrorPermanent("Invalid pincode");
      }
    } catch (err) {
      console.error("API Error:", err);
      onChange({ target: { name: "permanentState", value: "" } });
      onChange({ target: { name: "permanentDistrict", value: "" } });
      setErrorPermanent("Error fetching pincode data");
    } finally {
      setLoadingPermanent(false);
    }
  };

  // Fetch pincode details when presentPinCode changes
  useEffect(() => {
    if (formData.presentPinCode && formData.presentPinCode.length === 6) {
      fetchPresentPincodeDetails(formData.presentPinCode);
    } else {
      // Clear district and state if pincode is cleared
      if (!formData.presentPinCode) {
        onChange({ target: { name: "presentState", value: "" } });
        onChange({ target: { name: "presentDistrict", value: "" } });
        setErrorPresent("");
      }
    }
  }, [formData.presentPinCode]);

  // Fetch pincode details from API
  const fetchPresentPincodeDetails = async (pincode) => {
    setLoadingPresent(true);
    setErrorPresent("");
    try {
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      const postOffice = response.data[0]?.PostOffice?.[0];

      if (postOffice) {
        onChange({ target: { name: "presentState", value: postOffice.State } });
        onChange({
          target: { name: "presentDistrict", value: postOffice.District },
        });
        setErrorPresent("");
      } else {
        onChange({ target: { name: "presentState", value: "" } });
        onChange({ target: { name: "presentDistrict", value: "" } });
        setErrorPresent("Invalid pincode");
      }
    } catch (err) {
      console.error("API Error:", err);
      onChange({ target: { name: "presentState", value: "" } });
      onChange({ target: { name: "presentDistrict", value: "" } });
      setErrorPresent("Error fetching pincode data");
    } finally {
      setLoadingPresent(false);
    }
  };

  // Trigger pincode API fetch when checkbox is checked
  useEffect(() => {
    if (
      formData.sameAsPerminent === "yes" &&
      formData.permanentPinCode &&
      !checkboxTriggered.current
    ) {
      fetchPresentPincodeDetails(formData.permanentPinCode);
      checkboxTriggered.current = true;
    } else if (formData.sameAsPerminent !== "yes") {
      checkboxTriggered.current = false;
    }
  }, [formData.sameAsPerminent, formData.permanentPinCode]);

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    onChange({
      target: {
        name: "sameAsPerminent",
        value: checked ? "yes" : "no",
        type: "checkbox",
      },
    });

    if (checked) {
      // Auto-fill address immediately
      onChange({
        target: {
          name: "presentAddress",
          value: formData.permanentAddress || "",
        },
      });
      // Auto-fill PIN code
      onChange({
        target: {
          name: "presentPinCode",
          value: formData.permanentPinCode || "",
        },
      });
      // Pincode fetch will be triggered by useEffect
    } else {
      // Clear present address fields when unchecked
      onChange({
        target: {
          name: "presentAddress",
          value: "",
        },
      });
      onChange({
        target: {
          name: "presentPinCode",
          value: "",
        },
      });
      onChange({
        target: {
          name: "presentDistrict",
          value: "",
        },
      });
      onChange({
        target: {
          name: "presentState",
          value: "",
        },
      });
    }
  };

  return (
    <div className="space-y-3 sm:space-y-6 lg:space-y-2">
      {/* Permanent Address Section */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Permanent Address Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-2 mb-6">
          {/* PIN Code */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
              PIN Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="permanentPinCode"
              value={formData.permanentPinCode || ""}
              onChange={onChange}
              placeholder="Enter PIN Code"
              className="w-full px-2 sm:px-3 py-2 border border-gray-300 rounded text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {loadingPermanent && (
              <p className="text-xs text-blue-600 mt-1">Fetching details...</p>
            )}
            {errorPermanent && (
              <p className="text-xs text-red-600 mt-1">{errorPermanent}</p>
            )}
            {formErrors.permanentPinCode && (
              <p className="text-xs text-red-600 mt-1 font-medium">
                ⚠️ {formErrors.permanentPinCode}
              </p>
            )}
          </div>

          {/* District */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
              District <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.permanentDistrict || ""}
              placeholder="District"
              disabled
              className="w-full px-2 sm:px-3 py-2 border border-gray-300 rounded text-xs sm:text-sm bg-gray-50 cursor-not-allowed"
            />
            {formErrors.permanentDistrict && (
              <p className="text-xs text-red-600 mt-1 font-medium">
                ⚠️ {formErrors.permanentDistrict}
              </p>
            )}
          </div>

          {/* State */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
              State <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.permanentState || ""}
              placeholder="State"
              disabled
              className="w-full px-2 sm:px-3 py-2 border border-gray-300 rounded text-xs sm:text-sm bg-gray-50 cursor-not-allowed"
            />
            {formErrors.permanentState && (
              <p className="text-xs text-red-600 mt-1 font-medium">
                ⚠️ {formErrors.permanentState}
              </p>
            )}
          </div>
        </div>

        {/* Address Textarea - After pincode details */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address <span className="text-red-500">*</span>
          </label>
          <textarea
            name="permanentAddress"
            value={formData.permanentAddress || ""}
            onChange={onChange}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            placeholder="Enter your permanent address"
          />
          {formErrors.permanentAddress && (
            <p className="text-xs text-red-600 mt-1 font-medium">
              ⚠️ {formErrors.permanentAddress}
            </p>
          )}
        </div>
      </div>

      {/* Checkbox */}
      <div className="flex items-center gap-3 py-2 sm:py-4 px-4 sm:px-0 bg-gray-50 sm:bg-transparent rounded-lg sm:rounded-none">
        <input
          type="checkbox"
          id="sameAsPerminent"
          name="sameAsPerminent"
          checked={formData.sameAsPerminent === "yes"}
          onChange={handleCheckboxChange}
          className="w-5 h-5 border border-gray-300 rounded cursor-pointer accent-green-600"
        />
        <label
          htmlFor="sameAsPerminent"
          className="text-sm sm:text-base font-medium text-gray-700 cursor-pointer"
        >
          Present address same as Permanent address
        </label>
      </div>

      {/* Present Address Section */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        {/* Present Address Details - Show pincode first when synced */}
        {formData.sameAsPerminent === "yes" ? (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Present and Communication Address
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-2 mb-6">
              {/* PIN Code */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  PIN Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.presentPinCode || ""}
                  placeholder="PIN Code"
                  disabled
                  className="w-full px-2 sm:px-3 py-2 border border-gray-300 rounded text-xs sm:text-sm bg-gray-50 cursor-not-allowed"
                />
                {loadingPresent && (
                  <p className="text-xs text-blue-600 mt-1">
                    Fetching details...
                  </p>
                )}
                {errorPresent && (
                  <p className="text-xs text-red-600 mt-1">{errorPresent}</p>
                )}
                {formErrors.presentPinCode && (
                  <p className="text-xs text-red-600 mt-1 font-medium">
                    ⚠️ {formErrors.presentPinCode}
                  </p>
                )}
              </div>

              {/* District */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  District <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.presentDistrict || ""}
                  placeholder="District"
                  disabled
                  className="w-full px-2 sm:px-3 py-2 border border-gray-300 rounded text-xs sm:text-sm bg-gray-50 cursor-not-allowed"
                />
                {formErrors.presentDistrict && (
                  <p className="text-xs text-red-600 mt-1 font-medium">
                    ⚠️ {formErrors.presentDistrict}
                  </p>
                )}
              </div>

              {/* State */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  State <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.presentState || ""}
                  placeholder="State"
                  disabled
                  className="w-full px-2 sm:px-3 py-2 border border-gray-300 rounded text-xs sm:text-sm bg-gray-50 cursor-not-allowed"
                />
                {formErrors.presentState && (
                  <p className="text-xs text-red-600 mt-1 font-medium">
                    ⚠️ {formErrors.presentState}
                  </p>
                )}
              </div>
            </div>

            {/* Address Textarea - After pincode details when synced */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea
                name="presentAddress"
                value={formData.presentAddress || ""}
                onChange={onChange}
                rows="3"
                disabled={formData.sameAsPerminent === "yes"}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none disabled:bg-gray-50 disabled:cursor-not-allowed"
                placeholder="Enter your current address"
              />
              {formErrors.presentAddress && (
                <p className="text-xs text-red-600 mt-1 font-medium">
                  ⚠️ {formErrors.presentAddress}
                </p>
              )}
            </div>
          </div>
        ) : (
          /* Show when not synced */
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Present and Communication Address
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-2 mb-6">
              {/* PIN Code */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  PIN Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="presentPinCode"
                  value={formData.presentPinCode || ""}
                  onChange={onChange}
                  placeholder="Enter PIN Code"
                  className="w-full px-2 sm:px-3 py-2 border border-gray-300 rounded text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {loadingPresent && (
                  <p className="text-xs text-blue-600 mt-1">
                    Fetching details...
                  </p>
                )}
                {errorPresent && (
                  <p className="text-xs text-red-600 mt-1">{errorPresent}</p>
                )}
                {formErrors.presentPinCode && (
                  <p className="text-xs text-red-600 mt-1 font-medium">
                    ⚠️ {formErrors.presentPinCode}
                  </p>
                )}
              </div>

              {/* District */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  District <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.presentDistrict || ""}
                  placeholder="District"
                  disabled
                  className="w-full px-2 sm:px-3 py-2 border border-gray-300 rounded text-xs sm:text-sm bg-gray-50 cursor-not-allowed"
                />
                {formErrors.presentDistrict && (
                  <p className="text-xs text-red-600 mt-1 font-medium">
                    ⚠️ {formErrors.presentDistrict}
                  </p>
                )}
              </div>

              {/* State */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  State <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.presentState || ""}
                  placeholder="State"
                  disabled
                  className="w-full px-2 sm:px-3 py-2 border border-gray-300 rounded text-xs sm:text-sm bg-gray-50 cursor-not-allowed"
                />
                {formErrors.presentState && (
                  <p className="text-xs text-red-600 mt-1 font-medium">
                    ⚠️ {formErrors.presentState}
                  </p>
                )}
              </div>
            </div>

            {/* Address Textarea - After pincode details when not synced */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea
                name="presentAddress"
                value={formData.presentAddress || ""}
                onChange={onChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                placeholder="Enter your current address"
              />
              {formErrors.presentAddress && (
                <p className="text-xs text-red-600 mt-1 font-medium">
                  ⚠️ {formErrors.presentAddress}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Address;
