import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Polyline, CircleMarker, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import type { TrackPoint, Poi } from '../data/types';
import 'leaflet/dist/leaflet.css';

// Fix default marker icon issue with bundlers
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface Props {
  points: TrackPoint[];
  color: string;
  hoverPoint: TrackPoint | null;
  pois: Poi[];
  focusPoi: Poi | null;
}

const poiIcons: Record<string, string> = {
  church: '⛪',
  viewpoint: '🏔️',
  town: '🏘️',
  bridge: '🌉',
  museum: '🎨',
  restaurant: '🍽️',
  gasthaus: '🍺',
  lake: '💧',
};

function createPoiIcon(type: string) {
  return L.divIcon({
    html: `<div class="poi-marker-icon">${poiIcons[type] || '📍'}</div>`,
    className: 'poi-div-icon',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
}

/** Fit map bounds to track whenever points change */
function FitBounds({ points }: { points: TrackPoint[] }) {
  const map = useMap();
  const prevLen = useRef(0);

  useEffect(() => {
    if (points.length > 0 && points.length !== prevLen.current) {
      prevLen.current = points.length;
      const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lng]));
      map.fitBounds(bounds, { padding: [30, 30] });
    }
  }, [points, map]);

  return null;
}

/** Pan to focused POI */
function FocusPoi({ poi }: { poi: Poi | null }) {
  const map = useMap();
  useEffect(() => {
    if (poi) {
      map.setView([poi.lat, poi.lng], 14, { animate: true });
    }
  }, [poi, map]);
  return null;
}

export function RouteMap({ points, color, hoverPoint, pois, focusPoi }: Props) {
  const positions = points.map((p) => [p.lat, p.lng] as [number, number]);

  return (
    <MapContainer
      center={[47.8, 11.07]}
      zoom={11}
      className="route-map"
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FitBounds points={points} />
      <FocusPoi poi={focusPoi} />

      {/* Route polyline */}
      <Polyline positions={positions} color={color} weight={4} opacity={0.8} />

      {/* Start/End marker */}
      {points.length > 0 && (
        <CircleMarker
          center={[points[0].lat, points[0].lng]}
          radius={8}
          fillColor="#22c55e"
          fillOpacity={1}
          color="#fff"
          weight={2}
        >
          <Popup>Start / Ziel</Popup>
        </CircleMarker>
      )}

      {/* Hover marker from elevation chart */}
      {hoverPoint && (
        <CircleMarker
          center={[hoverPoint.lat, hoverPoint.lng]}
          radius={7}
          fillColor={color}
          fillOpacity={1}
          color="#fff"
          weight={3}
        />
      )}

      {/* POI markers */}
      {pois.map((poi) => (
        <Marker key={poi.id} position={[poi.lat, poi.lng]} icon={createPoiIcon(poi.type)}>
          <Popup>
            <div className="poi-popup">
              <strong>{poi.name}</strong>
              <p>{poi.description}</p>
              {poi.mealType && (
                <span className="poi-meal-badge">
                  {poi.mealType === 'lunch' ? '☀️ Mittagessen' : '🌙 Abendessen'}
                </span>
              )}
              {poi.website && (
                <a href={poi.website} target="_blank" rel="noopener noreferrer">
                  Website →
                </a>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
