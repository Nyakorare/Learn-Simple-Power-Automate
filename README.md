# Learn Simple Power Automate

Static HTML/CSS/JS learning outline for **Microsoft Power Automate** (flows, triggers, connectors, expressions, and error handling). There is **no sign-in** on this site; you practice in your own tenant or trial using the official [Power Automate portal](https://make.powerautomate.com/).

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
npx --yes serve .
```

Then visit the URL shown (for example `http://localhost:3000`).

## Deploy to GitHub Pages (Actions)

Deployment runs **only from `main`**. Pushes to other branches (for example `dev`) do **not** publish the site.

1. Merge your work into `main` and push: `git checkout main && git merge dev && git push origin main` (or open a pull request into `main`).
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions** (not “Deploy from a branch”).
4. The workflow [`.github/workflows/pages.yml`](.github/workflows/pages.yml) builds a small `_site` artifact (only `index.html`, `.nojekyll`, `css/`, `js/`, `pages/`) and publishes it on every push to `main`.
5. Optional: in **Actions → Deploy GitHub Pages → Run workflow**, run it manually; choose the **`main`** branch so the deployed files match `main`.

After the first successful run, your site URL will look like:

`https://<your-username>.github.io/<repository-name>/`

If Pages does not update, open the **Actions** tab and confirm the workflow succeeded. The first time you use Pages with Actions, GitHub may ask you to approve the workflow.

## Libraries used

- [Tailwind CSS](https://tailwindcss.com/) (CDN) for layout and styling  
- [Font Awesome](https://fontawesome.com/) for icons  
- [AOS](https://michalsnik.github.io/aos/) for scroll animations on the home page  
- [Alpine.js](https://alpinejs.dev/) for the FAQ accordion on the learn page  
- [Prism.js](https://prismjs.com/) for code samples in lessons  

## License

Add a license file if you plan to share the repo publicly.
