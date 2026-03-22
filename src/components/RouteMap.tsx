import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Polyline, CircleMarker, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import type { TrackPoint, Poi, ParsedRoute } from '../data/types';
import 'leaflet/dist/leaflet.css';

// Fix default marker icon issue with bundlers
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface Props {
  allRoutes: ParsedRoute[];
  activeRouteId: string;
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

/** Fit map bounds to the active track */
function FitBounds({ points, activeId }: { points: TrackPoint[]; activeId: string }) {
  const map = useMap();
  const prevId = useRef('');

  useEffect(() => {
    if (points.length > 0 && activeId !== prevId.current) {
      prevId.current = activeId;
      const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lng]));
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [points, activeId, map]);

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

export function RouteMap({ allRoutes, activeRouteId, hoverPoint, pois, focusPoi }: Props) {
  const activeRoute = allRoutes.find((r) => r.config.id === activeRouteId);
  const inactiveRoutes = allRoutes.filter((r) => r.config.id !== activeRouteId);

  return (
    <MapContainer
      center={[47.8, 11.07]}
      zoom={11}
      className="route-map"
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> · <a href="https://www.cyclosm.org">CyclOSM</a>'
        url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
      />

      {activeRoute && <FitBounds points={activeRoute.points} activeId={activeRouteId} />}
      <FocusPoi poi={focusPoi} />

      {/* Inactive routes — thin, transparent */}
      {inactiveRoutes.map((route) => (
        <Polyline
          key={route.config.id}
          positions={route.points.map((p) => [p.lat, p.lng] as [number, number])}
          color={route.config.color}
          weight={3}
          opacity={0.25}
          dashArray="8 6"
        />
      ))}

      {/* Active route — bold */}
      {activeRoute && (
        <Polyline
          positions={activeRoute.points.map((p) => [p.lat, p.lng] as [number, number])}
          color={activeRoute.config.color}
          weight={5}
          opacity={0.9}
        />
      )}

      {/* Start/End marker */}
      {activeRoute && activeRoute.points.length > 0 && (
        <CircleMarker
          center={[activeRoute.points[0].lat, activeRoute.points[0].lng]}
          radius={9}
          fillColor="#22c55e"
          fillOpacity={1}
          color="#fff"
          weight={3}
        >
          <Popup>🏠 Start / Ziel — Peißenberg</Popup>
        </CircleMarker>
      )}

      {/* Hover marker from elevation chart */}
      {hoverPoint && (
        <CircleMarker
          center={[hoverPoint.lat, hoverPoint.lng]}
          radius={8}
          fillColor="#ef4444"
          fillOpacity={1}
          color="#fff"
          weight={3}
        >
          <Popup>
            {Math.round(hoverPoint.ele)} m · {hoverPoint.dist.toFixed(1)} km
          </Popup>
        </CircleMarker>
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
