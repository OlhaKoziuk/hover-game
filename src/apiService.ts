const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getGameModes = async () => {
  try {
    const response = await fetch(`${BASE_URL}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching game modes:", error);
    throw error;
  }
};
