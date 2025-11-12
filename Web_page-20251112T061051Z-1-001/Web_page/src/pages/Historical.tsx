import React from 'react';
import GraphDisplay from '../components/Historical/GraphDisplay';
import ClimateAwareness from '../components/Historical/ClimateAwareness';

const Historical: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">WeatherWise Historical Data</h1>
        <p className="text-gray-600 mb-8">
          Explore historical weather trends and climate change impact for Mumbai
        </p>
        
        <GraphDisplay />
        <ClimateAwareness />
      </div>
    </div>
  );
};

export default Historical;