import type { Poi } from '../data/types';

interface Props {
  pois: Poi[];
  onPoiClick: (poi: Poi) => void;
}

const typeIcons: Record<string, string> = {
  church: '⛪',
  viewpoint: '🏔️',
  town: '🏘️',
  bridge: '🌉',
  museum: '🎨',
  restaurant: '🍽️',
  gasthaus: '🍺',
  lake: '💧',
};

const typeLabels: Record<string, string> = {
  church: 'Kirche / Kloster',
  viewpoint: 'Aussicht',
  town: 'Ort',
  bridge: 'Brücke',
  museum: 'Museum',
  restaurant: 'Restaurant',
  gasthaus: 'Gasthaus',
  lake: 'See',
};

export function PoiList({ pois, onPoiClick }: Props) {
  const sights = pois.filter((p) => !p.mealType);
  const eats = pois.filter((p) => p.mealType);

  return (
    <div className="poi-list">
      {sights.length > 0 && (
        <>
          <h3>Sehenswürdigkeiten</h3>
          {sights.map((poi) => (
            <div key={poi.id} className="poi-item" onClick={() => onPoiClick(poi)}>
              <span className="poi-icon">{typeIcons[poi.type] || '📍'}</span>
              <div className="poi-content">
                <strong>{poi.name}</strong>
                <span className="poi-type">{typeLabels[poi.type]}</span>
                <p>{poi.description}</p>
              </div>
            </div>
          ))}
        </>
      )}
      {eats.length > 0 && (
        <>
          <h3>Einkehr-Tipps</h3>
          {eats.map((poi) => (
            <div key={poi.id} className="poi-item poi-eat" onClick={() => onPoiClick(poi)}>
              <span className="poi-icon">{typeIcons[poi.type] || '🍽️'}</span>
              <div className="poi-content">
                <strong>{poi.name}</strong>
                <span className="poi-meal">
                  {poi.mealType === 'lunch' ? '☀️ Mittag' : poi.mealType === 'dinner' ? '🌙 Abend' : '☀️🌙 Mittag & Abend'}
                </span>
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
