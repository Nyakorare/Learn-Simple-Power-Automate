import './style.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-json.js'
import { initBookView } from './learn/book-view.js'
import { LESSON_IDS } from './learn/lesson-manifest.js'
import { buildLessonsHtml } from './learn/load-lessons.js'
import { highlightPrismIn } from './learn/prism-highlight.js'
import { renderLessonNav } from './learn/render-lesson-nav.js'
import { initLessonQuizzes } from './learn/lesson-quiz-ui.js'
import { initLearnPage } from './learn-page.js'
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
  const lessonsContent = document.getElementById('lessons-content')
  const lessonsNav = document.getElementById('lessons-nav')

  if (lessonsContent) {
    lessonsContent.innerHTML = buildLessonsHtml()
    initLessonQuizzes(lessonsContent)
  }
  if (lessonsNav) {
    renderLessonNav(lessonsNav)
  }

  initLearnPage()

  initBookView(lessonsContent, {
    highlightPrismIn,
    refreshAos: () => {
      try {
        AOS.refresh()
      } catch {
        /* ignore */
      }
    },
  })

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
