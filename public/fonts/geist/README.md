# Geist fonts

Unmodified variable WOFF2 fonts from [vercel/geist-font](https://github.com/vercel/geist-font), pinned to commit `10dc7658f13c38a474cde201bb09a4617267545b`.

- `Geist-Variable.woff2`: `fonts/Geist/webfonts/Geist[wght].woff2`
- `GeistMono-Variable.woff2`: `fonts/GeistMono/webfonts/GeistMono[wght].woff2`
- License: SIL Open Font License 1.1, included in `OFL.txt`.

The marketing app loads these files through `next/font/local`. Sans is preloaded; Mono loads when code or monospace UI is rendered. No external font request is required at build or runtime. The PyColors wordmark adapts optically weighted static outlines from Geist Regular for its compact lowercase lettering, including oblique cuts on the l and r. The integrated p and standalone P use a simple upright stem, a closed round bowl and subtly softened corners, with optical adjustments for each size. Its rendering does not depend on loading the web font.
