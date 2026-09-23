export function getOutfitRecommendation(temp: number, weatherCode: number, windSpeed: number): string[] {
  const recommendations: string[] = [];

  // Temperature-based rules
  if (temp < 10) {
    recommendations.push("Heavy winter coat, thermal layers, scarf, and warm gloves.");
  } else if (temp >= 10 && temp < 18) {
    recommendations.push("Light jacket, sweater, or fleece with long pants.");
  } else if (temp >= 18 && temp < 25) {
    recommendations.push("T-shirt, long sleeve top, and jeans or chinos.");
  } else {
    recommendations.push("Breathable t-shirt, shorts, or light dress with sunglasses.");
  }

  // Rain / Snow rules (WMO Weather Interpretation Codes)
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(weatherCode)) {
    recommendations.push("Bring a waterproof jacket or umbrella.");
  } else if ([71, 73, 75, 85, 86].includes(weatherCode)) {
    recommendations.push("Wear insulated waterproof boots.");
  }

  // Wind speed rules
  if (windSpeed > 25) {
    recommendations.push("Opt for a windbreaker or snug-fitting outer layer.");
  }

  return recommendations;
}