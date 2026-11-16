// AWE SURGE — the entry program (Node 22, standard library only).
//
// The entry is one image: entry.png beside this file. The program hands it
// in by copying it, byte for byte, to the output directory as entry.png.
// It is deterministic: every run writes the same bytes, because it only
// copies a fixed file and never generates or alters anything.
//
// Run it locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, 'entry.png');
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const target = join(outDir, 'entry.png');

if (!existsSync(source)) {
  throw new Error(`entry image missing: ${source}`);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

const bytes = statSync(target).size;
console.log(`wrote ${target} (${bytes} bytes)`);
