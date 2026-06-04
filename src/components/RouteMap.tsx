import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Polyline, CircleMarker, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import type { TrackPoint, Poi, ParsedRoute } from '../data/types';
import type { GeoPosition } from '../hooks/useGeolocation';
import { accommodation } from '../data/accommodation';
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
  geoPosition: GeoPosition | null;
  tracking: boolean;
  gpsSupported: boolean;
  onToggleTracking: () => void;
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
  cafe: '☕',
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

/** GPS toggle button overlaid on the map. */
function GpsControl({
  tracking,
  supported,
  onToggle,
}: {
  tracking: boolean;
  supported: boolean;
  onToggle: () => void;
}) {
  if (!supported) return null;
  return (
    <div className="gps-button-container">
      <button
        className={`gps-button ${tracking ? 'active' : ''}`}
        onClick={onToggle}
        title={tracking ? 'Standort-Tracking stoppen' : 'Meinen Standort anzeigen'}
      >
        📍
      </button>
    </div>
  );
}

/**
 * Centre + zoom onto the live position once when tracking (re)starts, then
 * leave the map alone — the user can pan/zoom freely and the dot keeps
 * updating without the map snapping back on every GPS fix.
 */
function RecenterOnGps({ position, tracking }: { position: GeoPosition | null; tracking: boolean }) {
  const map = useMap();
  const centeredRef = useRef(false);

  // Arm a fresh centring each time tracking is turned on.
  useEffect(() => {
    if (tracking) centeredRef.current = false;
  }, [tracking]);

  // Recentre exactly once, on the first fix after tracking starts.
  useEffect(() => {
    if (tracking && position && !centeredRef.current) {
      centeredRef.current = true;
      map.setView([position.lat, position.lng], Math.max(map.getZoom(), 15), { animate: true });
    }
  }, [position, tracking, map]);

  return null;
}

export function RouteMap({
  allRoutes,
  activeRouteId,
  hoverPoint,
  pois,
  focusPoi,
  geoPosition,
  tracking,
  gpsSupported,
  onToggleTracking,
}: Props) {
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
      <RecenterOnGps position={geoPosition} tracking={tracking} />
      <GpsControl tracking={tracking} supported={gpsSupported} onToggle={onToggleTracking} />

      {/* Inactive routes — white outline + colored dashed line */}
      {inactiveRoutes.map((route) => (
        <Polyline
          key={`bg-${route.config.id}`}
          positions={route.points.map((p) => [p.lat, p.lng] as [number, number])}
          color="#ffffff"
          weight={6}
          opacity={0.7}
        />
      ))}
      {inactiveRoutes.map((route) => (
        <Polyline
          key={route.config.id}
          positions={route.points.map((p) => [p.lat, p.lng] as [number, number])}
          color={route.config.color}
          weight={4}
          opacity={0.7}
          dashArray="12 8"
        />
      ))}

      {/* Active route — bold with white outline */}
      {activeRoute && (
        <>
          <Polyline
            positions={activeRoute.points.map((p) => [p.lat, p.lng] as [number, number])}
            color="#ffffff"
            weight={10}
            opacity={0.8}
          />
          <Polyline
            positions={activeRoute.points.map((p) => [p.lat, p.lng] as [number, number])}
            color={activeRoute.config.color}
            weight={5}
            opacity={1}
          />
        </>
      )}

      {/* Accommodation / Start / Ziel */}
      <CircleMarker
        center={[accommodation.lat, accommodation.lng]}
        radius={10}
        fillColor="#22c55e"
        fillOpacity={1}
        color="#fff"
        weight={3}
      >
        <Popup>
          <div className="poi-popup accommodation-popup">
            <strong>🏠 {accommodation.name}</strong>
            {accommodation.confirmed && (
              <span className="accommodation-badge">✓ Reservierung bestätigt</span>
            )}
            <p>{accommodation.address}</p>
            {accommodation.rooms && (
              <p>
                🛏️ {accommodation.rooms.singles}× EZ + {accommodation.rooms.doubles}× DZ
                {' · '}{accommodation.rooms.guests} Gäste
              </p>
            )}
            {accommodation.prices && (
              <p>
                💶 EZ {accommodation.prices.single} € · DZ {accommodation.prices.double} € / Nacht
              </p>
            )}
            {(accommodation.bicycleGarage || accommodation.breakfastIncluded) && (
              <p>
                {accommodation.bicycleGarage && '🚲 Fahrradgarage'}
                {accommodation.bicycleGarage && accommodation.breakfastIncluded && ' · '}
                {accommodation.breakfastIncluded && '🥐 Frühstück inkl.'}
              </p>
            )}
            {accommodation.groupInfo && (
              <p style={{ fontSize: '0.8em', color: '#555' }}>{accommodation.groupInfo}</p>
            )}
            {accommodation.contactPerson && (
              <p style={{ fontSize: '0.8em' }}>Ansprechpartner: {accommodation.contactPerson}</p>
            )}
            {accommodation.phone && (
              <p>📞 <a href={`tel:${accommodation.phone.replace(/\s/g, '')}`}>{accommodation.phone}</a></p>
            )}
            {accommodation.email && (
              <p>✉️ <a href={`mailto:${accommodation.email}`}>{accommodation.email}</a></p>
            )}
            {accommodation.website && (
              <a href={accommodation.website} target="_blank" rel="noopener noreferrer">Website →</a>
            )}
          </div>
        </Popup>
      </CircleMarker>

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

      {/* Live GPS position — accuracy halo + dot */}
      {geoPosition && (
        <CircleMarker
          center={[geoPosition.lat, geoPosition.lng]}
          radius={25}
          fillColor="#3b82f6"
          fillOpacity={0.15}
          color="#3b82f6"
          weight={1}
        />
      )}
      {geoPosition && (
        <CircleMarker
          center={[geoPosition.lat, geoPosition.lng]}
          radius={10}
          fillColor="#3b82f6"
          fillOpacity={0.9}
          color="#fff"
          weight={3}
        >
          <Popup>
            📍 Mein Standort
            <br />± {Math.round(geoPosition.accuracy)} m
          </Popup>
        </CircleMarker>
      )}

      {/* POI markers */}
      {pois.map((poi) => (
        <Marker key={poi.id} position={[poi.lat, poi.lng]} icon={createPoiIcon(poi.type)}>
          <Popup>
            <div className="poi-popup">
              {poi.photo && <img src={`${import.meta.env.BASE_URL}${poi.photo}`} alt={poi.name} className="poi-popup-photo" />}
              <strong>{poi.name}</strong>
              <p>{poi.description}</p>
              {poi.mealType === 'lunch' && <span className="poi-meal-badge">🍴 Mittagessen</span>}
              {poi.mealType === 'cafe' && <span className="poi-meal-badge">☕ Kaffee & Kuchen</span>}
              {poi.website && (
                <a href={poi.website} target="_blank" rel="noopener noreferrer">Website →</a>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
