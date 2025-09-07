import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true });
}

async function createSprite() {
  const flagsDir = path.resolve(__dirname, '../src/assets/flags');
  const outputPath = path.join(flagsDir, 'flags-sprite.png');

  const files = ['spain.png', 'england.png', 'italy.png'].map((f) =>
    path.join(flagsDir, f)
  );

  for (const file of files) {
    if (!fs.existsSync(file)) {
      throw new Error(`Missing flag image: ${file}`);
    }
  }

  // Normalize all flags to the same size (width x height)
  const width = 64; // per-frame width
  const height = 48; // per-frame height

  const resizedBuffers = await Promise.all(
    files.map((file) =>
      sharp(file).resize({ width, height, fit: 'cover' }).png().toBuffer()
    )
  );

  // Create a blank canvas that fits all flags horizontally
  const spriteWidth = width * resizedBuffers.length;
  const spriteHeight = height;

  let compositeInputs = [];
  for (let i = 0; i < resizedBuffers.length; i++) {
    compositeInputs.push({ input: resizedBuffers[i], left: i * width, top: 0 });
  }

  const sprite = await sharp({
    create: {
      width: spriteWidth,
      height: spriteHeight,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite(compositeInputs)
    .png()
    .toBuffer();

  await ensureDir(flagsDir);
  await fs.promises.writeFile(outputPath, sprite);

  console.log('Sprite created at', outputPath);
  console.log('Frame size:', width, 'x', height);
}

createSprite().catch((err) => {
  console.error(err);
  process.exit(1);
});
