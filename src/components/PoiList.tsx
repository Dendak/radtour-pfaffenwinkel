import type { Poi } from '../data/types';

interface Props {
  pois: Poi[];
  onPoiClick: (poi: Poi) => void;
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

export function PoiList({ pois, onPoiClick }: Props) {
  const sights = pois.filter((p) => !p.mealType);
  const lunches = pois.filter((p) => p.mealType === 'lunch');
  const cafes = pois.filter((p) => p.mealType === 'cafe');

  return (
    <div className="poi-list">
      {sights.length > 0 && (
        <>
          <h3>Sehenswürdigkeiten</h3>
          {sights.map((poi) => (
            <div key={poi.id} className="poi-item" onClick={() => onPoiClick(poi)}>
              {poi.photo ? (
                <img src={poi.photo} alt={poi.name} className="poi-photo" loading="lazy" />
              ) : (
                <div className="poi-photo-placeholder">📍</div>
              )}
              <div className="poi-content">
                <strong>{poi.name}</strong>
                <span className="poi-type">{typeLabels[poi.type]}</span>
                <p>{poi.description}</p>
              </div>
            </div>
          ))}
        </>
      )}
      {lunches.length > 0 && (
        <>
          <h3>🍴 Mittagessen</h3>
          {lunches.map((poi) => (
            <div key={poi.id} className="poi-item poi-eat" onClick={() => onPoiClick(poi)}>
              <div className="poi-content">
                <strong>{poi.name}</strong>
                <span className="poi-type">{typeLabels[poi.type]}</span>
                <p>{poi.description}</p>
                {poi.website && (
                  <a href={poi.website} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                    Website →
                  </a>
                )}
              </div>
            </div>
          ))}
        </>
      )}
      {cafes.length > 0 && (
        <>
          <h3>☕ Kaffee & Kuchen</h3>
          {cafes.map((poi) => (
            <div key={poi.id} className="poi-item poi-cafe" onClick={() => onPoiClick(poi)}>
              <div className="poi-content">
                <strong>{poi.name}</strong>
                <p>{poi.description}</p>
                {poi.website && (
                  <a href={poi.website} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                    Website →
                  </a>
                )}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
