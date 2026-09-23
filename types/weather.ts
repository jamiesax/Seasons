export interface WeatherData {
  current: {
    temperature: number;
    apparentTemperature: number;
    relativeHumidity: number;
    windSpeed: number;
    weatherCode: number;
    isDay: number;
  };
  daily: {
    time: string[];
    temperatureMax: number[];
    temperatureMin: number[];
    precipitationProbabilityMax: number[];
    weatherCode: number[];
  };
  location: {
    name: string;
    country: string;
  };
}

export interface ActivitySuitability {
  activity: string;
  score: 'Excellent' | 'Moderate' | 'Poor';
  reason: string;
}