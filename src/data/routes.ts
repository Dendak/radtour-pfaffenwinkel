import type { RouteConfig } from './types';

export const routes: RouteConfig[] = [
  {
    id: 'donnerstag',
    day: 'Donnerstag',
    shortDay: 'Do',
    title: 'Ammersee-Runde',
    gpxFile: 'do-ammersee.gpx',
    color: '#2563eb',
    description: 'Rundtour um den Ammersee über Dießen und Herrsching. Flache, gemütliche Strecke entlang des Seeufers.',
  },
  {
    id: 'freitag',
    day: 'Freitag',
    shortDay: 'Fr',
    title: 'Wieskirche & Pfaffenwinkel',
    gpxFile: 'fr-wieskirche.gpx',
    color: '#059669',
    description: 'Durch das Herz des Pfaffenwinkels zur UNESCO-Welterbe Wieskirche, über Rottenbuch und Steingaden.',
  },
  {
    id: 'samstag',
    day: 'Samstag',
    shortDay: 'Sa',
    title: 'Große Südrunde',
    gpxFile: 'sa-lange-tour.gpx',
    color: '#d97706',
    description: 'Die längste Tour des Wochenendes — Murnau, Staffelsee und durch das hügelige Voralpenland.',
  },
  {
    id: 'sonntag',
    day: 'Sonntag',
    shortDay: 'So',
    title: 'Genussrunde',
    gpxFile: 'so-genussrunde.gpx',
    color: '#dc2626',
    description: 'Kurze Abschlussrunde zum Genießen — perfekt für den letzten Tag mit müden Beinen.',
  },
  {
    id: 'alternative',
    day: 'Alternative',
    shortDay: 'Alt',
    title: 'Nordwest-Schleife',
    gpxFile: 'alternative.gpx',
    color: '#0891b2',
    description: 'Alternative Rundtour nach Nordwesten über Landsberg und Schongau. Hügeliges Voralpenland mit weiten Blicken.',
  },
];
