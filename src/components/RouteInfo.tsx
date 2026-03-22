import type { ParsedRoute } from '../data/types';

interface Props {
  route: ParsedRoute;
}

export function RouteInfo({ route }: Props) {
  return (
    <div className="route-info">
      <p className="route-description">{route.config.description}</p>

      {/* Big hero stats */}
      <div className="hero-stats">
        <div className="hero-stat">
          <span className="hero-value">{route.totalDistance}</span>
          <span className="hero-unit">km</span>
          <span className="hero-label">Distanz</span>
        </div>
        <div className="hero-stat hero-elevation">
          <span className="hero-value">{route.elevationGain}</span>
          <span className="hero-unit">hm ↑</span>
          <span className="hero-label">Höhenmeter</span>
        </div>
        <div className="hero-stat">
          <span className="hero-value">{route.estimatedDuration}</span>
          <span className="hero-unit"></span>
          <span className="hero-label">ca. Dauer</span>
        </div>
      </div>

      {/* Secondary stats */}
      <div className="secondary-stats">
        <span>⬇️ {route.elevationLoss} m Abstieg</span>
        <span>⛰️ {route.minElevation}–{route.maxElevation} m</span>
      </div>
    </div>
  );
}
