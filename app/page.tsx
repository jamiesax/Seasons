'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useWeather } from '@/hooks/useWeather';
import { getOutfitRecommendation } from '@/lib/outfitRules';
import { evaluateActivities } from '@/lib/activityRules';
import WeatherIcon, { getWeatherMeta } from '@/components/WeatherIcon';
import Forecast from '@/components/Forecast';
import styles from './page.module.css';

export default function Home() {
  const [query, setQuery] = useState('');
  const { data, loading, error, fetchWeather } = useWeather('Lagos');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      fetchWeather(query);
    }
  };

  const getScoreBadgeClass = (score: string) => {
    switch (score) {
      case 'Excellent':
        return `${styles.badge} ${styles.badgeExcellent}`;
      case 'Moderate':
        return `${styles.badge} ${styles.badgeModerate}`;
      default:
        return `${styles.badge} ${styles.badgePoor}`;
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        
        {/* Header & Search */}
        <header className={styles.header}>
          <div className={styles.logoWrapper}>
            <Image
              src="/seasons-logo.png"
              alt="Seasons Logo"
              width={48}
              height={48}
              priority
              className={styles.logoImage}
            />
          </div>

          <form onSubmit={handleSearch} className={styles.searchForm}>
            <input
              type="text"
              placeholder="Search city..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>
              Search
            </button>
          </form>
        </header>

        {/* Loading / Error States */}
        {loading && <div className={styles.loadingState}>Loading weather insights...</div>}
        {error && <div className={styles.errorState}>{error}</div>}

        {/* Dashboard Content */}
        {!loading && !error && data && (
          <div className={styles.dashboardGrid}>
            
            {/* Current Weather Card */}
            <section className={styles.currentWeatherCard}>
              <div>
                <div className={styles.cardHeader}>
                  <div>
                    <h2 className={styles.locationTitle}>
                      {data.location.name}, {data.location.country}
                    </h2>
                    <p className={styles.weatherLabel}>
                      {getWeatherMeta(data.current.weatherCode).label}
                    </p>
                  </div>
                  <WeatherIcon code={data.current.weatherCode} className={styles.weatherIcon} />
                </div>
                <div className={styles.mainTemperature}>
                  {Math.round(data.current.temperature)}°C
                </div>
                <p className={styles.feelsLike}>
                  Feels like {Math.round(data.current.apparentTemperature)}°C
                </p>
              </div>
              <div className={styles.statsFooter}>
                <div>Wind: {data.current.windSpeed} km/h</div>
                <div>Humidity: {data.current.relativeHumidity}%</div>
              </div>
            </section>

            {/* Smart Outfit Planner */}
            <section className={styles.outfitCard}>
              <h3 className={styles.outfitTitle}>Smart Outfit Recommendation</h3>
              <ul className={styles.outfitList}>
                {getOutfitRecommendation(
                  data.current.temperature,
                  data.current.weatherCode,
                  data.current.windSpeed
                ).map((item, idx) => (
                  <li key={idx} className={styles.outfitItem}>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Outdoor Activity Suitability Index */}
            <section className={styles.activityCard}>
              <h3 className={styles.activityTitle}>Outdoor Activity Suitability</h3>
              <div className={styles.activityGrid}>
                {evaluateActivities(
                  data.current.temperature,
                  data.daily.precipitationProbabilityMax[0],
                  data.current.windSpeed
                ).map((act, idx) => (
                  <div key={idx} className={styles.activityItem}>
                    <div className={styles.activityHeader}>
                      <span className={styles.activityName}>{act.activity}</span>
                      <span className={getScoreBadgeClass(act.score)}>
                        {act.score}
                      </span>
                    </div>
                    <p className={styles.activityReason}>{act.reason}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 7-Day Forecast */}
            <Forecast daily={data.daily} />

          </div>
        )}
      </div>
    </main>
  );
}