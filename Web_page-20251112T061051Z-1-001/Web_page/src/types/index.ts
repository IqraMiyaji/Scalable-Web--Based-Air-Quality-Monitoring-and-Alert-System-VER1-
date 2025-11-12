export interface WeatherData {
  city: string;
  temperature: number;
  maxTemperature: number;
  minTemperature: number;
  humidity: number;
  windSpeed: number;
  description: string;
  date: string;
  aqi?: number;
}

export interface AirQualityPrediction {
  pm25: number;
  pm10: number;
  healthRisk: 'Low' | 'Moderate' | 'High' | 'Very High' | 'Hazardous';
  healthTips: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}