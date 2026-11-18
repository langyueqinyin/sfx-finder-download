import { copyFileSync, cpSync, existsSync, mkdirSync, rmSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const source = join(root, 'src');
const appRoot = resolve(root, '..', 'sfx-finder', 'Send to Friends');

const packages = [
  {
    source: join(appRoot, 'SFX Finder For Mac.zip'),
    destination: join(dist, 'downloads', 'SFX-Finder-for-Mac.zip'),
  },
  {
    source: join(appRoot, 'SFX-Finder_For Windows.zip'),
    destination: join(dist, 'downloads', 'SFX-Finder-for-Windows.zip'),
  },
];

for (const item of packages) {
  if (!existsSync(item.source)) {
    throw new Error(`Missing release package: ${item.source}`);
  }
  if (statSync(item.source).size < 1024) {
    throw new Error(`Release package is unexpectedly small: ${item.source}`);
  }
}

rmSync(dist, { recursive: true, force: true });
mkdirSync(join(dist, 'downloads'), { recursive: true });
cpSync(source, dist, { recursive: true });
for (const item of packages) copyFileSync(item.source, item.destination);
copyFileSync(join(root, '.nojekyll'), join(dist, '.nojekyll'));

console.log(`Built ${dist}`);
for (const item of packages) {
  console.log(`Copied ${item.destination}`);
}
