import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/radtour-pfaffenwinkel/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg', 'apple-touch-icon.png', 'favicon.svg'],
      manifest: {
        name: 'Radtour Pfaffenwinkel 2026',
        short_name: 'Radtour',
        description:
          'Sternfahrt Pfaffenwinkel & Ammersee, 4.–7. Juni 2026 — Routen, Höhenprofile, Wetter, Navigation & Roadbook.',
        lang: 'de',
        theme_color: '#1e3a5f',
        background_color: '#1e3a5f',
        display: 'standalone',
        orientation: 'any',
        categories: ['travel', 'navigation', 'sports'],
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'pwa-maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        // Precache the app shell plus routes, photos and icons so the whole
        // tour works offline once it has been opened with a connection.
        globPatterns: ['**/*.{js,css,html,svg,png,jpg,jpeg,gpx,ico,woff2}'],
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
        navigateFallback: 'index.html',
        runtimeCaching: [
          {
            // Map tiles (OSM base + CyclOSM overlay) — keep them once seen.
            urlPattern: ({ url }) =>
              url.hostname.endsWith('tile.openstreetmap.org') ||
              url.hostname.endsWith('tile-cyclosm.openstreetmap.fr'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'map-tiles',
              expiration: { maxEntries: 2000, maxAgeSeconds: 60 * 60 * 24 * 60 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Leaflet default marker images served from unpkg.
            urlPattern: ({ url }) => url.hostname === 'unpkg.com',
            handler: 'CacheFirst',
            options: {
              cacheName: 'leaflet-assets',
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Weather forecast — show the last response when offline.
            urlPattern: ({ url }) => url.hostname === 'api.open-meteo.com',
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'weather',
              expiration: { maxEntries: 32, maxAgeSeconds: 60 * 60 * 6 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
      devOptions: {
        enabled: false,
      },
    }),
  ],
});
