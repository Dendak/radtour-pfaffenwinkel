import { useEffect, useMemo, useState } from 'react';
import { packingList } from '../data/packing';

const STORAGE_KEY = 'radtour-packlist-v1';

interface CustomItem {
  id: string;
  label: string;
  category: string;
}

interface Stored {
  checked: Record<string, boolean>;
  custom: CustomItem[];
}

function load(): Stored {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Stored;
  } catch {
    /* ignore corrupt storage */
  }
  return { checked: {}, custom: [] };
}

export function PackingList() {
  const [state, setState] = useState<Stored>(load);
  const [drafts, setDrafts] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore quota / private-mode errors */
    }
  }, [state]);

  const categories = useMemo(
    () =>
      packingList.map((cat) => ({
        ...cat,
        items: [
          ...cat.items.map((i) => ({ id: i.id, label: i.label, custom: false })),
          ...state.custom
            .filter((c) => c.category === cat.id)
            .map((c) => ({ id: c.id, label: c.label, custom: true })),
        ],
      })),
    [state.custom],
  );

  const allItems = categories.flatMap((c) => c.items);
  const packed = allItems.filter((i) => state.checked[i.id]).length;
  const total = allItems.length;
  const progress = total ? Math.round((packed / total) * 100) : 0;

  const toggle = (id: string) =>
    setState((s) => ({ ...s, checked: { ...s.checked, [id]: !s.checked[id] } }));

  const addCustom = (category: string) => {
    const label = (drafts[category] ?? '').trim();
    if (!label) return;
    const id = `custom-${category}-${label.toLowerCase().replace(/\s+/g, '-')}`;
    setState((s) =>
      s.custom.some((c) => c.id === id)
        ? s
        : { ...s, custom: [...s.custom, { id, label, category }] },
    );
    setDrafts((d) => ({ ...d, [category]: '' }));
  };

  const removeCustom = (id: string) =>
    setState((s) => {
      const checked = { ...s.checked };
      delete checked[id];
      return { checked, custom: s.custom.filter((c) => c.id !== id) };
    });

  const reset = () => {
    if (confirm('Alle Häkchen zurücksetzen?')) setState((s) => ({ ...s, checked: {} }));
  };

  return (
    <section className="packing-section" id="packliste">
      <div className="packing-head">
        <h2 className="packing-heading">🎒 Packliste</h2>
        <div className="packing-progress-wrap">
          <span className="packing-progress-text">
            {packed} / {total} gepackt
          </span>
          <div className="packing-progress">
            <div className="packing-progress-bar" style={{ width: `${progress}%` }} />
          </div>
          <button className="packing-reset" onClick={reset}>
            Zurücksetzen
          </button>
        </div>
      </div>

      <div className="packing-grid">
        {categories.map((cat) => (
          <div key={cat.id} className="packing-category">
            <h3 className="packing-cat-title">
              {cat.icon} {cat.title}
            </h3>
            <ul className="packing-items">
              {cat.items.map((item) => (
                <li key={item.id} className="packing-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={!!state.checked[item.id]}
                      onChange={() => toggle(item.id)}
                    />
                    <span className={state.checked[item.id] ? 'packed' : ''}>{item.label}</span>
                  </label>
                  {item.custom && (
                    <button
                      className="packing-remove"
                      onClick={() => removeCustom(item.id)}
                      title="Eintrag entfernen"
                    >
                      ×
                    </button>
                  )}
                </li>
              ))}
            </ul>
            <form
              className="packing-add"
              onSubmit={(e) => {
                e.preventDefault();
                addCustom(cat.id);
              }}
            >
              <input
                type="text"
                placeholder="Eigenes hinzufügen…"
                value={drafts[cat.id] ?? ''}
                onChange={(e) => setDrafts((d) => ({ ...d, [cat.id]: e.target.value }))}
              />
              <button type="submit">+</button>
            </form>
          </div>
        ))}
      </div>
    </section>
  );
}
