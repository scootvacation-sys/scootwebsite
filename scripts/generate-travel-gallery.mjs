import { mkdir, readdir, readFile, stat, unlink, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, '..');
const publicDir = path.join(rootDir, 'public');
const sourceDir = path.join(publicDir, 'Travel Pics');
const outputDir = path.join(publicDir, 'images', 'travel-gallery');
const manifestDir = path.join(rootDir, 'src', 'generated');
const manifestFile = path.join(manifestDir, 'travel-gallery-manifest.json');

const supportedExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp']);

const formatNumber = (value) => String(value).padStart(2, '0');

const getPublicPath = (absolutePath) =>
  `/${path.relative(publicDir, absolutePath).split(path.sep).join('/')}`;

const readImageMetadata = async (imagePath) => {
  const metadata = await sharp(imagePath).metadata();
  return {
    width: metadata.width ?? 0,
    height: metadata.height ?? 0,
    orientation:
      (metadata.width ?? 0) >= (metadata.height ?? 0) ? 'landscape' : 'portrait',
  };
};

const sourceEntries = (await readdir(sourceDir, { withFileTypes: true }))
  .filter((entry) => entry.isFile() && supportedExtensions.has(path.extname(entry.name).toLowerCase()))
  .sort((left, right) => left.name.localeCompare(right.name, undefined, { numeric: true }));

await mkdir(outputDir, { recursive: true });
await mkdir(manifestDir, { recursive: true });

let previousManifest = [];

try {
  previousManifest = JSON.parse(await readFile(manifestFile, 'utf8'));
} catch {
  previousManifest = [];
}

const previousEntriesByOutput = new Map(
  previousManifest
    .filter((entry) => typeof entry?.src === 'string')
    .map((entry) => [path.basename(entry.src), entry])
);

const manifest = [];
const expectedOutputFiles = new Set();
const seenHashes = new Map();

for (const entry of sourceEntries) {
  const sourcePath = path.join(sourceDir, entry.name);
  const sourceHash = createHash('sha1')
    .update(await readFile(sourcePath))
    .digest('hex');

  if (seenHashes.has(sourceHash)) {
    console.log(
      `Skipped duplicate travel photo ${entry.name} (matches ${seenHashes.get(sourceHash)}).`
    );
    continue;
  }

  seenHashes.set(sourceHash, entry.name);
  const nextIndex = manifest.length + 1;
  const outputFilename = `travel-gallery-${formatNumber(nextIndex)}.webp`;
  const outputPath = path.join(outputDir, outputFilename);
  const sourceStats = await stat(sourcePath);
  const previousEntry = previousEntriesByOutput.get(outputFilename);
  const matchesPreviousSource = previousEntry?.sourceHash === sourceHash;

  let shouldWrite = true;

  try {
    const outputStats = await stat(outputPath);
    shouldWrite = !matchesPreviousSource || outputStats.mtimeMs < sourceStats.mtimeMs;
  } catch {
    shouldWrite = true;
  }

  if (shouldWrite) {
    await sharp(sourcePath)
      .rotate()
      .resize({
        width: 1600,
        height: 1600,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({
        quality: 74,
        effort: 6,
      })
      .toFile(outputPath);
  }

  const metadata = await readImageMetadata(outputPath);
  const sequence = formatNumber(nextIndex);

  manifest.push({
    id: `travel-gallery-${sequence}`,
    sequence,
    src: getPublicPath(outputPath),
    alt: `Scoot Vacations travel gallery moment ${sequence}`,
    width: metadata.width,
    height: metadata.height,
    orientation: metadata.orientation,
    sourceName: entry.name,
    sourceHash,
  });

  expectedOutputFiles.add(outputFilename);
}

const outputEntries = await readdir(outputDir, { withFileTypes: true });
await Promise.all(
  outputEntries
    .filter((entry) => entry.isFile() && !expectedOutputFiles.has(entry.name))
    .map((entry) => unlink(path.join(outputDir, entry.name)))
);

await writeFile(manifestFile, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
console.log(`Generated travel gallery manifest with ${manifest.length} images.`);
