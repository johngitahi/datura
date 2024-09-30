import { mockHotels } from './mockHotels'; // Import the mock data
import { BASE_API } from './constants';

const API_URL = `${BASE_API}/hotels`; // Replace with your actual API URL

const fetchHotels = async () => {
  if (import.meta.env.VITE_ENV === 'development') {
    // In development, return mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockHotels);
      }, 1000); // Simulate a network delay
    });
  } else {
    // In production, fetch real data from the API
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  }
};

export default fetchHotels;
