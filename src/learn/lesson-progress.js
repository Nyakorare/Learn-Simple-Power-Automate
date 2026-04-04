import { LESSON_IDS, LESSON_NAV_ITEMS } from './lesson-manifest.js'

const STORAGE_KEY = 'pa-learn-lesson-visits'
export const LEARN_PROGRESS_EVENT = 'pa-learn-progress-changed'

function readVisitedArray() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const arr = raw ? JSON.parse(raw) : []
    return Array.isArray(arr) ? arr.filter((x) => typeof x === 'string') : []
  } catch {
    return []
  }
}

export function readVisitedIds() {
  return new Set(readVisitedArray())
}

/**
 * Mark a lesson as viewed (opening it in the book). Stored locally in this browser only.
 * @param {string} lessonId
 */
export function recordLessonVisited(lessonId) {
  if (!lessonId || !LESSON_IDS.has(lessonId)) return

  const ids = readVisitedArray()
  if (ids.includes(lessonId)) return

  ids.push(lessonId)
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
  } catch {
    /* quota or private mode */
  }
  window.dispatchEvent(new CustomEvent(LEARN_PROGRESS_EVENT))
}

/**
 * @param {string} groupId
 */
export function getPathProgress(groupId) {
  const lessons = LESSON_NAV_ITEMS.filter((l) => l.group === groupId).map((l) => l.id)
  const visited = readVisitedIds()
  const done = lessons.filter((id) => visited.has(id)).length
  const total = lessons.length
  const percent = total ? Math.round((done / total) * 100) : 0
  return { done, total, percent, lessons }
}

/**
 * Next lesson in path order not yet visited, else last lesson in path.
 * @param {string} groupId
 * @param {string} [pathPrefix] e.g. `learn.html` on the home page so links open the book
 */
export function continueHrefForPath(groupId, pathPrefix = '') {
  const { lessons } = getPathProgress(groupId)
  const visited = readVisitedIds()
  const next = lessons.find((id) => !visited.has(id))
  const id = next ?? lessons[lessons.length - 1] ?? 'lesson-intro'
  const hash = `#${id}`
  return pathPrefix ? `${pathPrefix}${hash}` : hash
}

/**
 * @param {ParentNode | null} root
 */
export function refreshLearningPathCards(root) {
  if (!root) return
  const pathPrefix = root.dataset.lessonHrefPrefix || ''
  root.querySelectorAll('[data-learning-path]').forEach((card) => {
    const gid = card.getAttribute('data-learning-path')
    if (!gid) return
    const { done, total, percent } = getPathProgress(gid)
    const bar = card.querySelector('[data-path-progress-bar]')
    const label = card.querySelector('[data-path-progress-label]')
    const cta = card.querySelector('[data-path-continue]')
    if (bar instanceof HTMLProgressElement) {
      bar.value = percent
    }
    if (label) {
      label.textContent = total ? `${done} of ${total} lessons opened in the book` : ''
    }
    if (cta instanceof HTMLAnchorElement) {
      cta.setAttribute('href', continueHrefForPath(gid, pathPrefix))
      const complete = total > 0 && done >= total
      const startLabel = cta.getAttribute('data-cta-start') || 'Start'
      if (complete) cta.textContent = 'Review path'
      else if (done > 0) cta.textContent = 'Continue in book'
      else cta.textContent = startLabel
    }
  })
}

/**
 * Table-of-contents group subtitles: "3 / 6 in this section"
 */
export function refreshSidebarGroupProgress() {
  document.querySelectorAll('[data-nav-group-progress]').forEach((el) => {
    const gid = el.getAttribute('data-nav-group-progress')
    if (!gid) return
    const { done, total } = getPathProgress(gid)
    if (!total) {
      el.textContent = ''
      return
    }
    el.textContent = `${done} / ${total} viewed`
  })
}

export function refreshAllLearnProgressUi() {
  refreshLearningPathCards(document.getElementById('learning-paths-grid-home'))
  refreshLearningPathCards(document.getElementById('learning-paths-grid'))
  refreshSidebarGroupProgress()
}
