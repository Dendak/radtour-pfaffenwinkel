import type { RouteConfig } from './types';

export const routes: RouteConfig[] = [
  {
    id: 'donnerstag',
    day: 'Donnerstag',
    shortDay: 'Do',
    title: 'Ammersee-Umrundung',
    gpxFile: 'do-ammersee.gpx',
    color: '#2563eb',
    description: 'Rund um den Ammersee über Dießen, Herrsching und Schondorf. Flache Strecke entlang des Seeufers mit Alpenpanorama.',
  },
  {
    id: 'freitag',
    day: 'Freitag',
    shortDay: 'Fr',
    title: 'Wieskirche & Schongau',
    gpxFile: 'fr-wieskirche.gpx',
    color: '#d946ef',
    description: 'Zur UNESCO-Welterbe Wieskirche über Steingaden, zurück über die mittelalterliche Altstadt von Schongau.',
  },
  {
    id: 'samstag',
    day: 'Samstag',
    shortDay: 'Sa',
    title: 'Murnau & Staffelsee',
    gpxFile: 'sa-lange-tour.gpx',
    color: '#ea580c',
    description: 'Durch das Murnauer Moos zum Staffelsee und in die Künstlerstadt Murnau — Heimat des Blauen Reiters.',
  },
  {
    id: 'sonntag',
    day: 'Sonntag',
    shortDay: 'So',
    title: 'Osterseen & Seeshaupt',
    gpxFile: 'so-genussrunde.gpx',
    color: '#dc2626',
    description: 'Gemütliche Runde durch die Osterseenlandschaft und ans Südufer des Starnberger Sees.',
  },
  {
    id: 'alternative',
    day: 'Alternative',
    shortDay: 'Alt',
    title: 'Lechtal & Landsberg',
    gpxFile: 'alternative.gpx',
    color: '#0369a1',
    description: 'Große Runde durch das Lechtal bis nach Landsberg, zurück über Schongau und Peiting.',
  },
];
