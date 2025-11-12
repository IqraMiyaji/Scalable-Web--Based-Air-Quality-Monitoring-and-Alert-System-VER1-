import axios from 'axios';
import { WeatherData } from '../types';

// NOTE: In a production environment, API keys should be kept secure
// and requests should be proxied through a backend service
const API_BASE_URL_CURRENT = 'https://mausam.imd.gov.in/api/current_wx_api.php';
const API_BASE_URL_CITY = 'https://city.imd.gov.in/api/cityweather_loc.php';
const MUMBAI_POWAI_ID = '42182'; // ID for Mumbai Powai

export const fetchCurrentWeather = async (): Promise<WeatherData> => {
  try {
    // NOTE: The APIs require authentication (401 error)
    // To fix this issue, we would need to:
    // 1. Obtain proper API keys for the weather services
    // 2. Set up a backend proxy to make authenticated requests
    // 
    // For now, we'll use mock data instead of making the API calls
    
    return getMockWeatherData();
    
    /* Original code commented out due to authentication issues
    const currentResponse = await axios.get(`${API_BASE_URL_CURRENT}`);
    const cityResponse = await axios.get(`${API_BASE_URL_CITY}?id=${MUMBAI_POWAI_ID}`);
    
    // For demo purposes, we'll use mock data if the API is unavailable
    // In a real application, you would handle this differently
    if (!currentResponse.data || !cityResponse.data) {
      return getMockWeatherData();
    }

    // Process and combine the response data
    // This would need to be adjusted based on the actual API response format
    const weatherData: WeatherData = {
      city: 'Mumbai (Powai)',
      temperature: extractTemperature(cityResponse.data),
      maxTemperature: extractMaxTemperature(cityResponse.data),
      minTemperature: extractMinTemperature(cityResponse.data),
      humidity: extractHumidity(cityResponse.data),
      windSpeed: extractWindSpeed(cityResponse.data),
      description: extractWeatherDescription(cityResponse.data),
      date: new Date().toLocaleDateString(),
      aqi: extractAQI(currentResponse.data)
    };

    return weatherData;
    */
  } catch (error) {
    console.error('Error fetching weather data:', error);
    // Return mock data if API request fails
    return getMockWeatherData();
  }
};

// These extraction functions would need to be implemented based on the actual API response format
const extractTemperature = (data: any): number => {
  // Parse the temperature from the API response
  // This is a placeholder and should be replaced with actual implementation
  try {
    return parseFloat(data?.temperature || '28');
  } catch {
    return 28; // Default value if parsing fails
  }
};

const extractMaxTemperature = (data: any): number => {
  try {
    return parseFloat(data?.max_temp || '32');
  } catch {
    return 32; // Default value
  }
};

const extractMinTemperature = (data: any): number => {
  try {
    return parseFloat(data?.min_temp || '24');
  } catch {
    return 24; // Default value
  }
};

const extractHumidity = (data: any): number => {
  try {
    return parseFloat(data?.humidity || '65');
  } catch {
    return 65; // Default value
  }
};

const extractWindSpeed = (data: any): number => {
  try {
    return parseFloat(data?.wind_speed || '10');
  } catch {
    return 10; // Default value
  }
};

const extractWeatherDescription = (data: any): string => {
  return data?.description || 'Partly Cloudy';
};

const extractAQI = (data: any): number => {
  try {
    return parseFloat(data?.aqi || '120');
  } catch {
    return 120; // Default value
  }
};

// Mock data for development or when API is unavailable
const getMockWeatherData = (): WeatherData => {
  // Generate random temperature between 30-35°C
  const temp = Math.floor(Math.random() * (35 - 24) + 24);
  
  return {
    city: 'Mumbai (Powai)',
    temperature: temp,
    maxTemperature: temp + Math.floor(Math.random() * 4), // 0-4°C higher than current
    minTemperature: temp - Math.floor(Math.random() * 4), // 0-4°C lower than current
    humidity: Math.floor(Math.random() * (85 - 55) + 55), // 55-85%
    windSpeed: Math.floor(Math.random() * (15 - 5) + 5), // 5-15 km/h
    description: ['Partly Cloudy', 'Mostly Sunny', 'Cloudy', 'Humid', 'Clear Sky'][Math.floor(Math.random() * 5)],
    date: new Date().toLocaleDateString(),
    aqi: Math.floor(Math.random() * (200 - 50) + 50) // AQI between 50-200
  };
};c