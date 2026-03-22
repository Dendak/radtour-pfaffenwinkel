import { useState, useCallback } from 'react';
import { routes } from '../data/routes';
import { pois } from '../data/pois';
import { useGpxData } from '../hooks/useGpxData';
import { DaySelector } from './DaySelector';
import { RouteMap } from './RouteMap';
import { ElevationChart } from './ElevationChart';
import { RouteInfo } from './RouteInfo';
import { PoiList } from './PoiList';
import type { TrackPoint, Poi } from '../data/types';

export function App() {
  const [activeRouteId, setActiveRouteId] = useState(routes[0].id);
  const [hoverPoint, setHoverPoint] = useState<TrackPoint | null>(null);
  const [focusPoi, setFocusPoi] = useState<Poi | null>(null);

  const activeRoute = routes.find((r) => r.id === activeRouteId)!;
  const parsedRoute = useGpxData(activeRoute);
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
          {parsedRoute && <RouteInfo route={parsedRoute} />}
          <PoiList pois={routePois} onPoiClick={handlePoiClick} />
        </div>

        <div className="map-area">
          {parsedRoute && (
            <>
              <RouteMap
                points={parsedRoute.points}
                color={parsedRoute.config.color}
                hoverPoint={hoverPoint}
                pois={routePois}
                focusPoi={focusPoi}
              />
              <ElevationChart
                points={parsedRoute.points}
                color={parsedRoute.config.color}
                onHover={setHoverPoint}
              />
            </>
          )}
          {!parsedRoute && (
            <div className="loading">
              <div className="spinner" />
              <p>Route wird geladen...</p>
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
