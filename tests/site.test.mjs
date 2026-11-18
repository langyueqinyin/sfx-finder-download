import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';

const root = new URL('..', import.meta.url).pathname;
const dist = join(root, 'dist');
const htmlPath = join(dist, 'index.html');
const cssPath = join(dist, 'styles.css');
const jsPath = join(dist, 'site.js');
const qrPath = join(dist, 'assets', 'qr-code.svg');
const macPath = join(dist, 'downloads', 'SFX-Finder-for-Mac.zip');
const windowsPath = join(dist, 'downloads', 'SFX-Finder-for-Windows.zip');

function page() {
  assert.ok(existsSync(htmlPath), 'dist/index.html must exist');
  return readFileSync(htmlPath, 'utf8');
}

test('page is English-first and identifies the product', () => {
  const html = page();
  assert.match(html, /<html lang="en">/);
  assert.match(html, /SFX Finder/);
  assert.match(html, /Search your sound library/);
});

test('page offers stable Mac and Windows downloads', () => {
  const html = page();
  assert.match(html, /downloads\/SFX-Finder-for-Mac\.zip/);
  assert.match(html, /downloads\/SFX-Finder-for-Windows\.zip/);
  for (const archive of [macPath, windowsPath]) {
    assert.ok(existsSync(archive), `${archive} must exist`);
    assert.ok(statSync(archive).size > 1024, `${archive} must not be empty`);
    execFileSync('unzip', ['-tqq', archive]);
  }
});

test('feedback uses the requested email and prefilled subject', () => {
  const html = page();
  assert.match(html, /mailto:wangziyang0517@gmail\.com\?subject=SFX%20Finder%20Feedback/);
});

test('privacy statement explicitly covers sensitive library data', () => {
  const html = page().toLowerCase();
  for (const phrase of [
    'runs entirely on your computer',
    'audio files',
    'filenames',
    'folder paths',
    'search history',
    'never uploaded',
    'no analytics',
    'no tracking cookies',
    'no account',
  ]) {
    assert.ok(html.includes(phrase), `missing privacy phrase: ${phrase}`);
  }
});

test('site has no remote scripts, fonts, pixels, or analytics', () => {
  const files = [htmlPath, cssPath, jsPath].map((path) => readFileSync(path, 'utf8')).join('\n');
  assert.doesNotMatch(files, /https?:\/\/(?!langyueqinyin\.github\.io\/sfx-finder-download)/i);
  assert.doesNotMatch(files, /googletagmanager|google-analytics|plausible|posthog|segment|mixpanel|facebook\.net/i);
  assert.doesNotMatch(files, /<iframe|<form/i);
});

test('permanent page URL and static QR asset are present', () => {
  const html = page();
  assert.match(html, /https:\/\/langyueqinyin\.github\.io\/sfx-finder-download\//);
  assert.match(html, /assets\/qr-code\.svg/);
  assert.ok(existsSync(qrPath), 'QR SVG must exist');
  const qr = readFileSync(qrPath, 'utf8');
  assert.match(qr, /<svg/);
  assert.match(qr, /aria-label="QR code/);
});

test('page includes installation and uninstall guidance', () => {
  const html = page();
  assert.match(html, /Right-click.*Open/s);
  assert.match(html, /Add Python to PATH/s);
  assert.match(html, /Application Support\/SFX Finder/);
});
