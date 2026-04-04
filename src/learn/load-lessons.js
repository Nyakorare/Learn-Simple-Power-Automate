import { LESSON_SLUGS } from './lesson-manifest.js'

const rawBySlug = import.meta.glob('../lessons/*.html', { query: '?raw', import: 'default', eager: true })

function resolveRaw(slug) {
  const entry = Object.entries(rawBySlug).find(([path]) => path.endsWith(`/${slug}.html`))
  return entry ? entry[1] : ''
}

/**
 * Concatenate lesson fragments in manifest order for #anchor navigation.
 */
export function buildLessonsHtml() {
  return LESSON_SLUGS.map((slug) => {
    const html = resolveRaw(slug)
    if (!html) {
      console.warn(`[learn] Missing lesson file for slug: ${slug}`)
    }
    return html
  }).join('\n')
}
