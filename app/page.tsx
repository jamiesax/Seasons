'use client';

import { useState } from 'react';
import { useWeather } from '@/hooks/useWeather';
import { getOutfitRecommendation } from '@/lib/outfitRules';
import { evaluateActivities } from '@/lib/activityRules';

export default function Home() {
  const [query, setQuery] = useState('');
  const { data, loading, error, fetchWeather } = useWeather('Lagos');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      fetchWeather(query);
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header & Search */}
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Weather & Lifestyle Dashboard</h1>
          <form onSubmit={handleSearch} className="flex gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search city..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition"
            >
              Search
            </button>
          </form>
        </header>

        {/* Loading / Error States */}
        {loading && <div className="text-center py-12 text-slate-400">Loading weather insights...</div>}
        {error && <div className="p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-200">{error}</div>}

        {/* Dashboard Content */}
        {!loading && !error && data && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Current Weather Card */}
            <section className="bg-slate-800 border border-slate-700 rounded-xl p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-semibold">{data.location.name}, {data.location.country}</h2>
                <div className="text-5xl font-extrabold my-4">{Math.round(data.current.temperature)}°C</div>
                <p className="text-slate-400">Feels like {Math.round(data.current.apparentTemperature)}°C</p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-slate-700 text-sm text-slate-300">
                <div>Wind: {data.current.windSpeed} km/h</div>
                <div>Humidity: {data.current.relativeHumidity}%</div>
              </div>
            </section>

            {/* Smart Outfit Planner */}
            <section className="bg-slate-800 border border-slate-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-amber-400">Smart Outfit Recommendation</h3>
              <ul className="space-y-2">
                {getOutfitRecommendation(
                  data.current.temperature,
                  data.current.weatherCode,
                  data.current.windSpeed
                ).map((item, idx) => (
                  <li key={idx} className="bg-slate-700/50 p-3 rounded-lg text-sm text-slate-200">
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Outdoor Activity Suitability Index */}
            <section className="bg-slate-800 border border-slate-700 rounded-xl p-6 md:col-span-2">
              <h3 className="text-xl font-semibold mb-4 text-emerald-400">Outdoor Activity Suitability</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {evaluateActivities(
                  data.current.temperature,
                  data.daily.precipitationProbabilityMax[0],
                  data.current.windSpeed
                ).map((act, idx) => (
                  <div key={idx} className="bg-slate-700/40 p-4 rounded-lg border border-slate-700">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-slate-200">{act.activity}</span>
                      <span className={`text-xs px-2 py-1 rounded font-bold ${
                        act.score === 'Excellent' ? 'bg-emerald-900 text-emerald-300' :
                        act.score === 'Moderate' ? 'bg-amber-900 text-amber-300' : 'bg-red-900 text-red-300'
                      }`}>
                        {act.score}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">{act.reason}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>
        )}
      </div>
    </main>
  );
}