import type { ParsedRoute } from '../data/types';
import { accommodation } from '../data/accommodation';

interface Props {
  routes: ParsedRoute[];
  activeRouteId: string;
  onSelectDay: (id: string) => void;
}

function formatDate(iso: string): string {
  return new Date(iso + 'T12:00:00').toLocaleDateString('de-DE', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  });
}

export function TripOverview({ routes, activeRouteId, onSelectDay }: Props) {
  // Totals across the fixed tour days (those with a date) — the Alternative
  // route is optional and not counted in the planned totals.
  const tourDays = routes.filter((r) => r.config.date);
  const totalKm = tourDays.reduce((sum, r) => sum + r.totalDistance, 0);
  const totalHm = tourDays.reduce((sum, r) => sum + r.elevationGain, 0);

  return (
    <section className="overview-section" id="uebersicht">
      <h2 className="overview-heading">📊 Tour-Überblick</h2>

      <div className="overview-totals">
        <div className="overview-total">
          <span className="overview-total-value">{tourDays.length}</span>
          <span className="overview-total-label">Tage</span>
        </div>
        <div className="overview-total">
          <span className="overview-total-value">{Math.round(totalKm)}</span>
          <span className="overview-total-label">km gesamt</span>
        </div>
        <div className="overview-total">
          <span className="overview-total-value">{totalHm}</span>
          <span className="overview-total-label">Höhenmeter</span>
        </div>
        <div className="overview-total">
          <span className="overview-total-value">{accommodation.rooms?.guests ?? '–'}</span>
          <span className="overview-total-label">Mitfahrer</span>
        </div>
      </div>

      <div className="overview-timeline">
        {routes.map((r) => (
          <button
            key={r.config.id}
            className={`overview-day ${r.config.id === activeRouteId ? 'active' : ''}`}
            style={{ borderLeftColor: r.config.color }}
            onClick={() => onSelectDay(r.config.id)}
          >
            <div className="overview-day-top">
              <span className="overview-day-name">{r.config.day}</span>
              {r.config.date && (
                <span className="overview-day-date">{formatDate(r.config.date)}</span>
              )}
            </div>
            <span className="overview-day-title">{r.config.title}</span>
            <div className="overview-day-stats">
              <span>📏 {r.totalDistance.toFixed(1)} km</span>
              <span>⛰️ {r.elevationGain} hm</span>
              <span>⏱️ {r.estimatedDuration}</span>
            </div>
          </button>
        ))}
      </div>

      <p className="overview-base">
        🏠 Basis: <strong>{accommodation.name}</strong>, {accommodation.address}
      </p>
    </section>
  );
}
