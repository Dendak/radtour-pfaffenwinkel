import { useWeather, type WeatherDay, type WeatherHour } from '../hooks/useWeather';

interface Props {
  lat: number;
  lng: number;
  date: string | undefined;
  dayLabel: string;
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

function wmoText(code: number): string {
  if (code === 0) return 'Klar';
  if (code === 1) return 'Überwiegend klar';
  if (code === 2) return 'Teilweise bewölkt';
  if (code === 3) return 'Bewölkt';
  if (code === 45 || code === 48) return 'Nebel';
  if (code >= 51 && code <= 57) return 'Nieselregen';
  if (code >= 61 && code <= 65) return 'Regen';
  if (code === 66 || code === 67) return 'Gefrierender Regen';
  if (code >= 71 && code <= 77) return 'Schnee';
  if (code >= 80 && code <= 82) return 'Regenschauer';
  if (code >= 85 && code <= 86) return 'Schneeschauer';
  if (code >= 95) return 'Gewitter';
  return '—';
}

function formatTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
}

function formatFetched(d: Date): string {
  return d.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
}

function daysUntilLabel(days: number): string {
  if (days < 0) return 'vergangen';
  if (days === 0) return 'heute';
  if (days === 1) return 'morgen';
  if (days <= 15) return `in ${days} Tagen`;
  return `in ${days} Tagen (außerhalb der Vorhersage)`;
}

function HourlyForecast({ hours }: { hours: WeatherHour[] }) {
  // Riding hours only — keep the strip focused on the day on the bike.
  const day = hours.filter((h) => h.hour >= 6 && h.hour <= 21);
  if (day.length === 0) return null;

  const temps = day.map((h) => h.temp);
  const tMin = Math.min(...temps);
  const tMax = Math.max(...temps);
  const span = Math.max(1, tMax - tMin);

  return (
    <div className="weather-hourly">
      <div className="weather-hourly-title">Tagesverlauf</div>
      <div className="weather-hourly-strip">
        {day.map((h) => {
          // Bar height encodes temperature, colour the precipitation chance.
          const heightPct = 30 + ((h.temp - tMin) / span) * 60;
          const wet = h.precipProb >= 40;
          return (
            <div key={h.time} className="weather-hour">
              <span className="weather-hour-temp">{Math.round(h.temp)}°</span>
              <span className="weather-hour-icon">{wmoIcon(h.weatherCode)}</span>
              <div className="weather-hour-bar-track">
                <div
                  className="weather-hour-bar"
                  style={{ height: `${heightPct}%` }}
                />
              </div>
              <span className={`weather-hour-precip ${wet ? 'wet' : ''}`}>
                {h.precipProb > 0 ? `${h.precipProb}%` : '·'}
              </span>
              <span className="weather-hour-time">{h.hour}</span>
            </div>
          );
        })}
      </div>
      <div className="weather-hourly-legend">
        <span>🌡️ Temperatur (Balken)</span>
        <span>💧 Regenwahrscheinlichkeit</span>
      </div>
    </div>
  );
}

function WeatherCardBody({ data }: { data: WeatherDay }) {
  return (
    <>
      <div className="weather-main">
        <span className="weather-icon">{wmoIcon(data.weatherCode)}</span>
        <div className="weather-temps">
          <span className="weather-tmax">{Math.round(data.tmax)}°</span>
          <span className="weather-tmin">/ {Math.round(data.tmin)}°</span>
        </div>
        <div className="weather-condition">{wmoText(data.weatherCode)}</div>
      </div>
      <div className="weather-grid">
        <div className="weather-cell">
          <span className="weather-cell-label">💧 Niederschlag</span>
          <span className="weather-cell-value">
            {data.precipSum.toFixed(1)} mm
            {data.precipProbability != null && ` · ${data.precipProbability}%`}
          </span>
        </div>
        <div className="weather-cell">
          <span className="weather-cell-label">💨 Wind</span>
          <span className="weather-cell-value">
            {Math.round(data.windMax)} km/h
            {data.windGusts != null && ` · Böen ${Math.round(data.windGusts)}`}
          </span>
        </div>
        <div className="weather-cell">
          <span className="weather-cell-label">🌅 Sonnenaufgang</span>
          <span className="weather-cell-value">{formatTime(data.sunrise)}</span>
        </div>
        <div className="weather-cell">
          <span className="weather-cell-label">🌇 Sonnenuntergang</span>
          <span className="weather-cell-value">{formatTime(data.sunset)}</span>
        </div>
      </div>
      {data.hourly.length > 0 && <HourlyForecast hours={data.hourly} />}
    </>
  );
}

export function RouteWeather({ lat, lng, date, dayLabel }: Props) {
  const { data, status, fetchedAt, daysUntil } = useWeather(lat, lng, date);

  if (!date) {
    return (
      <div className="weather-card">
        <div className="weather-header">
          <span className="weather-title">🌤️ Wetter</span>
        </div>
        <p className="weather-note">
          Alternativroute — kein fester Termin. Wetter wird am Tag der Fahrt geprüft.
        </p>
      </div>
    );
  }

  return (
    <div className="weather-card">
      <div className="weather-header">
        <span className="weather-title">🌤️ Wetter {dayLabel}</span>
        <span className="weather-when">{daysUntilLabel(daysUntil)}</span>
      </div>

      {status === 'loading' && <p className="weather-note">Lade Vorhersage…</p>}

      {status === 'too_far' && (
        <p className="weather-note">
          Noch {daysUntil} Tage bis zur Tour — Vorhersage erst ab {daysUntil - 15} Tag
          {daysUntil - 15 === 1 ? '' : 'en'} verfügbar (Open-Meteo: 16 Tage im Voraus).
        </p>
      )}

      {status === 'error' && (
        <p className="weather-note weather-error">
          Wetterdaten nicht verfügbar. Später erneut versuchen.
        </p>
      )}

      {status === 'ok' && data && <WeatherCardBody data={data} />}

      {fetchedAt && (
        <div className="weather-footer">
          Quelle: Open-Meteo · Stand {formatFetched(fetchedAt)}
        </div>
      )}
    </div>
  );
}
