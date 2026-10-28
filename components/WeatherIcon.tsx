import React from 'react';
import {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
  HelpCircle,
} from 'lucide-react';
import styles from './WeatherIcon.module.css';

interface WeatherIconProps {
  code: number;
  className?: string;
}

export function getWeatherMeta(code: number) {
  switch (code) {
    case 0:
      return { Icon: Sun, label: 'Clear Sky', styleClass: styles.sun };
    case 1:
    case 2:
      return { Icon: CloudSun, label: 'Partly Cloudy', styleClass: styles.partlyCloudy };
    case 3:
      return { Icon: Cloud, label: 'Overcast', styleClass: styles.overcast };
    case 45:
    case 48:
      return { Icon: CloudFog, label: 'Foggy', styleClass: styles.foggy };
    case 51:
    case 53:
    case 55:
      return { Icon: CloudDrizzle, label: 'Drizzle', styleClass: styles.drizzle };
    case 61:
    case 63:
    case 65:
    case 80:
    case 81:
    case 82:
      return { Icon: CloudRain, label: 'Rain', styleClass: styles.rain };
    case 71:
    case 73:
    case 75:
    case 85:
    case 86:
      return { Icon: CloudSnow, label: 'Snow', styleClass: styles.snow };
    case 95:
    case 96:
    case 99:
      return { Icon: CloudLightning, label: 'Thunderstorm', styleClass: styles.thunderstorm };
    default:
      return { Icon: HelpCircle, label: 'Unknown', styleClass: styles.unknown };
  }
}

export default function WeatherIcon({ code, className }: WeatherIconProps) {
  const { Icon, styleClass } = getWeatherMeta(code);
  return <Icon className={`${styles.icon} ${styleClass} ${className || ''}`} />;
}