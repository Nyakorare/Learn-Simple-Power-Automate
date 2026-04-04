import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

/**
 * Vite adds crossorigin to built tags; with rel=stylesheet that can make some browsers
 * treat the load as a CORS request. GitHub Pages static CSS is same-origin, so drop it.
 * (Keeps crossorigin on e.g. fonts.gstatic.com preconnect in source HTML.)
 */
function stripBuiltAssetCrossorigin() {
  return {
    name: 'strip-built-asset-crossorigin',
    transformIndexHtml(html) {
      return html
        .replace(/<link rel="stylesheet" crossorigin /g, '<link rel="stylesheet" ')
        .replace(/<link rel="modulepreload" crossorigin /g, '<link rel="modulepreload" ')
        .replace(/<script type="module" crossorigin /g, '<script type="module" ')
    },
  }
}

export default defineConfig(({ command }) => ({
  base: command === 'serve' ? '/' : './',
  plugins: [tailwindcss(), stripBuiltAssetCrossorigin()],
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
