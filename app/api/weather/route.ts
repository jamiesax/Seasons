import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city') || 'Lagos';

  try {
    // 1. Geocoding request
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
    );
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      return NextResponse.json({ error: 'City not found' }, { status: 404 });
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    // 2. Weather data request
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`
    );
    const weatherData = await weatherRes.json();

    const formattedData = {
      current: {
        temperature: weatherData.current.temperature_2m,
        apparentTemperature: weatherData.current.apparent_temperature,
        relativeHumidity: weatherData.current.relative_humidity_2m,
        windSpeed: weatherData.current.wind_speed_10m,
        weatherCode: weatherData.current.weather_code,
        isDay: weatherData.current.is_day,
      },
      daily: {
        time: weatherData.daily.time,
        temperatureMax: weatherData.daily.temperature_2m_max,
        temperatureMin: weatherData.daily.temperature_2m_min,
        precipitationProbabilityMax: weatherData.daily.precipitation_probability_max,
        weatherCode: weatherData.daily.weather_code,
      },
      location: { name, country },
    };

    return NextResponse.json(formattedData);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 });
  }
}