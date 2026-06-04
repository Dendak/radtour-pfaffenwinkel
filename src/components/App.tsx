import { useState, useCallback, useMemo } from 'react';
import { routes } from '../data/routes';
import { pois } from '../data/pois';
import { useAllRoutes } from '../hooks/useAllRoutes';
import { useGeolocation } from '../hooks/useGeolocation';
import { computeNavigation } from '../utils/navigation';
import { DaySelector } from './DaySelector';
import { RouteMap } from './RouteMap';
import { ElevationChart } from './ElevationChart';
import { RouteInfo } from './RouteInfo';
import { RouteActions } from './RouteActions';
import { NavPanel } from './NavPanel';
import { RouteWeather } from './RouteWeather';
import { RouteWeatherTimeline } from './RouteWeatherTimeline';
import { AccommodationInfo } from './AccommodationInfo';
import { TripOverview } from './TripOverview';
import { KnowledgeSection } from './KnowledgeSection';
import { PoiList } from './PoiList';
import { Roadbook } from './Roadbook';
import { PwaStatus } from './PwaStatus';
import type { TrackPoint, Poi } from '../data/types';

const SECTIONS = [
  { id: 'karte', label: '🗺️ Karte' },
  { id: 'uebersicht', label: '📊 Überblick' },
  { id: 'wissen', label: '📚 Wissen' },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/** Local date as YYYY-MM-DD (matches the ISO dates in routes). */
function todayIso(): string {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

/**
 * Pick the route to show on load: today's tour day if it matches, otherwise
 * the next upcoming tour day, and outside the tour the first route.
 */
function getDefaultRouteId(): string {
  const today = todayIso();
  const dated = routes.filter((r) => r.date);
  const exact = dated.find((r) => r.date === today);
  if (exact) return exact.id;
  const upcoming = dated
    .filter((r) => r.date! >= today)
    .sort((a, b) => a.date!.localeCompare(b.date!))[0];
  return upcoming?.id ?? routes[0].id;
}

export function App() {
  const [activeRouteId, setActiveRouteId] = useState(getDefaultRouteId);
  const [hoverPoint, setHoverPoint] = useState<TrackPoint | null>(null);
  const [focusPoi, setFocusPoi] = useState<Poi | null>(null);

  const allRoutesMap = useAllRoutes(routes);
  const allRoutesList = Array.from(allRoutesMap.values());
  const activeRoute = allRoutesMap.get(activeRouteId) ?? null;
  const routePois = useMemo(
    () => pois.filter((p) => p.routeId === activeRouteId),
    [activeRouteId],
  );

  const geo = useGeolocation();

  // Live navigation info: nearest point, progress, next POI ahead.
  const navInfo = useMemo(() => {
    if (!activeRoute || !geo.position) return null;
    return computeNavigation(activeRoute.points, routePois, geo.position.lat, geo.position.lng);
  }, [activeRoute, routePois, geo.position]);

  const handleRouteChange = useCallback((id: string) => {
    setActiveRouteId(id);
    setHoverPoint(null);
    setFocusPoi(null);
  }, []);

  const handleSelectDayFromOverview = useCallback(
    (id: string) => {
      handleRouteChange(id);
      scrollToSection('karte');
    },
    [handleRouteChange],
  );

  const handlePoiClick = useCallback((poi: Poi) => {
    setFocusPoi(poi);
    scrollToSection('karte');
  }, []);

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1>🚴 Radtour Pfaffenwinkel 2026</h1>
          <p>4.–7. Juni · Sternfahrt ab Peißenberg</p>
        </div>
      </header>

      <nav className="section-nav">
        {SECTIONS.map((s) => (
          <button key={s.id} onClick={() => scrollToSection(s.id)}>
            {s.label}
          </button>
        ))}
      </nav>

      <DaySelector
        routes={routes}
        parsedRoutes={allRoutesMap}
        activeId={activeRouteId}
        onSelect={handleRouteChange}
      />

      <main className="main-layout" id="karte">
        <div className="sidebar">
          {activeRoute && <RouteInfo route={activeRoute} />}
          {activeRoute && <RouteActions route={activeRoute} />}
          {activeRoute && <NavPanel route={activeRoute} navInfo={navInfo} geo={geo} />}
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
          {activeRoute && <RouteWeatherTimeline route={activeRoute} pois={routePois} geo={geo} />}
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
                geoPosition={geo.position}
                tracking={geo.tracking}
                gpsSupported={geo.supported}
                onToggleTracking={geo.toggle}
              />
              {activeRoute && (
                <ElevationChart
                  points={activeRoute.points}
                  color={activeRoute.config.color}
                  onHover={setHoverPoint}
                  currentDist={navInfo?.doneKm ?? null}
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

      {allRoutesList.length > 0 && (
        <TripOverview
          routes={allRoutesList}
          activeRouteId={activeRouteId}
          onSelectDay={handleSelectDayFromOverview}
        />
      )}

      <div id="wissen">
        <KnowledgeSection />
      </div>

      <footer className="footer">
        <p>Radtour Pfaffenwinkel 2026 · Erstellt mit ❤️ und Claude</p>
      </footer>

      {activeRoute && <Roadbook route={activeRoute} pois={routePois} />}
      <PwaStatus />
    </div>
  );
}
