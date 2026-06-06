import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, '..', 'data.js');
const outPath = path.join(__dirname, '..', 'translations.en.js');

const source = fs.readFileSync(dataPath, 'utf8');
const enMap = {};
const idRe = /^\s+id:\s*(\d+),/gm;
const descRe = /^\s+description:\s*"((?:\\.|[^"\\])*)",/gm;
const ids = [...source.matchAll(idRe)].map(m => Number(m[1]));
const descs = [...source.matchAll(descRe)].map(m => m[1].replace(/\\"/g, '"'));
if (ids.length !== descs.length) {
  console.warn(`Warning: ${ids.length} ids vs ${descs.length} descriptions`);
}
const assetBlocks = ids.map((id, i) => ({ id, description: descs[i] }));

const phraseMap = [
  [/Situs populer untuk/gi, 'Popular site for'],
  [/Platform animasi/gi, 'Animation platform for'],
  [/Koleksi aset game gratis/gi, 'Free game asset collection with'],
  [/Galeri model 3D/gi, 'Interactive 3D model gallery with'],
  [/Marketplace model 3D gratis/gi, 'Free 3D model marketplace for'],
  [/Sumber tekstur PBR/gi, 'High-quality PBR texture source with'],
  [/Perpustakaan tekstur CC0/gi, 'CC0 texture library for'],
  [/Koleksi tekstur gratis/gi, 'Free texture collection for'],
  [/Tekstur gratis berkualitas tinggi/gi, 'High-quality free textures for'],
  [/gratis/gi, 'free'],
  [/untuk/gi, 'for'],
  [/dan/gi, 'and'],
  [/yang/gi, 'that'],
  [/dengan/gi, 'with'],
  [/dalam/gi, 'in'],
  [/proyek/gi, 'projects'],
  [/kreator/gi, 'creators'],
  [/pengembang indie/gi, 'indie developers'],
  [/visualisasi arsitektur/gi, 'architectural visualization'],
  [/game/gi, 'games'],
  [/model 3D/gi, '3D models'],
  [/suara/gi, 'audio'],
  [/font/gi, 'fonts'],
  [/gambar/gi, 'images'],
  [/mudah digunakan/gi, 'easy to use'],
  [/berkualitas tinggi/gi, 'high quality'],
];

function roughTranslate(idText) {
  let text = idText;
  phraseMap.forEach(([pattern, replacement]) => {
    text = text.replace(pattern, replacement);
  });
  return text.charAt(0).toUpperCase() + text.slice(1);
}

assetBlocks.forEach(({ id, description }) => {
  if (!id || !description) return;
  enMap[id] = { description: roughTranslate(description) };
});

const output = `/** Auto-generated English copy for asset descriptions. Regenerate: node scripts/build-i18n.mjs */
export default ${JSON.stringify(enMap, null, 2)};
`;

fs.writeFileSync(outPath, output, 'utf8');
console.log(`Wrote ${Object.keys(enMap).length} entries to translations.en.js`);
