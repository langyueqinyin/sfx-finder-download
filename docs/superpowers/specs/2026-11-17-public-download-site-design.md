# SFX Finder Public Download Site Design

## Goal

Create a public, English-only landing page that lets editors understand, trust, download, and give feedback on SFX Finder from one permanent URL suitable for a QR code.

## Audience and promise

The primary audience is film editors in the Mentorship Program, with the page open to anyone. The page must immediately explain that SFX Finder is a local search tool for the shared numbered sound-effects library and that it does not transmit library data.

## Information architecture

The page is a single static document with this progression:

1. Hero: what SFX Finder does, Mac and Windows download buttons, current version.
2. Product demonstration: an illustrative search result showing natural-language search and local preview.
3. Local-only privacy statement: explicit list of data that never leaves the computer.
4. Three-step setup: download, choose the shared library folder, search and copy selected sounds.
5. Platform notes: Mac Gatekeeper instructions and Windows Python requirement for the current Windows package.
6. Feedback: `mailto:wangziyang0517@gmail.com` with a prefilled subject and issue template.
7. QR code and share instruction.

## Privacy and security claims

The site and app messaging will state only behavior confirmed by the current implementation:

- No account is required.
- Audio files, filenames, folder paths, catalog descriptions, searches, and selections are not uploaded.
- The app runs on the user's computer and stores its index and settings locally.
- The website uses no analytics, tracking cookies, forms, or third-party fonts.
- Internet access is only needed to visit the page and download the package.
- Copying occurs only after the user chooses a destination.

The feedback link opens the visitor's email client; the site does not collect or relay the message.

## Distribution architecture

The site is buildless HTML/CSS/JavaScript in `dist/`. Both packages are copied into `dist/downloads/` under stable filenames. GitHub Pages serves the page and files from one repository. The QR code points to `https://langyueqinyin.github.io/sfx-finder-download/`, never directly to a versioned archive.

## Visual direction

The design is an editorial tool manual crossed with a professional post-production interface: warm off-white paper, near-black ink, electric signal green, monospaced technical labels, and a dark waveform/search demonstration. It should feel trustworthy, specific, and made by an editor rather than like generic software marketing.

## Error and maintenance behavior

- Download links use stable local paths and display package size and requirements.
- If JavaScript is disabled, all core content and download links remain available.
- The QR image is static and has the destination printed beside it.
- Updating a release means replacing the two archives and updating version/date text; the public URL and QR code remain unchanged.

## Verification

Automated tests verify that both packages exist, download links resolve, the feedback email is correct, the privacy claims are present, no tracking or remote assets are included, the page has an English language declaration, and the QR asset exists. Browser QA covers desktop/mobile layout, keyboard focus, downloads, and mail link behavior.
