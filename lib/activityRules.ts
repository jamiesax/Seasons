import { ActivitySuitability } from '@/types/weather';

export function evaluateActivities(
  temp: number,
  precipProb: number,
  windSpeed: number
): ActivitySuitability[] {
  return [
    {
      activity: 'Jogging / Outdoor Running',
      score: temp >= 10 && temp <= 22 && precipProb < 30 ? 'Excellent' : temp > 28 || precipProb > 60 ? 'Poor' : 'Moderate',
      reason: temp > 28 ? 'Too hot for prolonged running.' : precipProb > 60 ? 'High chance of rain.' : 'Ideal temperature and low rain risk.'
    },
    {
      activity: 'Drying Laundry Outside',
      score: precipProb < 20 && windSpeed > 10 && temp > 15 ? 'Excellent' : precipProb > 40 ? 'Poor' : 'Moderate',
      reason: precipProb > 40 ? 'Risk of wet clothes from rain.' : 'Good breeze and dry air.'
    },
    {
      activity: 'Gardening',
      score: temp >= 12 && temp <= 26 && precipProb < 50 && windSpeed < 20 ? 'Excellent' : temp < 5 || windSpeed > 30 ? 'Poor' : 'Moderate',
      reason: windSpeed > 30 ? 'High winds make gardening difficult.' : 'Comfortable weather conditions.'
    }
  ];
}