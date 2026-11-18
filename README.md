# SFX Finder download site

Public, English-only download page for SFX Finder.

## Build and verify

```bash
npm run verify
```

The build copies the current packages from:

- `../sfx-finder/Send to Friends/SFX Finder For Mac.zip`
- `../sfx-finder/Send to Friends/SFX-Finder_For Windows.zip`

into stable URLs under `dist/downloads/`.

## Preview locally

```bash
python3 -m http.server 4173 --directory dist
```

Open `http://127.0.0.1:4173/`.

## Update a release

1. Replace the package in `../sfx-finder/Send to Friends/` using the same filename.
2. Update the version and package size text in `src/index.html`.
3. Run `npm run verify`.
4. Publish `dist/` to GitHub Pages.

The permanent page and QR destination remain:

`https://langyueqinyin.github.io/sfx-finder-download/`

Feedback opens a visitor's email client and is addressed to `wangziyang0517@gmail.com`. The site intentionally contains no forms, analytics, tracking cookies, remote fonts, or third-party scripts.
