import { useState } from 'react';
import { knowledge, categoryLabels, type KnowledgeCategory } from '../data/knowledge';

type Filter = KnowledgeCategory | 'all';

export function KnowledgeSection() {
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = filter === 'all' ? knowledge : knowledge.filter((f) => f.category === filter);

  const categories: Filter[] = ['all', 'kultur', 'natur', 'geschichte', 'personen', 'kurios'];

  return (
    <section className="knowledge-section">
      <h3 className="knowledge-heading">📖 Wissen · Pfaffenwinkel</h3>

      <div className="knowledge-filters">
        {categories.map((c) => (
          <button
            key={c}
            className={`knowledge-chip ${filter === c ? 'active' : ''}`}
            onClick={() => setFilter(c)}
          >
            {c === 'all' ? '🗂️ Alle' : `${categoryLabels[c].icon} ${categoryLabels[c].label}`}
            {c === 'all' && <span className="knowledge-count">{knowledge.length}</span>}
            {c !== 'all' && (
              <span className="knowledge-count">
                {knowledge.filter((f) => f.category === c).length}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="knowledge-list">
        {filtered.map((fact) => (
          <article key={fact.id} className={`knowledge-fact knowledge-${fact.category}`}>
            <div className="knowledge-fact-head">
              <span className="knowledge-fact-cat">
                {categoryLabels[fact.category].icon} {categoryLabels[fact.category].label}
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
