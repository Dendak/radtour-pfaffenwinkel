import { useState } from 'react';
import { knowledge, categoryLabels, type KnowledgeCategory, type KnowledgeDay } from '../data/knowledge';
import { routes } from '../data/routes';

type CatFilter = KnowledgeCategory | 'all';
type DayFilter = KnowledgeDay | 'all';

// Route id → short label + colour, for the day filter and the card badges.
const dayMeta = new Map(routes.map((r) => [r.id, { short: r.shortDay, day: r.day, color: r.color }]));

export function KnowledgeSection() {
  const [cat, setCat] = useState<CatFilter>('all');
  const [day, setDay] = useState<DayFilter>('all');

  const categories: CatFilter[] = ['all', 'kultur', 'natur', 'geschichte', 'personen', 'kurios'];
  const days: DayFilter[] = ['all', ...routes.map((r) => r.id as KnowledgeDay)];

  const filtered = knowledge.filter(
    (f) => (cat === 'all' || f.category === cat) && (day === 'all' || f.days.includes(day)),
  );

  // Counts respect the *other* active filter so chips show what's reachable.
  const catCount = (c: CatFilter) =>
    knowledge.filter(
      (f) => (c === 'all' || f.category === c) && (day === 'all' || f.days.includes(day)),
    ).length;
  const dayCount = (d: DayFilter) =>
    knowledge.filter(
      (f) => (cat === 'all' || f.category === cat) && (d === 'all' || f.days.includes(d)),
    ).length;

  return (
    <section className="knowledge-section">
      <h3 className="knowledge-heading">📖 Wissen · Pfaffenwinkel</h3>

      <div className="knowledge-filters">
        {categories.map((c) => (
          <button
            key={c}
            className={`knowledge-chip ${cat === c ? 'active' : ''}`}
            onClick={() => setCat(c)}
          >
            {c === 'all' ? '🗂️ Alle' : `${categoryLabels[c].icon} ${categoryLabels[c].label}`}
            <span className="knowledge-count">{catCount(c)}</span>
          </button>
        ))}
      </div>

      <div className="knowledge-filters knowledge-filters-days">
        {days.map((d) => (
          <button
            key={d}
            className={`knowledge-chip knowledge-chip-day ${day === d ? 'active' : ''}`}
            style={day === d && d !== 'all' ? { borderColor: dayMeta.get(d)?.color, color: dayMeta.get(d)?.color } : undefined}
            onClick={() => setDay(d)}
          >
            {d === 'all' ? '📅 Alle Tage' : `📅 ${dayMeta.get(d)?.day}`}
            <span className="knowledge-count">{dayCount(d)}</span>
          </button>
        ))}
      </div>

      <div className="knowledge-list">
        {filtered.length === 0 && (
          <p className="knowledge-empty">Keine Einträge für diese Auswahl.</p>
        )}
        {filtered.map((fact) => (
          <article key={fact.id} className={`knowledge-fact knowledge-${fact.category}`}>
            <div className="knowledge-fact-head">
              <span className="knowledge-fact-cat">
                {categoryLabels[fact.category].icon} {categoryLabels[fact.category].label}
              </span>
              <span className="knowledge-fact-days">
                {fact.days.map((d) => (
                  <span
                    key={d}
                    className="knowledge-day-badge"
                    style={{ background: dayMeta.get(d)?.color }}
                    title={dayMeta.get(d)?.day}
                  >
                    {dayMeta.get(d)?.short}
                  </span>
                ))}
              </span>
            </div>
            <h4 className="knowledge-fact-title">{fact.title}</h4>
            <p className="knowledge-fact-text">{fact.text}</p>
            {fact.source && (
              <a
                className="knowledge-fact-source"
                href={fact.source.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Quelle: {fact.source.label} →
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
