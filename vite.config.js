import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

/** GitHub Actions sets GITHUB_REPOSITORY=owner/repo for project Pages subpath. */
const repoSlug = process.env.GITHUB_REPOSITORY?.split('/')?.[1]
const baseForBuild =
  process.env.GITHUB_PAGES === 'true' && repoSlug ? `/${repoSlug}/` : './'

/** Makes ./PA.png and page links resolve under /repo/ even when the URL omits a trailing slash. */
function htmlBaseTagPlugin(baseHref) {
  return {
    name: 'html-base-tag',
    transformIndexHtml(html) {
      if (!baseHref || baseHref === './') return html
      return html.replace(
        '<meta charset="UTF-8">',
        `<meta charset="UTF-8">\n    <base href="${baseHref}">`,
      )
    },
  }
}

export default defineConfig(({ command }) => ({
  base: command === 'serve' ? '/' : baseForBuild,
  plugins: [tailwindcss(), htmlBaseTagPlugin(command === 'serve' ? './' : baseForBuild)],
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        learn: resolve(__dirname, 'learn.html'),
      },
    },
  },
}))
