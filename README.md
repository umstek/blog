# UMSTeK Blog

Personal blog of **Wickramaranga (UMSTeK)** — built fresh on Astro 7 with a custom
minimal theme. Deploys to [blog.umstek.com](https://blog.umstek.com) on Cloudflare
Pages.

This is a from-scratch rebuild. The previous site (an AstroPaper fork) lives on at
[umstek.github.io](https://umstek.github.io), frozen at cutover.

## Tech stack

- **Framework:** [Astro](https://astro.build) v7 (static output)
- **Styling:** [Tailwind CSS](https://tailwindcss.com) v4
- **Content:** Markdown + MDX via Astro content collections
- **Search:** [Pagefind](https://pagefind.app) (build-time index)
- **Comments:** [Giscus](https://giscus.app) (GitHub Discussions)
- **Math:** [KaTeX](https://katex.org)
- **OG images:** [Takumi](https://astro.build/integrations) (build-time, per-post)
- **Language:** TypeScript (strict), Node 24
- **Package manager:** [Bun](https://bun.sh)

## Commands

| Command           | Action                                         |
| :---------------- | :--------------------------------------------- |
| `bun install`     | Install dependencies                           |
| `bun dev`         | Start dev server at `localhost:4321`           |
| `bun build`       | Typecheck + build to `./dist/`                 |
| `bun preview`     | Preview the production build locally           |
| `bun sync`        | Regenerate Astro content collection types      |

## License

- **Blog content** (`src/content/blog/`): CC-BY-SA-4.0
- **Source code:** MIT
