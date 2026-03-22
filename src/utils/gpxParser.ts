import type { TrackPoint } from '../data/types';

/** Haversine distance in km between two lat/lng points */
function haversine(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/** Parse GPX XML string into TrackPoint array with cumulative distance */
export function parseGpx(gpxString: string): TrackPoint[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(gpxString, 'application/xml');
  const trkpts = doc.getElementsByTagName('trkpt');
  const points: TrackPoint[] = [];
  let cumDist = 0;

  for (let i = 0; i < trkpts.length; i++) {
    const pt = trkpts[i];
    const lat = parseFloat(pt.getAttribute('lat') || '0');
    const lng = parseFloat(pt.getAttribute('lon') || '0');
    const eleEl = pt.getElementsByTagName('ele')[0];
    const ele = eleEl ? parseFloat(eleEl.textContent || '0') : 0;

    if (i > 0) {
      cumDist += haversine(points[i - 1].lat, points[i - 1].lng, lat, lng);
    }

    points.push({ lat, lng, ele, dist: cumDist });
  }

  return points;
}

/** Compute route statistics from track points */
export function computeStats(points: TrackPoint[]) {
  let elevationGain = 0;
  let elevationLoss = 0;
  let minElevation = Infinity;
  let maxElevation = -Infinity;

  // Use a simple smoothing window to reduce GPS noise in elevation
  for (let i = 1; i < points.length; i++) {
    const diff = points[i].ele - points[i - 1].ele;
    if (diff > 0.5) elevationGain += diff;  // threshold to reduce noise
    if (diff < -0.5) elevationLoss += Math.abs(diff);
    if (points[i].ele < minElevation) minElevation = points[i].ele;
    if (points[i].ele > maxElevation) maxElevation = points[i].ele;
  }

  if (points.length > 0) {
    if (points[0].ele < minElevation) minElevation = points[0].ele;
    if (points[0].ele > maxElevation) maxElevation = points[0].ele;
  }

  const totalDistance = points.length > 0 ? points[points.length - 1].dist : 0;

  // Estimate duration at ~17 km/h average cycling speed
  const hours = totalDistance / 17;
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  const estimatedDuration = `${h}:${m.toString().padStart(2, '0')} Std.`;

  return {
    totalDistance: Math.round(totalDistance * 10) / 10,
    elevationGain: Math.round(elevationGain),
    elevationLoss: Math.round(elevationLoss),
    minElevation: Math.round(minElevation),
    maxElevation: Math.round(maxElevation),
    estimatedDuration,
  };
}

/** Downsample points array to approximately n points for chart rendering */
export function downsample(points: TrackPoint[], n: number): TrackPoint[] {
  if (points.length <= n) return points;
  const step = Math.ceil(points.length / n);
  const result: TrackPoint[] = [];
  for (let i = 0; i < points.length; i += step) {
    result.push(points[i]);
  }
  // Always include the last point
  if (result[result.length - 1] !== points[points.length - 1]) {
    result.push(points[points.length - 1]);
  }
  return result;
}
