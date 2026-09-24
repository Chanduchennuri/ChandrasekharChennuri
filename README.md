# Chandrasekhar Chennuri — Portfolio

Single-page portfolio: **Vite + React 18 + TypeScript + Tailwind CSS + shadcn/ui-style components**.

| Piece | Tool |
|---|---|
| 3D background (Lorenz strange attractor, integrated in `src/lib/lorenz.ts`) | three.js + @react-three/fiber |
| Rigid-body physics playground (draggable skill tags) | Matter.js |
| Spring-driven magnetic links with sine-wave underline, scroll reveals | Framer Motion |
| UI primitives (Tabs, Button, Card, Badge) | Radix UI + class-variance-authority + tailwind-merge |
| GitHub | Live GitHub REST API for `Chanduchennuri`, falls back to local data |
| Tests | Vitest |

## Run locally
Requires Node 18+ (20 recommended).
```bash
npm install
npm run dev        # http://localhost:5173
npm test           # unit tests (Lorenz math + class merging)
npm run typecheck
npm run build && npm run preview   # production build at http://localhost:4173
```

## Customize
- Content: `src/data/profile.ts` (links, jobs, projects, skills, certs).
- **Check the LinkedIn URL** in that file (resume and README list different ones) and the CGPA (8.6 vs 8.8).
- Avatar: replace `public/avatar.jpg`.
- Add more shadcn components: `npx shadcn@latest add dialog` (`components.json` is preconfigured).

## Deploy to GitHub Pages
1. Create a repo (e.g. `portfolio`) and push this project to `main`:
   ```bash
   git init && git add . && git commit -m "init"
   git branch -M main
   git remote add origin https://github.com/Chanduchennuri/portfolio.git
   git push -u origin main
   ```
2. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. The included workflow (`.github/workflows/deploy.yml`) runs tests, builds with `VITE_BASE=/<repo-name>/`, and deploys. Site: `https://chanduchennuri.github.io/portfolio/`.
4. For a `<user>.github.io` repo, set `VITE_BASE: /` in the workflow.

Manual local check of the Pages build: `VITE_BASE=/portfolio/ npm run build && npm run preview`.

## Deploy to Vercel
**Dashboard:** vercel.com → *Add New → Project* → import the GitHub repo. Framework preset **Vite** is detected (`npm run build`, output `dist`). No env vars needed. Deploy.

**CLI:**
```bash
npm i -g vercel
vercel          # preview
vercel --prod   # production
```
Every push to `main` redeploys automatically.

## Notes
- The GitHub panel calls `api.github.com` unauthenticated (60 requests/hour per IP); on failure the local snapshot is shown.
- The custom cursor and 3D background are disabled/simplified on touch devices; the attractor is fixed, low-opacity and non-interactive.
