import React, { useState, useEffect } from 'react';
import { fetchCurrentWeather } from '../services/api';
import { calculatePredictions } from '../utils/predictionCalculator';
import { WeatherData, AirQualityPrediction } from '../types';
import WeatherDisplay from '../components/Home/WeatherDisplay';
import HealthRecommendations from '../components/Home/HealthRecommendations';
import AIAssistant from '../components/Home/AIAssistant';

const Home: React.FC = () => {
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

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Mumbai Air Quality</h1>
        <p className="text-gray-600 mb-8">
          Real-time weather data and personalized health recommendations for Powai, Mumbai
        </p>

        {weatherData && prediction ? (
          <>
            <WeatherDisplay weatherData={weatherData} isLoading={isLoading} />
            <HealthRecommendations weatherData={weatherData} prediction={prediction} />
          </>
        ) : (
          <div className="p-6 bg-white rounded-lg shadow-md animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        )}

        <AIAssistant />
      </div>
    </div>
  );
};

export default Home;