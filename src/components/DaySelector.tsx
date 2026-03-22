import type { RouteConfig } from '../data/types';

interface Props {
  routes: RouteConfig[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function DaySelector({ routes, activeId, onSelect }: Props) {
  return (
    <div className="day-selector">
      {routes.map((r) => (
        <button
          key={r.id}
          className={`day-btn ${r.id === activeId ? 'active' : ''}`}
          style={r.id === activeId ? { backgroundColor: r.color, borderColor: r.color } : {}}
          onClick={() => onSelect(r.id)}
        >
          <span className="day-short">{r.shortDay}</span>
          <span className="day-title">{r.title}</span>
        </button>
      ))}
    </div>
  );
}
