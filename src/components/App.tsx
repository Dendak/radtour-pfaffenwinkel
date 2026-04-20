import { useState, useCallback } from 'react';
import { routes } from '../data/routes';
import { pois } from '../data/pois';
import { useAllRoutes } from '../hooks/useAllRoutes';
import { DaySelector } from './DaySelector';
import { RouteMap } from './RouteMap';
import { ElevationChart } from './ElevationChart';
import { RouteInfo } from './RouteInfo';
import { RouteWeather } from './RouteWeather';
import { AccommodationInfo } from './AccommodationInfo';
import { PoiList } from './PoiList';
import type { TrackPoint, Poi } from '../data/types';

export function App() {
  const [activeRouteId, setActiveRouteId] = useState(routes[0].id);
  const [hoverPoint, setHoverPoint] = useState<TrackPoint | null>(null);
  const [focusPoi, setFocusPoi] = useState<Poi | null>(null);

  const allRoutesMap = useAllRoutes(routes);
  const allRoutesList = Array.from(allRoutesMap.values());
  const activeRoute = allRoutesMap.get(activeRouteId) ?? null;
  const routePois = pois.filter((p) => p.routeId === activeRouteId);

  const handleRouteChange = useCallback((id: string) => {
    setActiveRouteId(id);
    setHoverPoint(null);
    setFocusPoi(null);
  }, []);

  const handlePoiClick = useCallback((poi: Poi) => {
    setFocusPoi(poi);
  }, []);

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1>🚴 Radtour Pfaffenwinkel 2026</h1>
          <p>4.–7. Juni · Sternfahrt ab Peißenberg</p>
        </div>
      </header>

      <DaySelector routes={routes} activeId={activeRouteId} onSelect={handleRouteChange} />

      <main className="main-layout">
        <div className="sidebar">
          {activeRoute && <RouteInfo route={activeRoute} />}
          {activeRoute && activeRoute.points.length > 0 && (() => {
            const mid = activeRoute.points[Math.floor(activeRoute.points.length / 2)];
            return (
              <RouteWeather
                lat={mid.lat}
                lng={mid.lng}
                date={activeRoute.config.date}
                dayLabel={activeRoute.config.day}
              />
            );
          })()}
          <AccommodationInfo />
          <PoiList pois={routePois} onPoiClick={handlePoiClick} />
        </div>

        <div className="map-area">
          {allRoutesList.length > 0 ? (
            <>
              <RouteMap
                allRoutes={allRoutesList}
                activeRouteId={activeRouteId}
                hoverPoint={hoverPoint}
                pois={routePois}
                focusPoi={focusPoi}
              />
              {activeRoute && (
                <ElevationChart
                  points={activeRoute.points}
                  color={activeRoute.config.color}
                  onHover={setHoverPoint}
                />
              )}
            </>
          ) : (
            <div className="loading">
              <div className="spinner" />
              <p>Routen werden geladen...</p>
            </div>
          )}
        </div>
      </main>

      <footer className="footer">
        <p>Radtour Pfaffenwinkel 2026 · Erstellt mit ❤️ und Claude</p>
      </footer>
    </div>
  );
}
