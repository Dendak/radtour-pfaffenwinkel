import { useEffect, useRef, useState } from 'react';

export interface PointSeries {
  time: string[];
  precip: number[];
  prob: number[];
  code: number[];
  temp: number[];
  wind: number[];
}

export type RouteWeatherStatus = 'idle' | 'loading' | 'ok' | 'error' | 'too_far';

interface OMHourly {
  time?: string[];
  precipitation?: number[];
  precipitation_probability?: number[];
  weathercode?: number[];
  temperature_2m?: number[];
  windspeed_10m?: number[];
}
interface OMResponse {
  hourly?: OMHourly;
}

/**
 * Fetch the hourly forecast for several points along a route in one request.
 * `coords` must be a stable reference (memoise in the caller) to avoid refetch.
 */
export function useRouteWeather(
  coords: Array<{ lat: number; lng: number }>,
  date: string | undefined,
): { series: PointSeries[] | null; status: RouteWeatherStatus } {
  const [series, setSeries] = useState<PointSeries[] | null>(null);
  const [status, setStatus] = useState<RouteWeatherStatus>('idle');

  // Stable key so callers can pass a freshly-built coords array each render
  // without triggering a refetch; the actual coords are read via a ref.
  const coordsKey = coords.map((c) => `${c.lat.toFixed(3)},${c.lng.toFixed(3)}`).join('|');
  const coordsRef = useRef(coords);
  coordsRef.current = coords;

  useEffect(() => {
    const coords = coordsRef.current;
    if (!date || coords.length === 0) {
      setStatus('idle');
      setSeries(null);
      return;
    }
    let cancelled = false;

    async function load() {
      setStatus('loading');
      try {
        const params = new URLSearchParams({
          latitude: coords.map((c) => c.lat.toFixed(4)).join(','),
          longitude: coords.map((c) => c.lng.toFixed(4)).join(','),
          hourly:
            'precipitation,precipitation_probability,weathercode,temperature_2m,windspeed_10m',
          timezone: 'Europe/Berlin',
          start_date: date!,
          end_date: date!,
        });
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
        if (!res.ok) throw new Error(String(res.status));
        const json: OMResponse | OMResponse[] = await res.json();
        if (cancelled) return;

        const arr = Array.isArray(json) ? json : [json];
        const out: PointSeries[] = arr.map((d) => ({
          time: d.hourly?.time ?? [],
          precip: d.hourly?.precipitation ?? [],
          prob: d.hourly?.precipitation_probability ?? [],
          code: d.hourly?.weathercode ?? [],
          temp: d.hourly?.temperature_2m ?? [],
          wind: d.hourly?.windspeed_10m ?? [],
        }));

        if (out.length === 0 || out[0].time.length === 0) {
          setStatus('too_far');
          setSeries(null);
          return;
        }
        setSeries(out);
        setStatus('ok');
      } catch {
        if (!cancelled) {
          setStatus('error');
          setSeries(null);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [coordsKey, date]);

  return { series, status };
}
