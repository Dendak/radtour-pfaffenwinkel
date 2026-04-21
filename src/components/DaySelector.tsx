import type { RouteConfig, ParsedRoute } from '../data/types';

interface Props {
  routes: RouteConfig[];
  parsedRoutes: Map<string, ParsedRoute>;
  activeId: string;
  onSelect: (id: string) => void;
}

export function DaySelector({ routes, parsedRoutes, activeId, onSelect }: Props) {
  return (
    <div className="day-selector">
      {routes.map((r) => {
        const isActive = r.id === activeId;
        const parsed = parsedRoutes.get(r.id);
        return (
          <button
            key={r.id}
            className={`day-btn ${isActive ? 'active' : ''}`}
            style={{
              borderColor: r.color,
              borderWidth: '3px',
              color: isActive ? '#fff' : r.color,
              backgroundColor: isActive ? r.color : 'transparent',
            }}
            onClick={() => onSelect(r.id)}
          >
            <span className="day-short">{r.shortDay}</span>
            <span className="day-title">{r.title}</span>
            {parsed ? (
              <span className="day-stats">
                <span className="day-stat">📏 {parsed.totalDistance.toFixed(1)} km</span>
                <span className="day-stat">⛰️ {Math.round(parsed.elevationGain)} hm</span>
              </span>
            ) : (
              <span className="day-stats">
                <span className="day-stat day-stat-loading">…</span>
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
