# 🚴 Radtour Pfaffenwinkel 2026

Begleit-App für die Sternfahrt im Pfaffenwinkel & rund um den Ammersee,
**4.–7. Juni 2026**, ab Peißenberg. Routen, Höhenprofile, Live-Wetter,
GPS-Navigation und ein druckbares Roadbook — auch offline nutzbar.

Live: <https://dendak.github.io/radtour-pfaffenwinkel/>

## Features

- **5 Tagesrouten** auf einer interaktiven CyclOSM-Karte (Leaflet) mit
  Höhenprofil (recharts), POIs, Fotos und Unterkunfts-Infos.
- **Live-Wetter** pro Tag über [Open-Meteo](https://open-meteo.com/).
- **Live-Navigation** (GPS): eigene Position auf der Karte und im Höhenprofil,
  zurückgelegte/verbleibende Distanz, nächstes Ziel und Off-Route-Warnung.
- **Offline / PWA**: installierbar auf dem Handy-Homescreen. Kartenkacheln,
  Routen, Fotos und das zuletzt geladene Wetter werden gecacht und stehen
  unterwegs ohne Netz zur Verfügung.
- **Tour-Überblick**: Gesamtkilometer & Höhenmeter, Tages-Timeline.
- **Packliste** mit abhakbaren Punkten (im Browser gespeichert) und eigenen
  Einträgen.
- **Teilen & Export**: GPX-Download pro Tag, Teilen-Button, QR-Code für
  Mitfahrer und ein druckbares Roadbook (Cue-Sheet).

## Entwicklung

```bash
npm install
npm run dev        # Dev-Server (http://localhost:5173/radtour-pfaffenwinkel/)
npm run build      # Typecheck + Production-Build nach dist/
npm run preview    # Production-Build lokal testen (inkl. Service Worker)
npm run lint       # ESLint
npm run deploy     # Build + Deploy auf GitHub Pages (gh-pages)
```

### App-Icons

Die PWA-Icons werden aus [`public/icon.svg`](public/icon.svg) erzeugt:

```bash
npm run gen-icons   # schreibt pwa-*.png + apple-touch-icon.png nach public/
```

## Daten pflegen

Alle Inhalte liegen als TypeScript-Daten unter `src/data/`:

- `routes.ts` — Tagesrouten (verweisen auf GPX-Dateien in `public/gpx/`)
- `pois.ts` — Sehenswürdigkeiten, Einkehr, Cafés (mit `routeId`)
- `accommodation.ts` — Unterkunft
- `knowledge.ts` — Wissens-Sektion
- `packing.ts` — Standard-Packliste

## Tech-Stack

React 19 · TypeScript · Vite · Leaflet / react-leaflet · recharts ·
vite-plugin-pwa (Workbox) · Open-Meteo · CyclOSM.

---

Erstellt mit ❤️ und Claude.
