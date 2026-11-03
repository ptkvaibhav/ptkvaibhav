# Self-hosted fonts

Latin-subset WOFF2 files from Google Fonts, loaded with `next/font/local` in `lib/fonts.ts`.

| File | Family | License |
| :--- | :--- | :--- |
| `ibm-plex-sans.woff2` | IBM Plex Sans (variable 400–700) | SIL OFL 1.1 — `licenses/OFL-IBMPlex.txt` |
| `ibm-plex-mono-{400,500,600}.woff2` | IBM Plex Mono | SIL OFL 1.1 — `licenses/OFL-IBMPlex.txt` |
| `big-shoulders.woff2` | Big Shoulders (variable) | SIL OFL 1.1 — `licenses/OFL-BigShoulders.txt` |
| `big-shoulders-stencil.woff2` | Big Shoulders Stencil (variable) | SIL OFL 1.1 — `licenses/OFL-BigShoulders.txt` |
| `caveat.woff2` | Caveat (variable) | SIL OFL 1.1 — `licenses/OFL-Caveat.txt` |
| `special-elite.woff2` | Special Elite | Apache 2.0 — `licenses/Apache-2.0-SpecialElite.txt` |

Self-hosting keeps builds deterministic: no network fetch to the Google Fonts API at build time.
