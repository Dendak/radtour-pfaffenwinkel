export interface PackingItem {
  id: string;
  label: string;
}

export interface PackingCategory {
  id: string;
  title: string;
  icon: string;
  items: PackingItem[];
}

/** Default packing list for a multi-day road-cycling trip in early June. */
export const packingList: PackingCategory[] = [
  {
    id: 'dokumente',
    title: 'Dokumente & Geld',
    icon: '📄',
    items: [
      { id: 'ausweis', label: 'Personalausweis' },
      { id: 'krankenkasse', label: 'Krankenkassenkarte' },
      { id: 'bargeld', label: 'Bargeld & EC-/Kreditkarte' },
      { id: 'handy', label: 'Handy' },
      { id: 'notfallkontakt', label: 'Notfallkontakt notiert' },
    ],
  },
  {
    id: 'fahrrad',
    title: 'Fahrrad & Technik',
    icon: '🚲',
    items: [
      { id: 'helm', label: 'Helm' },
      { id: 'schloss', label: 'Fahrradschloss' },
      { id: 'flaschen', label: 'Trinkflaschen' },
      { id: 'licht', label: 'Vorder- & Rücklicht' },
      { id: 'powerbank', label: 'Powerbank + Ladekabel' },
      { id: 'halterung', label: 'Handy-Lenkerhalterung' },
      { id: 'reparaturset', label: 'Flickzeug & Ersatzschlauch' },
      { id: 'pumpe', label: 'Luftpumpe / CO₂' },
      { id: 'multitool', label: 'Multitool' },
      { id: 'satteltasche', label: 'Satteltasche / Gepäckträgertaschen' },
    ],
  },
  {
    id: 'kleidung',
    title: 'Kleidung',
    icon: '👕',
    items: [
      { id: 'radhose', label: 'Radhose(n)' },
      { id: 'trikot', label: 'Trikots / Funktionsshirts' },
      { id: 'regenjacke', label: 'Regenjacke' },
      { id: 'windweste', label: 'Windweste / Armlinge' },
      { id: 'handschuhe', label: 'Handschuhe' },
      { id: 'sonnenbrille', label: 'Sonnenbrille' },
      { id: 'wechselkleidung', label: 'Wechselkleidung (Abend)' },
      { id: 'badesachen', label: 'Badesachen (Ammersee/Staffelsee)' },
    ],
  },
  {
    id: 'gesundheit',
    title: 'Gesundheit & Pflege',
    icon: '🧴',
    items: [
      { id: 'sonnencreme', label: 'Sonnencreme' },
      { id: 'sitzcreme', label: 'Sitzcreme' },
      { id: 'pflaster', label: 'Pflaster / kleine Apotheke' },
      { id: 'medikamente', label: 'Persönliche Medikamente' },
      { id: 'zahnbuersten', label: 'Zahnbürste & Co.' },
    ],
  },
];
