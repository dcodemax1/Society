import React, { useState, useEffect } from "react";
import usePincodeDetailsApi from "../../../services/pincodeapi";

/**
 * Reusable Pincode Section Component
 * Handles pincode lookup with auto-populated state/district
 *
 * Props:
 * - title: section title (e.g., "Permanent Address")
 * - pincodeFieldName: name for pincode field (e.g., "permanentPinCode")
 * - stateFieldName: name for state field (e.g., "permanentState")
 * - districtFieldName: name for district field (e.g., "permanentDistrict")
 * - pincodeValue: current pincode value
 * - stateValue: current state value
 * - districtValue: current district value
 * - onChange: callback for field changes - (fieldName, value) => void
 * - isRequired: whether fields are required (default: true)
 */
function PincodeSection({
  title = "Address",
  pincodeFieldName = "pinCode",
  stateFieldName = "state",
  districtFieldName = "district",
  pincodeValue = "",
  stateValue = "",
  districtValue = "",
  onChange = () => {},
  isRequired = true,
}) {
  const pincodeApi = usePincodeDetailsApi();

  // Sync pincode data to parent formData
  useEffect(() => {
    onChange({
      target: { name: pincodeFieldName, value: pincodeApi.pin },
    });
    onChange({
      target: { name: stateFieldName, value: pincodeApi.state },
    });
    onChange({
      target: { name: districtFieldName, value: pincodeApi.city },
    });
  }, [pincodeApi.pin, pincodeApi.state, pincodeApi.city]);

  const handlePincodeChange = (e) => {
    const value = e.target.value;
    pincodeApi.setPin(value);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-6">{title}</h3>

      <div className="grid grid-cols-3 gap-4">
        {/* PIN Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            PIN Code {isRequired && <span className="text-red-500">*</span>}
          </label>
          <input
            type="text"
            maxLength="6"
            value={pincodeApi.pin}
            onChange={handlePincodeChange}
            placeholder="Enter Pincode"
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {pincodeApi.loading && (
            <p className="text-xs text-blue-600 mt-1">Loading...</p>
          )}
          {pincodeApi.error && (
            <p className="text-xs text-red-600 mt-1">{pincodeApi.error}</p>
          )}
        </div>

        {/* District/City */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            District {isRequired && <span className="text-red-500">*</span>}
          </label>
          <input
            type="text"
            value={pincodeApi.city}
            placeholder="City"
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-gray-50 cursor-not-allowed"
          />
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State {isRequired && <span className="text-red-500">*</span>}
          </label>
          <input
            type="text"
            value={pincodeApi.state}
            placeholder="State"
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-gray-50 cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
}

export default PincodeSection;
