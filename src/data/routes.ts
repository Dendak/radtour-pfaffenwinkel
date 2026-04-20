import type { RouteConfig } from './types';

export const routes: RouteConfig[] = [
  {
    id: 'donnerstag',
    day: 'Donnerstag',
    shortDay: 'Do',
    title: 'Ammersee-Große Runde',
    gpxFile: 'do-ammersee-gross.gpx',
    color: '#2563eb',
    date: '2026-06-04',
    description:
      'Die erste Königstour. Über den Ammer-Radweg nach Weilheim, dann auf dem Ammersee-Radweg via Raisting (Erdfunkstelle) nach Dießen. Am Westufer durch Utting und Schondorf nach Herrsching — der längsten Seepromenade Bayerns. Anstieg zum Kloster Andechs mit legendärer Brauerei, weiter durchs Kiental nach Pähl und zurück über Weilheim. Überwiegend auf ausgeschilderten Radwegen (Ammer- und Ammersee-Radweg). ~85 km, ~600 HM.',
  },
  {
    id: 'freitag',
    day: 'Freitag',
    shortDay: 'Fr',
    title: 'Königstour: Wies & Forggensee',
    gpxFile: 'fr-koenigstour.gpx',
    color: '#d946ef',
    date: '2026-06-05',
    description:
      'Die Highlight-Etappe der Woche. Auf dem König-Ludwig-Radweg über Peiting und Rottenbuch zur UNESCO-Welterbe Wieskirche. Weiter durch Steingaden und Halblech nach Roßhaupten zum Forggensee. Am Ostufer entlang mit Blick auf Schloss Neuschwanstein bei Waltenhofen. Über den Lech-Radweg via Lechbruck (Flößersteg) zurück nach Schongau und Peißenberg. Sportliche Tour durchs Voralpenland, aber fast durchgehend auf markierten Radwegen. ~95 km, ~900 HM.',
  },
  {
    id: 'samstag',
    day: 'Samstag',
    shortDay: 'Sa',
    title: 'Staffelsee & Murnau',
    gpxFile: 'sa-staffelsee-murnau.gpx',
    color: '#ea580c',
    date: '2026-06-06',
    description:
      'Moderate Tour in die Künstlerlandschaft des Blauen Reiters. Über Eberfing und Uffing auf dem Staffelsee-Radweg einmal um den See — einen der wärmsten Voralpenseen mit sieben Inseln. In Murnau das Münter-Haus (Kandinsky), Abstecher zum Murnauer Moos (Zugspitz-Panorama). Rückweg über kleine Landstraßen. ~55 km, ~400 HM. Gruppe 1 reist am Abend ab.',
  },
  {
    id: 'sonntag',
    day: 'Sonntag',
    shortDay: 'So',
    title: 'Osterseen-Runde',
    gpxFile: 'so-osterseen.gpx',
    color: '#dc2626',
    date: '2026-06-07',
    description:
      'Kurze Vormittagstour für Gruppe 2 vor der Heimreise. Über Sindelsdorf zum Naturschutzgebiet Osterseen — über 20 kleine Moorseen bei Iffeldorf, eines der schönsten Biotope Bayerns. Weiter ans Südufer des Starnberger Sees nach Seeshaupt, zurück über Penzberg. Fast durchgehend auf Radwegen, flach bis leicht wellig. ~40 km, ~250 HM.',
  },
  {
    id: 'alt-lechtal',
    day: 'Alternative 1',
    shortDay: 'A1',
    title: 'Lechtal & Landsberg',
    gpxFile: 'alt-lechtal.gpx',
    color: '#0891b2',
    description:
      'Ersatz- oder Schlechtwetter-Tour. Auf dem Lech-Radweg nach Norden durch Peiting, Apfeldorf und Kinsau nach Landsberg am Lech — eine der besterhaltenen Altstädte Bayerns (Bayertor, Lechwehr, barocker Hauptplatz). Rückweg über Schongau. Weitgehend flach am Fluss, durchgehender ausgebauter Radweg. ~75 km, ~350 HM.',
  },
  {
    id: 'alt-hohenpeissenberg',
    day: 'Alternative 2',
    shortDay: 'A2',
    title: 'Hohenpeißenberg & Ammerschlucht',
    gpxFile: 'alt-hohenpeissenberg.gpx',
    color: '#059669',
    description:
      'Kurze, anspruchsvolle Runde direkt vor der Haustür. Steile Auffahrt auf den Hohen Peißenberg (988 m, „Bayerischer Rigi") mit Wallfahrtskirche und 360°-Alpenblick. Abfahrt nach Peiting, dann durch die Ammerschlucht (eine der wildesten Flussschluchten Bayerns) zurück. Wenig Radweg, dafür ruhige Nebenstraßen und Waldwege. ~25 km, ~400 HM.',
  },
];
