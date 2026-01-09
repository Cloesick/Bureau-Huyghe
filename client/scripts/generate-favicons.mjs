import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');

const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 }
];

async function generateFavicons() {
  const input = path.join(publicDir, 'logo Bureau Huyghe.png');
  
  // Process each size
  for (const { name, size } of sizes) {
    await sharp(input)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .toFile(path.join(publicDir, name));
    
    console.log(`Generated ${name}`);
  }

  // Generate Safari pinned tab SVG
  await sharp(input)
    .resize(512, 512)
    .toFile(path.join(publicDir, 'safari-pinned-tab.svg'));
  
  console.log('Generated safari-pinned-tab.svg');
}

generateFavicons().catch(console.error);
