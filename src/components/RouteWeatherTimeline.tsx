import { useState } from 'react';
import type { ParsedRoute, Poi } from '../data/types';
import type { GeolocationState } from '../hooks/useGeolocation';
import { useRouteWeather } from '../hooks/useRouteWeather';
import { sampleAlongRoute, poisAlongRoute, nearestOnRoute, formatKm } from '../utils/navigation';

interface Props {
  route: ParsedRoute;
  pois: Poi[];
  geo: GeolocationState;
}

interface Row {
  key: string;
  eta: string;
  place: string;
  prob: number | null;
  precip: number | null;
  code: number | null;
  wet: boolean;
}

const N_SAMPLES = 10;

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

function wmoIcon(code: number): string {
  if (code === 0) return '☀️';
  if (code === 1 || code === 2) return '🌤️';
  if (code === 3) return '☁️';
  if (code === 45 || code === 48) return '🌫️';
  if (code >= 51 && code <= 57) return '🌦️';
  if (code >= 61 && code <= 67) return '🌧️';
  if (code >= 71 && code <= 77) return '🌨️';
  if (code >= 80 && code <= 82) return '🌧️';
  if (code >= 85 && code <= 86) return '🌨️';
  if (code >= 95) return '⛈️';
  return '🌥️';
}

export function RouteWeatherTimeline({ route, pois, geo }: Props) {
  const [departure, setDeparture] = useState('08:30');
  const [speed, setSpeed] = useState(15);

  const date = route.config.date;
  const samples = sampleAlongRoute(route.points, N_SAMPLES);
  const coords = samples.map((p) => ({ lat: p.lat, lng: p.lng }));
  const { series, status } = useRouteWeather(coords, date);

  if (!date) {
    return (
      <div className="rtw-card">
        <div className="rtw-head">
          <span className="rtw-title">🌧️ Wetter auf der Strecke</span>
        </div>
        <p className="rtw-note">Alternativroute — kein fester Termin. Wird am Fahrtag geprüft.</p>
      </div>
    );
  }

  // Label each sample with the nearest POI along the route, else "km X".
  const poiDists = poisAlongRoute(route.points, pois);
  const labelFor = (distKm: number): string => {
    let best: Poi | null = null;
    let bestDelta = 2.5;
    for (const pd of poiDists) {
      const d = Math.abs(pd.distAlongKm - distKm);
      if (d < bestDelta) {
        bestDelta = d;
        best = pd.poi;
      }
    }
    return best ? best.name : `km ${Math.round(distKm)}`;
  };

  // Ride mode: anchor the timeline to the current GPS position + clock time.
  const near = geo.tracking && geo.position
    ? nearestOnRoute(route.points, geo.position.lat, geo.position.lng)
    : null;
  const rideMode = !!(near && near.distToRouteKm < 1);
  const anchorDist = rideMode && near ? near.distAlongKm : 0;

  const now = new Date();
  const depBase = new Date(`${date}T${departure}:00`);
  const kmh = Math.max(5, speed);

  const rows: Row[] = [];
  samples.forEach((p, i) => {
    if (rideMode && p.dist < anchorDist - 0.5) return; // already passed
    const aheadKm = rideMode ? p.dist - anchorDist : p.dist;
    const ms = (aheadKm / kmh) * 3600 * 1000;
    const eta = new Date((rideMode ? now.getTime() : depBase.getTime()) + ms);
    const lookup = `${date}T${pad(eta.getHours())}:00`;
    const s = series?.[i];
    const idx = s ? s.time.indexOf(lookup) : -1;
    const prob = s && idx >= 0 ? s.prob[idx] : null;
    const precip = s && idx >= 0 ? s.precip[idx] : null;
    const code = s && idx >= 0 ? s.code[idx] : null;
    rows.push({
      key: String(i),
      eta: `${pad(eta.getHours())}:${pad(eta.getMinutes())}`,
      place: labelFor(p.dist),
      prob,
      precip,
      code,
      wet: (prob != null && prob >= 50) || (precip != null && precip >= 0.3),
    });
  });

  const firstWet = rows.find((r) => r.wet);
  const headline = firstWet
    ? `🌧️ Regen ab ~${firstWet.eta} bei ${firstWet.place}`
    : '🌤️ Trocken — kein nennenswerter Regen erwartet';

  return (
    <div className="rtw-card">
      <div className="rtw-head">
        <span className="rtw-title">🌧️ Wetter auf der Strecke</span>
        {rideMode && <span className="rtw-badge">ab Standort</span>}
      </div>

      {!rideMode ? (
        <div className="rtw-controls">
          <label>
            Abfahrt
            <input type="time" value={departure} onChange={(e) => setDeparture(e.target.value)} />
          </label>
          <label>
            Ø km/h
            <input
              type="number"
              min={8}
              max={35}
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value) || 15)}
            />
          </label>
        </div>
      ) : (
        <p className="rtw-note">
          Ab aktueller Position ({formatKm(anchorDist)} gefahren) · {kmh} km/h
        </p>
      )}

      {status === 'loading' && <p className="rtw-note">Lade Vorhersage…</p>}
      {status === 'too_far' && (
        <p className="rtw-note">Vorhersage für diesen Tag noch nicht verfügbar (max. 16 Tage).</p>
      )}
      {status === 'error' && <p className="rtw-note rtw-error">Wetterdaten nicht verfügbar.</p>}

      {status === 'ok' && (
        <>
          <div className={`rtw-headline ${firstWet ? 'wet' : 'dry'}`}>{headline}</div>
          <div className="rtw-rows">
            {rows.map((r) => (
              <div key={r.key} className={`rtw-row ${r.wet ? 'wet' : ''}`}>
                <span className="rtw-time">{r.eta}</span>
                <span className="rtw-icon">{r.code != null ? wmoIcon(r.code) : '·'}</span>
                <span className="rtw-place">{r.place}</span>
                <span className="rtw-prob">
                  {r.prob != null ? `${r.prob}%` : '–'}
                  {r.precip != null && r.precip > 0 ? ` · ${r.precip.toFixed(1)} mm` : ''}
                </span>
              </div>
            ))}
          </div>
          <div className="rtw-foot">
            Quelle: Open-Meteo · ETA aus {rideMode ? 'Standort + jetzt' : `Abfahrt ${departure}`} &amp; {kmh} km/h
          </div>
        </>
      )}
    </div>
  );
}
