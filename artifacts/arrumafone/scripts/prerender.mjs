import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

// Injeta o HTML pré-renderizado dentro de <div id="root"> para que crawlers que
// não executam JavaScript (Rank Math, por exemplo) encontrem títulos, textos e
// links já no HTML servido. O client hidrata esse mesmo conteúdo em main.tsx.

const packageDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDir = path.join(packageDir, 'dist', 'public');
const ssrBundle = path.join(packageDir, 'dist', 'prerender', 'prerender.js');

const { render } = await import(pathToFileURL(ssrBundle).href);

const pages = [
  { route: '/', file: 'index.html' },
  { route: '/avaliacao', file: 'avaliacao/index.html' },
];

const marker = '<div id="root"></div>';

for (const page of pages) {
  const target = path.join(outputDir, page.file);
  const html = await readFile(target, 'utf8');
  if (!html.includes(marker)) {
    throw new Error(`Prerender marker not found in ${page.file}`);
  }
  const rendered = render(page.route);
  await writeFile(target, html.replace(marker, `<div id="root">${rendered}</div>`));
  console.log(`prerendered ${page.route} -> ${page.file} (${rendered.length} chars)`);
}
