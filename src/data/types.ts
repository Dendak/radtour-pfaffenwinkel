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
  date?: string; // ISO YYYY-MM-DD — only for fixed tour days (weather lookup)
}

export interface Accommodation {
  name: string;
  address: string;
  lat: number;
  lng: number;
  phone?: string;
  email?: string;
  website?: string;
  contactPerson?: string;
  checkIn: string;
  checkOut: string;
  confirmed: boolean;
  bicycleGarage?: boolean;
  breakfastIncluded?: boolean;
  prices?: {
    single: number;
    double: number;
    currency: string;
  };
  rooms?: {
    singles: number;
    doubles: number;
    guests: number;
  };
  groupInfo?: string;
  notes?: string;
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
  type: 'church' | 'viewpoint' | 'town' | 'bridge' | 'museum' | 'restaurant' | 'gasthaus' | 'lake' | 'cafe';
  description: string;
  mealType?: 'lunch' | 'cafe';
  website?: string;
  photo?: string;
}
