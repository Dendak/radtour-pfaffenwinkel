import { accommodation } from '../data/accommodation';

function formatDate(iso: string): string {
  const d = new Date(iso + 'T12:00:00');
  return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' });
}

export function AccommodationInfo() {
  const a = accommodation;
  return (
    <div className="accommodation-card">
      <div className="accommodation-head">
        <span className="accommodation-title">🏠 Unterkunft</span>
        {a.confirmed && <span className="accommodation-badge">✓ bestätigt</span>}
      </div>

      <div className="accommodation-name">{a.name}</div>
      <div className="accommodation-address">{a.address}</div>

      <div className="accommodation-stay">
        📅 {formatDate(a.checkIn)} – {formatDate(a.checkOut)} 2026
      </div>

      {a.rooms && (
        <div className="accommodation-row">
          🛏️ {a.rooms.singles}× EZ + {a.rooms.doubles}× DZ
          {' · '}{a.rooms.guests} Gäste
        </div>
      )}

      {a.prices && (
        <div className="accommodation-row">
          💶 EZ {a.prices.single} € · DZ {a.prices.double} € / Nacht
        </div>
      )}

      {(a.bicycleGarage || a.breakfastIncluded) && (
        <div className="accommodation-row">
          {a.bicycleGarage && '🚲 Fahrradgarage'}
          {a.bicycleGarage && a.breakfastIncluded && ' · '}
          {a.breakfastIncluded && '🥐 Frühstück inkl.'}
        </div>
      )}

      {a.groupInfo && <div className="accommodation-group">{a.groupInfo}</div>}

      <div className="accommodation-contact">
        {a.contactPerson && <div>Ansprechpartner: {a.contactPerson}</div>}
        {a.phone && (
          <div>
            📞 <a href={`tel:${a.phone.replace(/\s/g, '')}`}>{a.phone}</a>
          </div>
        )}
        {a.email && (
          <div>
            ✉️ <a href={`mailto:${a.email}`}>{a.email}</a>
          </div>
        )}
        {a.website && (
          <div>
            <a href={a.website} target="_blank" rel="noopener noreferrer">
              Website →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
