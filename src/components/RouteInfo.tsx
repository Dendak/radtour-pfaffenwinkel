import type { ParsedRoute } from '../data/types';

interface Props {
  route: ParsedRoute;
}

export function RouteInfo({ route }: Props) {
  return (
    <div className="route-info">
      <p className="route-description">{route.config.description}</p>
      <div className="stats-grid">
        <div className="stat">
          <span className="stat-icon">📏</span>
          <span className="stat-value">{route.totalDistance} km</span>
          <span className="stat-label">Distanz</span>
        </div>
        <div className="stat">
          <span className="stat-icon">⬆️</span>
          <span className="stat-value">{route.elevationGain} m</span>
          <span className="stat-label">Anstieg</span>
        </div>
        <div className="stat">
          <span className="stat-icon">⬇️</span>
          <span className="stat-value">{route.elevationLoss} m</span>
          <span className="stat-label">Abstieg</span>
        </div>
        <div className="stat">
          <span className="stat-icon">⏱️</span>
          <span className="stat-value">{route.estimatedDuration}</span>
          <span className="stat-label">ca. Dauer</span>
        </div>
        <div className="stat">
          <span className="stat-icon">⛰️</span>
          <span className="stat-value">{route.minElevation}–{route.maxElevation} m</span>
          <span className="stat-label">Höhe</span>
        </div>
      </div>
    </div>
  );
}
