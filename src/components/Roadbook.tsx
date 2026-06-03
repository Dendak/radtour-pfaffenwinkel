import type { ParsedRoute, Poi } from '../data/types';
import { accommodation } from '../data/accommodation';
import { poisAlongRoute } from '../utils/navigation';

interface Props {
  route: ParsedRoute;
  pois: Poi[];
}

const typeLabels: Record<string, string> = {
  church: 'Kirche / Kloster',
  viewpoint: 'Aussichtspunkt',
  town: 'Ort',
  bridge: 'Brücke',
  museum: 'Museum',
  restaurant: 'Restaurant',
  gasthaus: 'Gasthaus',
  lake: 'See',
  cafe: 'Café',
};

function formatDate(iso?: string): string {
  if (!iso) return 'Termin flexibel';
  return new Date(iso + 'T12:00:00').toLocaleDateString('de-DE', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

/** Print-only roadbook / cue sheet for the active route. */
export function Roadbook({ route, pois }: Props) {
  const ordered = poisAlongRoute(route.points, pois);

  return (
    <div className="roadbook">
      <div className="roadbook-header">
        <h1>{route.config.title}</h1>
        <p className="roadbook-sub">
          {route.config.day} · {formatDate(route.config.date)}
        </p>
      </div>

      <p className="roadbook-desc">{route.config.description}</p>

      <div className="roadbook-stats">
        <span><strong>{route.totalDistance} km</strong> Distanz</span>
        <span><strong>{route.elevationGain} hm</strong> Anstieg</span>
        <span><strong>{route.elevationLoss} m</strong> Abstieg</span>
        <span><strong>{route.minElevation}–{route.maxElevation} m</strong> Höhe</span>
        <span><strong>{route.estimatedDuration}</strong> ca. Fahrzeit</span>
      </div>

      <table className="roadbook-table">
        <thead>
          <tr>
            <th>km</th>
            <th>Wegpunkt</th>
            <th>Art</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0,0</td>
            <td>{accommodation.name} (Start)</td>
            <td>Unterkunft</td>
          </tr>
          {ordered.map(({ poi, distAlongKm }) => (
            <tr key={poi.id}>
              <td>{distAlongKm.toFixed(1).replace('.', ',')}</td>
              <td>
                {poi.name}
                {poi.mealType === 'lunch' && ' 🍴'}
                {poi.mealType === 'cafe' && ' ☕'}
              </td>
              <td>{typeLabels[poi.type] ?? poi.type}</td>
            </tr>
          ))}
          <tr>
            <td>{route.totalDistance.toFixed(1).replace('.', ',')}</td>
            <td>{accommodation.name} (Ziel)</td>
            <td>Unterkunft</td>
          </tr>
        </tbody>
      </table>

      <p className="roadbook-foot">
        Radtour Pfaffenwinkel 2026 · {accommodation.address}
        {accommodation.phone ? ` · ${accommodation.phone}` : ''}
      </p>
    </div>
  );
}
