import type { RouteConfig } from '../data/types';

interface Props {
  routes: RouteConfig[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function DaySelector({ routes, activeId, onSelect }: Props) {
  return (
    <div className="day-selector">
      {routes.map((r) => {
        const isActive = r.id === activeId;
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
          </button>
        );
      })}
    </div>
  );
}
