const API_BASE_URL = "http://localhost:8000/api/v1";

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

export const submitMemberForm = async (formData) => {
  try {
    const snakeCaseData = camelToSnakeCase(formData);

    const response = await fetch(`${API_BASE_URL}/members`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(snakeCaseData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `API error: ${response.status}`);
    }

    const data = await response.json();

    return {
      success: true,
      data: data.data,
      message: data.message,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      message: error.message,
    };
  }
};

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
    return {
      success: false,
      error: error.message,
      data: [],
    };
  }
};

export const fetchMemberById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/members/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Member does not exist!`);
    }

    const data = await response.json();
    return {
      success: true,
      data: data.data,
      message: data.message,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const getReferrals = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/members/referrals/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch referrals: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      data: data.data,
      message: data.message,
    };
  } catch (error) {
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
  getReferrals,
};
