import './style.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-json.js'
import { initBookView } from './learn/book-view.js'
import { LEARN_PROGRESS_EVENT, recordLessonVisited, refreshAllLearnProgressUi } from './learn/lesson-progress.js'
import { LESSON_IDS } from './learn/lesson-manifest.js'
import { mountLearningPaths } from './learn/render-learning-paths.js'
import { buildLessonsHtml } from './learn/load-lessons.js'
import { highlightPrismIn } from './learn/prism-highlight.js'
import { renderLessonNav } from './learn/render-lesson-nav.js'
import { initLessonQuizzes } from './learn/lesson-quiz-ui.js'
import { initLearnPage } from './learn-page.js'
import { initThemeToggle } from './theme-toggle.js'
import { prefersReducedMotion } from './stagger-aos.js'

function initNonLessonAnchorScroll() {
  document.body.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]')
    if (!a) return
    const href = a.getAttribute('href')
    if (!href || href.length < 2) return
    const id = href.slice(1)
    if (LESSON_IDS.has(id)) return
    const target = document.getElementById(id)
    if (!target) return
    e.preventDefault()
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle()

  const lessonsContent = document.getElementById('lessons-content')
  const lessonsNav = document.getElementById('lessons-nav')

  if (lessonsContent) {
    lessonsContent.innerHTML = buildLessonsHtml()
    initLessonQuizzes(lessonsContent)
  }
  if (lessonsNav) {
    renderLessonNav(lessonsNav)
  }

  mountLearningPaths(document.getElementById('learning-paths-grid'))
  window.addEventListener(LEARN_PROGRESS_EVENT, refreshAllLearnProgressUi)
  refreshAllLearnProgressUi()

  initLearnPage()

  initBookView(lessonsContent, {
    highlightPrismIn,
    onLessonShown: recordLessonVisited,
    refreshAos: () => {
      try {
        AOS.refresh()
      } catch {
        /* ignore */
      }
    },
  })

  const bookCanvas = document.getElementById('book-three-canvas')
  if (bookCanvas instanceof HTMLCanvasElement) {
    import('./learn/book-three.js')
      .then(({ initBookThreeDecor }) => {
        initBookThreeDecor(bookCanvas)
      })
      .catch(() => {
        /* WebGL or module load unavailable */
      })
  }

  const reduceMotion = prefersReducedMotion()
  AOS.init({
    duration: reduceMotion ? 0 : 780,
    easing: 'ease-out-quart',
    once: true,
    offset: 72,
    anchorPlacement: 'top-bottom',
    disable: reduceMotion,
  })

  initNonLessonAnchorScroll()

  Prism.highlightAll()
  try {
    AOS.refresh()
  } catch {
    /* ignore */
  }
})
