export const API_BASE_URL = 'https://fleet.intelligentso.com/api/v1';

export async function fetchVehicles() {
  try {
    const response = await fetch(`${API_BASE_URL}/vehicle`);
    if (!response.ok) {
      throw new Error('Failed to fetch vehicles');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    throw error;
  }
}