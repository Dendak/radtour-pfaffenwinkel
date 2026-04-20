import { useEffect, useState } from 'react';

export interface WeatherDay {
  date: string;
  tmin: number;
  tmax: number;
  precipSum: number;
  precipProbability: number;
  precipHours: number;
  windMax: number;
  windGusts: number;
  weatherCode: number;
  sunrise: string;
  sunset: string;
}

export type WeatherStatus = 'loading' | 'ok' | 'too_far' | 'error';

export interface WeatherResult {
  data: WeatherDay | null;
  status: WeatherStatus;
  fetchedAt: Date | null;
  daysUntil: number;
}

const REFRESH_MS = 30 * 60 * 1000; // 30 minutes

function daysBetween(iso: string): number {
  const target = new Date(iso + 'T12:00:00');
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - now.getTime()) / (24 * 60 * 60 * 1000));
}

export function useWeather(lat: number, lng: number, date: string | undefined): WeatherResult {
  const [data, setData] = useState<WeatherDay | null>(null);
  const [status, setStatus] = useState<WeatherStatus>('loading');
  const [fetchedAt, setFetchedAt] = useState<Date | null>(null);

  useEffect(() => {
    if (!date) {
      setStatus('ok');
      return;
    }

    let cancelled = false;

    async function load() {
      try {
        const params = new URLSearchParams({
          latitude: lat.toFixed(4),
          longitude: lng.toFixed(4),
          daily:
            'temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,precipitation_hours,weathercode,windspeed_10m_max,windgusts_10m_max,sunrise,sunset',
          timezone: 'Europe/Berlin',
          forecast_days: '16',
        });
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (cancelled) return;

        const idx = (json.daily?.time as string[] | undefined)?.indexOf(date!) ?? -1;
        if (idx === -1) {
          setStatus('too_far');
          setData(null);
          setFetchedAt(new Date());
          return;
        }

        setData({
          date: date!,
          tmax: json.daily.temperature_2m_max[idx],
          tmin: json.daily.temperature_2m_min[idx],
          precipSum: json.daily.precipitation_sum[idx],
          precipProbability: json.daily.precipitation_probability_max[idx],
          precipHours: json.daily.precipitation_hours[idx],
          weatherCode: json.daily.weathercode[idx],
          windMax: json.daily.windspeed_10m_max[idx],
          windGusts: json.daily.windgusts_10m_max[idx],
          sunrise: json.daily.sunrise[idx],
          sunset: json.daily.sunset[idx],
        });
        setStatus('ok');
        setFetchedAt(new Date());
      } catch {
        if (!cancelled) {
          setStatus('error');
          setFetchedAt(new Date());
        }
      }
    }

    setStatus('loading');
    load();

    const intervalId = window.setInterval(load, REFRESH_MS);
    const onVisibility = () => {
      if (!document.hidden) load();
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [lat, lng, date]);

  return {
    data,
    status,
    fetchedAt,
    daysUntil: date ? daysBetween(date) : 0,
  };
}
