import React, { useState, useEffect } from 'react';
import { fetchCurrentWeather } from '../services/api';
import { calculatePredictions } from '../utils/predictionCalculator';
import { WeatherData, AirQualityPrediction } from '../types';
import PredictionDisplay from '../components/Forecast/PredictionDisplay';
import HealthTips from '../components/Forecast/HealthTips';

const Forecast: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [prediction, setPrediction] = useState<AirQualityPrediction | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCurrentWeather();
        setWeatherData(data);
        
        // Calculate predictions based on weather data
        const predictionData = calculatePredictions(data);
        setPrediction(predictionData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading || !weatherData || !prediction) {
    return (
      <div className="min-h-screen bg-gray-100 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Air Quality Forecast</h1>
          <p className="text-gray-600 mb-8">
            PM2.5 and PM10 predictions based on current weather parameters for Mumbai (Powai)
          </p>
          
          <div className="p-6 bg-white rounded-lg shadow-md animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 bg-gray-100 rounded-lg">
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="p-6 border rounded-lg">
                  <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-10 bg-gray-300 rounded w-1/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Air Quality Forecast</h1>
        <p className="text-gray-600 mb-8">
          PM2.5 and PM10 predictions based on current weather parameters for Mumbai (Powai)
        </p>
        
        <PredictionDisplay weatherData={weatherData} prediction={prediction} />
        <HealthTips prediction={prediction} />
      </div>
    </div>
  );
};

export default Forecast;