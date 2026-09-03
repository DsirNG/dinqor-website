import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputImage = path.join(__dirname, '../public/logo-512.png');
const outputDir = path.join(__dirname, '../public');

async function generateIcons() {
  if (!fs.existsSync(inputImage)) {
    console.error('Source image not found:', inputImage);
    return;
  }

  console.log('Generating icons...');

  try {
    // 1. Generate Favicon (32x32)
    await sharp(inputImage)
      .resize(32, 32)
      .toFile(path.join(outputDir, 'favicon.ico'));
    console.log('✅ favicon.ico created');

    // 2. Generate Apple Touch Icon (180x180)
    await sharp(inputImage)
      .resize(180, 180)
      .toFile(path.join(outputDir, 'apple-touch-icon.png'));
    console.log('✅ apple-touch-icon.png created');

    // 3. Generate Android Chrome / PWA icons (192x192 & 512x512)
    await sharp(inputImage)
      .resize(192, 192)
      .toFile(path.join(outputDir, 'icon-192.png'));
    console.log('✅ icon-192.png created');
    
    // Original is 512, just copy it to icon-512.png to keep convention if needed
    fs.copyFileSync(inputImage, path.join(outputDir, 'icon-512.png'));
    console.log('✅ icon-512.png created');

    console.log('All icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generateIcons();
