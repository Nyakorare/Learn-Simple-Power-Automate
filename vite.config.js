import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  base: './',
  plugins: [tailwindcss()],
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        learn: resolve(__dirname, 'learn.html'),
      },
    },
  },
})
