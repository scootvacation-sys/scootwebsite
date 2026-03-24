import { mkdir, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, '..');
const outputDir = path.join(rootDir, 'src', 'generated');

const extractFrameNumber = (filename) => {
  const match = filename.match(/(\d+)(?=\D*$)/);
  return match ? Number(match[1]) : Number.POSITIVE_INFINITY;
};

const getFrameStem = (filename) => filename.replace(/\.[^.]+$/, '');
const extensionPriority = ['.webp', '.png', '.jpg', '.jpeg'];

const sequenceConfigs = [
  {
    inputDir: path.join(rootDir, 'public', 'images'),
    outputFile: path.join(outputDir, 'ezgif-manifest.json'),
    publicDir: 'images',
    label: 'default',
  },
  {
    inputDir: path.join(rootDir, 'public', 'Night image'),
    outputFile: path.join(outputDir, 'night-ezgif-manifest.json'),
    publicDir: 'Night image',
    label: 'night',
  },
];

const buildManifest = async ({ inputDir, outputFile, publicDir, label }) => {
  const entries = await readdir(inputDir, { withFileTypes: true });
  const manifest = Array.from(
    entries
      .filter((entry) => entry.isFile() && entry.name.toLowerCase().startsWith('ezgif-'))
      .reduce((frames, entry) => {
        const extension = path.extname(entry.name).toLowerCase();
        const stem = getFrameStem(entry.name);
        const existing = frames.get(stem);

        if (!existing) {
          frames.set(stem, entry.name);
          return frames;
        }

        const currentPriority = extensionPriority.indexOf(extension);
        const existingPriority = extensionPriority.indexOf(
          path.extname(existing).toLowerCase()
        );

        if (
          currentPriority !== -1 &&
          (existingPriority === -1 || currentPriority < existingPriority)
        ) {
          frames.set(stem, entry.name);
        }

        return frames;
      }, new Map())
      .values()
  )
    .sort((left, right) => {
      const numberDiff = extractFrameNumber(left) - extractFrameNumber(right);
      return numberDiff || left.localeCompare(right);
    })
    .map((filename) => `/${publicDir}/${filename}`);

  await writeFile(outputFile, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  console.log(`Generated ${label} ezgif manifest with ${manifest.length} frames.`);
};

await mkdir(outputDir, { recursive: true });
await Promise.all(sequenceConfigs.map(buildManifest));
