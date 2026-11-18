# SFX Finder Public Download Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and package an English-only, privacy-forward public download page for SFX Finder with Mac/Windows downloads, QR sharing, and email feedback.

**Architecture:** A buildless static site lives in `dist/` and ships the two existing archives under stable filenames. A small Node test suite validates content, privacy boundaries, and distributable assets without adding runtime dependencies.

**Tech Stack:** HTML5, CSS, vanilla JavaScript, Node.js built-in test runner, GitHub Pages.

---

### Task 1: Distribution contract tests

**Files:**
- Create: `tests/site.test.mjs`
- Create: `package.json`

- [ ] Write tests that require English metadata, both download files, the feedback mail link, local-only privacy copy, no external scripts/fonts/analytics, and a QR asset.
- [ ] Run `npm test` and verify it fails because `dist/index.html` does not exist.

### Task 2: Static landing page

**Files:**
- Create: `src/index.html`
- Create: `src/styles.css`
- Create: `src/site.js`
- Create: `src/assets/qr-code.svg`
- Create: `scripts/build.mjs`

- [ ] Implement the full English page using semantic HTML and local assets only.
- [ ] Implement responsive editorial styling, accessible focus states, reduced-motion behavior, and progressive enhancement.
- [ ] Generate a static QR code for `https://langyueqinyin.github.io/sfx-finder-download/` and print the URL beside it.
- [ ] Build into `dist/` and run `npm test` until all tests pass.

### Task 3: Package integration and handoff

**Files:**
- Copy: `../sfx-finder/Send to Friends/SFX Finder For Mac.zip` to `dist/downloads/SFX-Finder-for-Mac.zip`
- Copy: `../sfx-finder/Send to Friends/SFX-Finder_For Windows.zip` to `dist/downloads/SFX-Finder-for-Windows.zip`
- Create: `README.md`
- Create: `.nojekyll`

- [ ] Add a build step that copies both current packages and fails clearly when either source is missing.
- [ ] Document package replacement, local preview, testing, GitHub Pages publishing, and feedback address.
- [ ] Run a local HTTP server and verify the page at desktop and mobile sizes.
- [ ] Inspect both download responses and the `mailto:` URL.
- [ ] Package the ready-to-publish site even if GitHub authentication is unavailable.

### Task 4: GitHub publication

**Files:**
- Create during deployment: `.github/workflows/pages.yml` only if GitHub Pages requires an Actions workflow.

- [ ] Reauthenticate `gh` for `langyueqinyin`.
- [ ] Create the public repository `langyueqinyin/sfx-finder-download`.
- [ ] Push the verified static site.
- [ ] Enable GitHub Pages and verify the returned public URL.
- [ ] Confirm the QR code resolves to the same permanent URL.
