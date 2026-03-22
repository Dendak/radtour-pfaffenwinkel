export interface TrackPoint {
  lat: number;
  lng: number;
  ele: number;
  dist: number; // cumulative distance in km
}

export interface RouteConfig {
  id: string;
  day: string;
  shortDay: string;
  title: string;
  gpxFile: string;
  color: string;
  description: string;
}

export interface ParsedRoute {
  config: RouteConfig;
  points: TrackPoint[];
  totalDistance: number;
  elevationGain: number;
  elevationLoss: number;
  minElevation: number;
  maxElevation: number;
  estimatedDuration: string;
}

export interface Poi {
  id: string;
  routeId: string;
  lat: number;
  lng: number;
  name: string;
  type: 'church' | 'viewpoint' | 'town' | 'bridge' | 'museum' | 'restaurant' | 'gasthaus' | 'lake';
  description: string;
  mealType?: 'lunch' | 'dinner' | 'both';
  website?: string;
}
