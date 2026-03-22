import { useState, useEffect } from 'react';
import type { RouteConfig, ParsedRoute, TrackPoint } from '../data/types';
import { parseGpx, computeStats } from '../utils/gpxParser';

const cache = new Map<string, TrackPoint[]>();

export function useGpxData(route: RouteConfig): ParsedRoute | null {
  const [data, setData] = useState<ParsedRoute | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const cacheKey = route.gpxFile;

      let points: TrackPoint[];
      if (cache.has(cacheKey)) {
        points = cache.get(cacheKey)!;
      } else {
        const base = import.meta.env.BASE_URL;
        const response = await fetch(`${base}gpx/${route.gpxFile}`);
        const text = await response.text();
        points = parseGpx(text);
        cache.set(cacheKey, points);
      }

      if (cancelled) return;

      const stats = computeStats(points);
      setData({
        config: route,
        points,
        ...stats,
      });
    }

    load();
    return () => { cancelled = true; };
  }, [route]);

  return data;
}
