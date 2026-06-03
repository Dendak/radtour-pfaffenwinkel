import type { GeolocationState } from '../hooks/useGeolocation';
import type { NavInfo } from '../utils/navigation';
import { formatKm } from '../utils/navigation';
import type { ParsedRoute } from '../data/types';

interface Props {
  route: ParsedRoute;
  navInfo: NavInfo | null;
  geo: GeolocationState;
}

export function NavPanel({ route, navInfo, geo }: Props) {
  if (!geo.supported) return null;

  const total = route.totalDistance;
  const progress = navInfo ? Math.min(100, Math.round((navInfo.doneKm / total) * 100)) : 0;
  const speedKmh =
    geo.position?.speed != null ? Math.round(geo.position.speed * 3.6) : null;

  return (
    <div className={`nav-panel ${navInfo?.offRoute ? 'nav-off-route' : ''}`}>
      <div className="nav-head">
        <span className="nav-title">🧭 Live-Navigation</span>
        <button
          className={`nav-toggle ${geo.tracking ? 'active' : ''}`}
          onClick={geo.toggle}
        >
          {geo.tracking ? 'Stopp' : 'Start'}
        </button>
      </div>

      {geo.error && <p className="nav-note nav-error">{geo.error}</p>}

      {!geo.tracking && !geo.error && (
        <p className="nav-note">
          GPS starten, um deine Position auf der Route, die Distanz zum nächsten Ziel und
          die zurückgelegte Strecke zu sehen.
        </p>
      )}

      {geo.tracking && !navInfo && (
        <p className="nav-note">📡 Suche GPS-Signal…</p>
      )}

      {geo.tracking && navInfo && (
        <>
          {navInfo.offRoute && (
            <div className="nav-alert">
              ⚠️ Abseits der Route — {formatKm(navInfo.nearest.distToRouteKm)} entfernt
            </div>
          )}

          <div className="nav-progress">
            <div className="nav-progress-bar" style={{ width: `${progress}%`, background: route.config.color }} />
          </div>

          <div className="nav-stats">
            <div className="nav-stat">
              <span className="nav-stat-value">{formatKm(navInfo.doneKm)}</span>
              <span className="nav-stat-label">gefahren</span>
            </div>
            <div className="nav-stat">
              <span className="nav-stat-value">{formatKm(navInfo.remainingKm)}</span>
              <span className="nav-stat-label">bis Ziel</span>
            </div>
            <div className="nav-stat">
              <span className="nav-stat-value">{progress}%</span>
              <span className="nav-stat-label">geschafft</span>
            </div>
          </div>

          {navInfo.nextPoi && (
            <div className="nav-next">
              <span className="nav-next-label">Nächstes Ziel</span>
              <span className="nav-next-name">{navInfo.nextPoi.poi.name}</span>
              <span className="nav-next-dist">noch {formatKm(navInfo.nextPoi.distToGoKm)}</span>
            </div>
          )}

          <div className="nav-foot">
            {speedKmh != null && <span>🚴 {speedKmh} km/h</span>}
            <span>± {Math.round(geo.position?.accuracy ?? 0)} m</span>
          </div>
        </>
      )}
    </div>
  );
}
