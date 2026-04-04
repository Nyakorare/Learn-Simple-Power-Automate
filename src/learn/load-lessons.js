import { LESSON_NAV_ITEMS, LESSON_SLUGS } from './lesson-manifest.js'
import { getRandomQuizHtml } from './lesson-quizzes.js'

const rawBySlug = import.meta.glob('../lessons/*.html', { query: '?raw', import: 'default', eager: true })
const guideBySlug = import.meta.glob('../lesson-guides/*.html', { query: '?raw', import: 'default', eager: true })

function resolveRaw(map, slug) {
  const entry = Object.entries(map).find(([path]) => path.endsWith(`/${slug}.html`))
  return entry ? entry[1] : ''
}

function escapeAttr(s) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
}

/**
 * @param {string} slug
 * @param {number} index
 */
function bookPagerHtml(slug, index) {
  const total = LESSON_SLUGS.length
  const pageNum = index + 1
  const prevSlug = index > 0 ? LESSON_SLUGS[index - 1] : null
  const nextSlug = index < total - 1 ? LESSON_SLUGS[index + 1] : null
  const prevMeta = prevSlug ? LESSON_NAV_ITEMS.find((x) => x.slug === prevSlug) : null
  const nextMeta = nextSlug ? LESSON_NAV_ITEMS.find((x) => x.slug === nextSlug) : null

  const prevBtn = prevMeta
    ? `<a href="#${prevMeta.id}" class="lesson-pager-link lesson-pager-link--prev btn btn-outline btn-sm gap-2 border-base-300/90 hover:border-primary/50"><i class="fas fa-chevron-left shrink-0" aria-hidden="true"></i><span class="truncate text-left">${escapeAttr(prevMeta.title)}</span></a>`
    : `<span class="btn btn-disabled btn-sm btn-outline opacity-40">Previous page</span>`

  const nextBtn = nextMeta
    ? `<a href="#${nextMeta.id}" class="lesson-pager-link lesson-pager-link--next btn btn-primary btn-sm gap-2"><span class="truncate text-right">${escapeAttr(nextMeta.title)}</span><i class="fas fa-chevron-right shrink-0" aria-hidden="true"></i></a>`
    : `<span class="btn btn-disabled btn-sm opacity-40">Next page</span>`

  return `
<nav class="lesson-pager not-prose" aria-label="Book page navigation">
  <div class="lesson-pager-meta">
    <i class="fas fa-book-open text-primary" aria-hidden="true"></i>
    <span>Page <strong>${pageNum}</strong> of <strong>${total}</strong></span>
  </div>
  <div class="lesson-pager-actions">
    ${prevBtn}
    ${nextBtn}
  </div>
</nav>`
}

function injectBeforeClosingArticle(html, insert) {
  const trimmed = html.trimEnd()
  if (!trimmed.endsWith('</article>')) return html
  return `${trimmed.slice(0, -'</article>'.length)}${insert}</article>`
}

/**
 * Concatenate lesson fragments in manifest order for #anchor navigation.
 * Each lesson can include a matching src/lesson-guides/&lt;slug&gt;.html fragment.
 */
export function buildLessonsHtml() {
  return LESSON_SLUGS.map((slug, index) => {
    let html = resolveRaw(rawBySlug, slug)
    if (!html) {
      console.warn(`[learn] Missing lesson file for slug: ${slug}`)
      return ''
    }

    const guide = resolveRaw(guideBySlug, slug)
    if (guide?.trim()) {
      html = injectBeforeClosingArticle(html, guide.trim())
    }

    const quizBlock = getRandomQuizHtml(slug)
    if (quizBlock) {
      html = injectBeforeClosingArticle(html, quizBlock)
    }

    html = injectBeforeClosingArticle(html, bookPagerHtml(slug, index))
    return html
  }).join('\n')
}
