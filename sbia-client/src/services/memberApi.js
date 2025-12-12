/**
 * Member API Service
 * Handles API calls for member registration
 * Converts camelCase (JS) to snake_case (API) and vice versa
 */

const API_BASE_URL = "http://localhost:8000/api/v1";

/**
 * Convert camelCase object keys to snake_case
 */
const camelToSnakeCase = (obj) => {
  const result = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const snakeKey = key.replace(
        /[A-Z]/g,
        (letter) => `_${letter.toLowerCase()}`
      );
      result[snakeKey] = obj[key];
    }
  }
  return result;
};

/**
 * Convert snake_case object keys to camelCase
 */
const snakeToCamelCase = (obj) => {
  const result = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) =>
        letter.toUpperCase()
      );
      result[camelKey] = obj[key];
    }
  }
  return result;
};

/**
 * Submit member form data to API
 * @param {Object} formData - Form data in camelCase
 * @returns {Promise<Object>} - API response with saved member data
 */
export const submitMemberForm = async (formData) => {
  try {
    // Convert camelCase to snake_case for API
    const snakeCaseData = camelToSnakeCase(formData);

    console.log("🔄 Converting camelCase to snake_case...");
    console.log("Before (camelCase):", formData);
    console.log("After (snake_case):", snakeCaseData);

    const response = await fetch(`${API_BASE_URL}/members`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(snakeCaseData),
    });

    console.log("📡 API Response Status:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error(" API Error Response:", errorData);
      throw new Error(errorData.message || `API error: ${response.status}`);
    }

    const data = await response.json();
    console.log(" API Success Response:", data);

    // Convert response back to camelCase if needed
    return {
      success: true,
      data: data.data,
      message: data.message,
    };
  } catch (error) {
    console.error("Member form submission error:", error);
    return {
      success: false,
      error: error.message,
      message: error.message,
    };
  }
};

/**
 * Fetch all members from API
 * @returns {Promise<Array>} - Array of members with snake_case keys
 */
export const fetchAllMembers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/members`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch members: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      data: data.data || [],
      message: data.message,
    };
  } catch (error) {
    console.error("Fetch members error:", error);
    return {
      success: false,
      error: error.message,
      data: [],
    };
  }
};

/**
 * Fetch single member by ID
 * @param {number} id - Member ID
 * @returns {Promise<Object>} - Member data
 */
export const fetchMemberById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/members/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch member: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      data: data.data,
      message: data.message,
    };
  } catch (error) {
    console.error("Fetch member by ID error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export default {
  submitMemberForm,
  fetchAllMembers,
  fetchMemberById,
};
