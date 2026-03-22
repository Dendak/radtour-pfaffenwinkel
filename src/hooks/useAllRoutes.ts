import { useState, useEffect } from 'react';
import type { RouteConfig, ParsedRoute, TrackPoint } from '../data/types';
import { parseGpx, computeStats } from '../utils/gpxParser';

const cache = new Map<string, TrackPoint[]>();

export function useAllRoutes(routeConfigs: RouteConfig[]): Map<string, ParsedRoute> {
  const [allRoutes, setAllRoutes] = useState<Map<string, ParsedRoute>>(new Map());

  useEffect(() => {
    let cancelled = false;

    async function loadAll() {
      const results = new Map<string, ParsedRoute>();

      for (const config of routeConfigs) {
        let points: TrackPoint[];
        if (cache.has(config.gpxFile)) {
          points = cache.get(config.gpxFile)!;
        } else {
          const base = import.meta.env.BASE_URL;
          const response = await fetch(`${base}gpx/${config.gpxFile}`);
          const text = await response.text();
          points = parseGpx(text);
          cache.set(config.gpxFile, points);
        }

        const stats = computeStats(points);
        results.set(config.id, { config, points, ...stats });
      }

      if (!cancelled) {
        setAllRoutes(results);
      }
    }

    loadAll();
    return () => { cancelled = true; };
  }, [routeConfigs]);

  return allRoutes;
}
