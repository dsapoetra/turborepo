// src/apis/userApi.ts

// Base URL for API calls (update this if your backend runs on a different URL or port)
const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3005/api';

/**
 * Fetch user data by ID.
 * 
 * @param id - The ID of the user to fetch.
 * @returns The user data as a JSON object.
 * @throws Error if the request fails or the user is not found.
 */
export const fetchUserData = async (id: string): Promise<{ id: string; name: string; age: number; email?: string }> => {
  try {
    const response = await fetch(`${BASE_URL}/fetch-user-data/${id}`);

    if (!response.ok) {
      throw new Error('User not found or failed to fetch user data.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * Update user data by ID.
 */
export const updateUserData = async (id: string, data: object) => {
  const response = await fetch(`${BASE_URL}/update-user-data/${id}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  });

  if (!response.ok) {
      throw new Error('Failed to update user data');
  }

  return response.json();
};


