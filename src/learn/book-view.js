import { LESSON_IDS, LESSON_NAV_ITEMS } from './lesson-manifest.js'

const DEFAULT_LESSON_ID = LESSON_NAV_ITEMS[0]?.id ?? 'lesson-intro'

/**
 * @param {HTMLElement | null} root
 * @param {{ refreshAos?: () => void; highlightPrismIn?: (el: Element | null) => void }} [opts]
 */
export function initBookView(root, opts = {}) {
  if (!root) return

  const bookStage = document.getElementById('book-stage')
  const drawerToggle = document.getElementById('lessons-drawer')

  function articles() {
    return [...root.querySelectorAll('article.lesson-card[id]')]
  }

  function updateTocCurrent(lessonId) {
    document.querySelectorAll('#lessons-nav a.lesson-link').forEach((a) => {
      const href = a.getAttribute('href')
      const on = href === `#${lessonId}`
      a.classList.toggle('lesson-link--current', on)
      if (on) a.setAttribute('aria-current', 'page')
      else a.removeAttribute('aria-current')
    })
  }

  function showLesson(lessonId) {
    if (!LESSON_IDS.has(lessonId)) return

    articles().forEach((el) => {
      const on = el.id === lessonId
      el.hidden = !on
      el.classList.toggle('book-page--active', on)
      el.setAttribute('aria-hidden', on ? 'false' : 'true')
    })

    updateTocCurrent(lessonId)

    opts.highlightPrismIn?.(document.getElementById(lessonId))
    opts.refreshAos?.()

    if (window.innerWidth < 1024 && drawerToggle) {
      if (drawerToggle.checked) {
        drawerToggle.checked = false
        drawerToggle.dispatchEvent(new Event('change', { bubbles: true }))
      }
    }
  }

  function lessonIdFromHash() {
    const id = (location.hash || '').replace(/^#/, '')
    return LESSON_IDS.has(id) ? id : null
  }

  function syncFromLocation() {
    const id = lessonIdFromHash()
    if (id) {
      showLesson(id)
      return
    }

    const raw = (location.hash || '').replace(/^#/, '')
    if (!raw || raw === 'lesson-modules') {
      history.replaceState(null, '', `#${DEFAULT_LESSON_ID}`)
      showLesson(DEFAULT_LESSON_ID)
      if (raw === 'lesson-modules') {
        requestAnimationFrame(() => {
          document.getElementById('lesson-modules')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        })
      }
      return
    }

    showLesson(DEFAULT_LESSON_ID)
    requestAnimationFrame(() => {
      document.getElementById(raw)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  window.addEventListener('hashchange', syncFromLocation)

  document.body.addEventListener(
    'click',
    (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const href = a.getAttribute('href')
      if (!href || href === '#') return
      const id = href.slice(1)
      if (!LESSON_IDS.has(id)) return
      e.preventDefault()
      e.stopPropagation()
      if (location.hash !== href) {
        location.hash = href
      } else {
        showLesson(id)
      }
      if (window.innerWidth < 1024 && bookStage) {
        bookStage.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    },
    true
  )

  syncFromLocation()
}
