import { LESSON_IDS, LESSON_NAV_ITEMS } from './lesson-manifest.js'

const DEFAULT_LESSON_ID = LESSON_NAV_ITEMS[0]?.id ?? 'lesson-intro'

const PAGE_TURN_FALLBACK_MS = 520

function lessonTitleForId(lessonId) {
  return LESSON_NAV_ITEMS.find((l) => l.id === lessonId)?.title ?? lessonId.replace(/^lesson-/, '')
}

function updateNowReadingLabel(lessonId) {
  const el = document.getElementById('book-now-reading-title')
  if (el) el.textContent = lessonTitleForId(lessonId)
}

function prefersReducedMotion() {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch {
    return true
  }
}

/**
 * @param {HTMLElement | null} root
 * @param {{ refreshAos?: () => void; highlightPrismIn?: (el: Element | null) => void; onLessonShown?: (lessonId: string) => void }} [opts]
 */
export function initBookView(root, opts = {}) {
  if (!root) return

  const bookStage = document.getElementById('book-stage')
  const drawerToggle = document.getElementById('lessons-drawer')

  /** @type {boolean} */
  let pageTurnInProgress = false
  /** @type {string | null} */
  let pendingLessonId = null
  /** @type {ReturnType<typeof setTimeout> | null} */
  let fallbackTimer = null

  function articles() {
    return [...root.querySelectorAll('article.lesson-card[id]')]
  }

  function clearTurnChrome() {
    root.classList.remove('book-pages--is-turning')
    root.style.minHeight = ''
    if (fallbackTimer != null) {
      clearTimeout(fallbackTimer)
      fallbackTimer = null
    }
  }

  function closeDrawerMobile() {
    if (window.innerWidth < 1024 && drawerToggle) {
      if (drawerToggle.checked) {
        drawerToggle.checked = false
        drawerToggle.dispatchEvent(new Event('change', { bubbles: true }))
      }
    }
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

  /**
   * @param {string} lessonId
   * @param {{ afterEnter?: () => void }} [cb]
   */
  function applyLessonInstant(lessonId, cb) {
    clearTurnChrome()
    articles().forEach((el) => {
      const on = el.id === lessonId
      el.hidden = !on
      el.classList.remove('book-page--leaving', 'book-page--entering')
      el.classList.toggle('book-page--active', on)
      el.setAttribute('aria-hidden', on ? 'false' : 'true')
    })
    updateTocCurrent(lessonId)
    updateNowReadingLabel(lessonId)
    opts.highlightPrismIn?.(document.getElementById(lessonId))
    opts.refreshAos?.()
    closeDrawerMobile()
    opts.onLessonShown?.(lessonId)
    cb?.afterEnter?.()
  }

  /**
   * @param {string} lessonId
   */
  function showLesson(lessonId) {
    if (!LESSON_IDS.has(lessonId)) return

    if (pageTurnInProgress) {
      pendingLessonId = lessonId
      return
    }

    const incoming = document.getElementById(lessonId)
    if (!incoming) return

    const outgoing = articles().find(
      (el) => !el.hidden && el.classList.contains('book-page--active') && el.id !== lessonId
    )

    if (incoming.classList.contains('book-page--active') && !incoming.hidden && !outgoing) {
      updateTocCurrent(lessonId)
      updateNowReadingLabel(lessonId)
      opts.highlightPrismIn?.(incoming)
      opts.refreshAos?.()
      closeDrawerMobile()
      opts.onLessonShown?.(lessonId)
      return
    }

    const outgoingEl =
      outgoing ||
      articles().find((el) => !el.hidden && el.classList.contains('book-page--active'))

    if (!outgoingEl || outgoingEl === incoming || prefersReducedMotion()) {
      applyLessonInstant(lessonId)
      drainPending()
      return
    }

    pageTurnInProgress = true
    updateTocCurrent(lessonId)
    updateNowReadingLabel(lessonId)
    closeDrawerMobile()

    root.classList.add('book-pages--is-turning')
    const h = outgoingEl.offsetHeight
    if (h > 0) root.style.minHeight = `${h}px`

    outgoingEl.classList.add('book-page--leaving')
    outgoingEl.classList.remove('book-page--active')

    let leaveDone = false
    let enterDone = false

    const finishIn = () => {
      if (enterDone) return
      enterDone = true
      if (fallbackTimer != null) {
        clearTimeout(fallbackTimer)
        fallbackTimer = null
      }
      incoming.classList.remove('book-page--entering')
      clearTurnChrome()
      opts.highlightPrismIn?.(incoming)
      opts.refreshAos?.()
      opts.onLessonShown?.(lessonId)
      pageTurnInProgress = false
      drainPending()
    }

    const finishOut = () => {
      if (leaveDone) return
      leaveDone = true
      if (fallbackTimer != null) {
        clearTimeout(fallbackTimer)
        fallbackTimer = null
      }
      outgoingEl.removeEventListener('animationend', onOutEnd)

      outgoingEl.hidden = true
      outgoingEl.setAttribute('aria-hidden', 'true')
      outgoingEl.classList.remove('book-page--leaving')

      incoming.hidden = false
      incoming.setAttribute('aria-hidden', 'false')
      incoming.classList.add('book-page--active', 'book-page--entering')

      const onInEnd = (e) => {
        if (e.target !== incoming) return
        if (e.animationName !== 'bookPageFlipIn') return
        incoming.removeEventListener('animationend', onInEnd)
        finishIn()
      }
      incoming.addEventListener('animationend', onInEnd)
      fallbackTimer = window.setTimeout(() => {
        if (!enterDone && incoming.classList.contains('book-page--entering')) {
          incoming.removeEventListener('animationend', onInEnd)
          finishIn()
        }
      }, PAGE_TURN_FALLBACK_MS)
    }

    const onOutEnd = (e) => {
      if (e.target !== outgoingEl) return
      if (e.animationName !== 'bookPageOut') return
      if (fallbackTimer != null) {
        clearTimeout(fallbackTimer)
        fallbackTimer = null
      }
      finishOut()
    }
    outgoingEl.addEventListener('animationend', onOutEnd)
    fallbackTimer = window.setTimeout(() => {
      finishOut()
    }, PAGE_TURN_FALLBACK_MS)
  }

  function drainPending() {
    if (pendingLessonId && LESSON_IDS.has(pendingLessonId)) {
      const next = pendingLessonId
      pendingLessonId = null
      showLesson(next)
    } else {
      pendingLessonId = null
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
    if (raw === 'lesson-modules') {
      showLesson(DEFAULT_LESSON_ID)
      requestAnimationFrame(() => {
        document.getElementById('lesson-modules')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
      return
    }

    if (!raw) {
      history.replaceState(null, '', `#${DEFAULT_LESSON_ID}`)
      showLesson(DEFAULT_LESSON_ID)
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
