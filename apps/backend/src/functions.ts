import axios from 'axios';

const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://<project-id>.cloudfunctions.net'
    : `http://localhost:8080/${process.env.FIREBASE_PROJECT_ID}/us-central1`;

export const callFunction = async (functionName: string, data: any) => {
  const url = `${BASE_URL}/${functionName}`;
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.error(`Error calling function ${functionName}:`, error);
    throw error;
  }
};
