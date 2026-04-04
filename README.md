# Learn Simple Power Automate

Vanilla **Vite** site for learning **Microsoft Power Automate** (flows, triggers, connectors, expressions, error handling). Styling uses **Tailwind CSS v4**, **daisyUI**, **Font Awesome**, **AOS** (home page), and **Prism** (code samples on the learn page). There is **no sign-in**; you practice in your own tenant or trial via the [Power Automate portal](https://make.powerautomate.com/).

## Scripts

```bash
npm install
npm run dev      # local dev server (default http://localhost:5173)
npm run build    # production output in dist/
npm run preview  # serve dist/ locally
```

## Project layout

- `index.html` — home (daisyUI drawer, hero, cards, footer)
- `learn.html` — lessons (drawer-end sidebar, collapse FAQ, Prism blocks)
- `src/main.js` / `src/learn-entry.js` — entry points
- `src/style.css` — Tailwind + daisyUI theme `powerautomate` (orange primary)
- `public/` — static files copied to `dist/` (e.g. legacy `pages/learn.html` redirect)

## Deploy to GitHub Pages (Actions)

Deployment runs **only from `main`**. The workflow installs dependencies, runs `npm run build`, and uploads **`dist/`** contents.

1. Merge to `main` and push.
2. **Settings → Pages → Source: GitHub Actions**
3. Confirm **Deploy GitHub Pages** succeeds under **Actions**

Site URL: `https://<username>.github.io/<repository-name>/`

Older links to `pages/learn.html` are redirected from `public/pages/learn.html`.

## Libraries

- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/) + [@tailwindcss/vite](https://tailwindcss.com/docs/installation/using-vite)
- [daisyUI](https://daisyui.com/)
- [@fortawesome/fontawesome-free](https://fontawesome.com/)
- [AOS](https://michalsnik.github.io/aos/)
- [Prism](https://prismjs.com/)

## License

See `LICENSE` if present; add one for public sharing if needed.
