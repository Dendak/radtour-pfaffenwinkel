// Generates PWA raster icons from public/icon.svg
// Run with: npm run gen-icons
import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const svg = readFileSync(join(root, 'public', 'icon.svg'));
const out = (name) => join(root, 'public', name);

const targets = [
  { file: 'pwa-192x192.png', size: 192, maskable: false },
  { file: 'pwa-512x512.png', size: 512, maskable: false },
  { file: 'apple-touch-icon.png', size: 180, maskable: false },
  // Maskable: render the artwork at 80% inside the safe zone on a solid backdrop
  { file: 'pwa-maskable-512x512.png', size: 512, maskable: true },
];

for (const t of targets) {
  if (t.maskable) {
    const inner = Math.round(t.size * 0.8);
    const art = await sharp(svg).resize(inner, inner).png().toBuffer();
    await sharp({
      create: {
        width: t.size,
        height: t.size,
        channels: 4,
        background: '#1e3a5f',
      },
    })
      .composite([{ input: art, gravity: 'center' }])
      .png()
      .toFile(out(t.file));
  } else {
    await sharp(svg).resize(t.size, t.size).png().toFile(out(t.file));
  }
  console.log('✓', t.file);
}
