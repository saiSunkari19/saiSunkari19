#!/usr/bin/env node
// Build an ATS-safe PDF from vault/Resume.md — the canonical resume note.
//
//   node tools/resume-build.mjs
//
// Output: .vault-site/resume.html and .vault-site/Sai Krishna Sunkari - CV.pdf
// Both are gitignored. Uses headless Chrome for the PDF; no new npm deps.
//
// ATS rules honoured: single column, no images, no tables, no text boxes,
// real selectable text, standard fonts, plain heading hierarchy.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { micromark } from 'micromark';
import { gfm, gfmHtml } from 'micromark-extension-gfm';

const ROOT = new URL('..', import.meta.url).pathname;
const SRC = join(ROOT, 'vault', 'Resume.md');
// Own output dir: tools/vault-view.mjs wipes .vault-site/ on every build,
// which would delete the PDF.
const OUT = join(ROOT, '.resume');
const HTML = join(OUT, 'resume.html');
const PDF = join(OUT, 'Sai Krishna Sunkari - CV.pdf');

const CHROME = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
].find((p) => existsSync(p));

// --- read + strip frontmatter ---
const raw = readFileSync(SRC, 'utf8');
// Strip frontmatter, then start at the H1. Anything above the title is an
// editorial note for the vault reader and must never reach the PDF.
const md = raw
  .replace(/^---\n[\s\S]*?\n---\n?/, '')
  .replace(/^[\s\S]*?(?=^# )/m, '');

const body = micromark(md, {
  allowDangerousHtml: true,
  extensions: [gfm()],
  htmlExtensions: [gfmHtml()],
});

// The three lines under <h1> are the contact block: mark them up so they can
// be styled tighter than body copy.
const html = body.replace(
  /<h1>([\s\S]*?)<\/h1>\s*<p>([\s\S]*?)<\/p>\s*<p>([\s\S]*?)<\/p>\s*<p>([\s\S]*?)<\/p>/,
  (m, name, role, contact, stats) =>
    `<h1>${name}</h1><p class="role">${role}</p><p class="contact">${contact}</p><p class="stats">${stats}</p>`
);

const TARGET_PAGES = Number(process.argv.find((a) => a.startsWith('--pages='))?.split('=')[1] || 2);

// Auto-fit: shrink the type scale until the resume fits TARGET_PAGES.
// Resume content grows over time; this keeps the layout honest without
// hand-tuning font sizes every edit.
const SCALES = [10.0, 9.8, 9.6, 9.4, 9.2, 9.0, 8.8, 8.6, 8.4, 8.2, 8.0];

const render = (fs) => `<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>Sai Krishna Sunkari - CV</title><style>
@page { size: A4; margin: 13mm 14mm; }
* { box-sizing: border-box; }
body{margin:0;font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;
  font-size:${fs}pt;line-height:1.40;color:#111;-webkit-print-color-adjust:exact;}
h1{font-size:19pt;margin:0 0 2pt;letter-spacing:-.2pt;font-weight:700;}
.role{margin:0 0 5pt;font-size:10pt;font-weight:600;color:#1a1a1a;}
.contact,.stats{margin:0 0 3pt;font-size:8.6pt;color:#333;}
.stats{font-weight:600;color:#111;padding-bottom:6pt;border-bottom:1.2pt solid #111;margin-bottom:9pt;}
h2{font-size:10pt;text-transform:uppercase;letter-spacing:.7pt;font-weight:700;
  margin:12pt 0 5pt;padding-bottom:2pt;border-bottom:.6pt solid #999;
  break-after:avoid;page-break-after:avoid;}
h3{font-size:9.8pt;font-weight:700;margin:8pt 0 3pt;
  break-after:avoid;page-break-after:avoid;}
p{margin:0 0 5pt;}
ul{margin:0 0 6pt;padding-left:13pt;}
li{margin-bottom:2.6pt;break-inside:avoid;page-break-inside:avoid;}
a{color:#111;text-decoration:none;border-bottom:.4pt solid #bbb;}
strong{font-weight:700;}
h2+p,h2+ul{margin-top:0;}
.stack{display:inline-block;margin-top:2pt;font-size:.92em;color:#333;
  letter-spacing:.05pt;border-left:2pt solid #ccc;padding-left:5pt;}
li{margin-bottom:4pt;}
</style></head><body>${html}</body></html>`;

mkdirSync(OUT, { recursive: true });

if (!CHROME) {
  writeFileSync(HTML, render(9.6));
  console.log('wrote', HTML);
  console.log('No Chrome/Brave/Edge found. Open resume.html and print to PDF.');
  process.exit(0);
}

const toPdf = () =>
  execFileSync(CHROME, [
    '--headless',
    '--disable-gpu',
    '--no-pdf-header-footer',
    `--print-to-pdf=${PDF}`,
    'file://' + HTML,
  ], { stdio: 'ignore' });

const pageCount = () => {
  const buf = readFileSync(PDF);
  const m = buf.toString('latin1').match(/\/Count\s+(\d+)/);
  return m ? Number(m[1]) : 0;
};

let chosen = null;
for (const fs of SCALES) {
  writeFileSync(HTML, render(fs));
  toPdf();
  const n = pageCount();
  console.log(`  ${fs}pt -> ${n} page(s)`);
  if (n <= TARGET_PAGES) { chosen = { fs, n }; break; }
}

if (!chosen) {
  console.log('Could not reach the page target even at the smallest size.');
  console.log('Cut content in vault/Resume.md rather than shrinking further.');
} else {
  console.log(`wrote ${HTML}`);
  console.log(`wrote ${PDF}  (${chosen.n} pages at ${chosen.fs}pt)`);
}
