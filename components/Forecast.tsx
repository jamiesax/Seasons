import WeatherIcon, { getWeatherMeta } from '@/components/WeatherIcon';
import styles from './Forecast.module.css';

interface ForecastProps {
  daily: {
    time: string[];
    temperatureMax: number[];
    temperatureMin: number[];
    precipitationProbabilityMax: number[];
    weatherCode: number[];
  };
}

export default function Forecast({ daily }: ForecastProps) {
  const formatDay = (dateStr: string, index: number) => {
    if (index === 0) return 'Today';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <section className={styles.card}>
      <h3 className={styles.title}>7-Day Forecast</h3>
      <div className={styles.grid}>
        {daily.time.map((timeStr, index) => {
          const maxTemp = Math.round(daily.temperatureMax[index]);
          const minTemp = Math.round(daily.temperatureMin[index]);
          const code = daily.weatherCode[index];
          const precip = daily.precipitationProbabilityMax[index];

          return (
            <div key={timeStr} className={styles.dayCard}>
              <span className={styles.dayName}>{formatDay(timeStr, index)}</span>
              <div className={styles.iconWrapper}>
                <WeatherIcon code={code} className={styles.forecastIcon} />
              </div>
              <span className={styles.weatherLabel}>
                {getWeatherMeta(code).label}
              </span>
              <div className={styles.tempSection}>
                <div className={styles.maxTemp}>{maxTemp}°C</div>
                <div className={styles.minTemp}>{minTemp}°C</div>
                {precip > 20 && (
                  <div className={styles.precip}>💧 {precip}%</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}