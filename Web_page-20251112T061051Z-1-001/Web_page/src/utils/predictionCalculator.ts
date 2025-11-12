import { WeatherData, AirQualityPrediction } from '../types';

export const calculatePredictions = (weatherData: WeatherData): AirQualityPrediction => {
  // Calculate PM2.5 using the provided formula
  const pm25 = 
    3.3150 * weatherData.maxTemperature - 
    4.6039 * weatherData.minTemperature - 
    2.5933 * weatherData.windSpeed + 
    48.1042;
  
  // Calculate PM10 using the provided formula
  const pm10 = 
    7.6420 * weatherData.maxTemperature - 
    6.9687 * weatherData.minTemperature - 
    4.1669 * weatherData.windSpeed + 
    15.7419;

  // Round to 2 decimal places
  const pm25Value = Math.max(0, parseFloat(pm25.toFixed(2)));
  const pm10Value = Math.max(0, parseFloat(pm10.toFixed(2)));

  // Determine health risk level based on PM2.5 value
  let healthRisk: 'Low' | 'Moderate' | 'High' | 'Very High' | 'Hazardous';
  let healthTips: string[] = [];

  if (pm25Value <= 12) {
    healthRisk = 'Low';
    healthTips = [
      'Air quality is good, ideal for outdoor activities',
      'Continue regular outdoor exercise',
      'Enjoy the fresh air'
    ];
  } else if (pm25Value <= 35.4) {
    healthRisk = 'Moderate';
    healthTips = [
      'Unusually sensitive individuals should consider reducing prolonged outdoor exertion',
      'Keep windows closed during high traffic periods',
      'Stay hydrated when outdoors'
    ];
  } else if (pm25Value <= 55.4) {
    healthRisk = 'High';
    healthTips = [
      'People with respiratory or heart conditions should limit outdoor activity',
      'Consider wearing a mask if you need to be outside for extended periods',
      'Keep indoor air clean with air purifiers if available'
    ];
  } else if (pm25Value <= 150.4) {
    healthRisk = 'Very High';
    healthTips = [
      'Everyone should avoid prolonged outdoor exertion',
      'Use air purifiers indoors',
      'Keep windows closed and use recirculated air in vehicles',
      'Wear N95 masks if going outside is necessary'
    ];
  } else {
    healthRisk = 'Hazardous';
    healthTips = [
      'Everyone should avoid all outdoor activities',
      'Stay indoors with purified air if possible',
      'Wear proper respiratory protection if outdoor activity is unavoidable',
      'Check on elderly neighbors and those with respiratory conditions',
      'Follow local health advisory instructions'
    ];
  }

  return {
    pm25: pm25Value,
    pm10: pm10Value,
    healthRisk,
    healthTips
  };
};