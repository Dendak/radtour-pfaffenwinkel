import type { TrackPoint, Poi } from '../data/types';
import { haversine } from './gpxParser';

/** Distance threshold (km) above which the rider counts as "off route". */
export const OFF_ROUTE_KM = 0.12;

export interface NearestResult {
  index: number;
  /** Straight-line distance from the position to the nearest track point (km). */
  distToRouteKm: number;
  /** Cumulative distance of that nearest point along the route (km). */
  distAlongKm: number;
}

/** Find the nearest track point to a given position (brute force over the track). */
export function nearestOnRoute(
  points: TrackPoint[],
  lat: number,
  lng: number,
): NearestResult | null {
  if (points.length === 0) return null;
  let best = 0;
  let bestDist = Infinity;
  for (let i = 0; i < points.length; i++) {
    const d = haversine(lat, lng, points[i].lat, points[i].lng);
    if (d < bestDist) {
      bestDist = d;
      best = i;
    }
  }
  return {
    index: best,
    distToRouteKm: bestDist,
    distAlongKm: points[best].dist,
  };
}

/** Cumulative distance along the route at the point nearest to a POI (km). */
export function poiDistanceAlong(points: TrackPoint[], poi: Poi): number {
  const near = nearestOnRoute(points, poi.lat, poi.lng);
  return near ? near.distAlongKm : 0;
}

/** Return POIs ordered by their position along the route, with cumulative km. */
export function poisAlongRoute(
  points: TrackPoint[],
  pois: Poi[],
): Array<{ poi: Poi; distAlongKm: number }> {
  return pois
    .map((poi) => ({ poi, distAlongKm: poiDistanceAlong(points, poi) }))
    .sort((a, b) => a.distAlongKm - b.distAlongKm);
}

export interface NavInfo {
  /** Nearest track point + how far the rider is from the line. */
  nearest: NearestResult;
  offRoute: boolean;
  /** Distance covered along the route so far (km). */
  doneKm: number;
  /** Distance still to ride to the end of the route (km). */
  remainingKm: number;
  /** Next POI ahead on the route, if any. */
  nextPoi: { poi: Poi; distToGoKm: number } | null;
}

/** Compute live navigation info for a position against a route + its POIs. */
export function computeNavigation(
  points: TrackPoint[],
  pois: Poi[],
  lat: number,
  lng: number,
): NavInfo | null {
  const nearest = nearestOnRoute(points, lat, lng);
  if (!nearest) return null;

  const total = points[points.length - 1]?.dist ?? 0;
  const doneKm = nearest.distAlongKm;
  const remainingKm = Math.max(0, total - doneKm);

  // Next POI that lies ahead of the current position along the route.
  const ahead = poisAlongRoute(points, pois)
    .filter((p) => p.distAlongKm > doneKm + 0.05)
    .map((p) => ({ poi: p.poi, distToGoKm: p.distAlongKm - doneKm }));

  return {
    nearest,
    offRoute: nearest.distToRouteKm > OFF_ROUTE_KM,
    doneKm,
    remainingKm,
    nextPoi: ahead[0] ?? null,
  };
}

/** Human-friendly distance: "850 m" below 1 km, otherwise "12.3 km". */
export function formatKm(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)} m`;
  return `${km.toFixed(1)} km`;
}
