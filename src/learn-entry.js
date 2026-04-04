import './style.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-json.js'
import { buildLessonsHtml } from './learn/load-lessons.js'
import { renderLessonNav } from './learn/render-lesson-nav.js'
import { initLearnPage } from './learn-page.js'

function initAnchorSmoothScroll() {
  document.body.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]')
    if (!a) return
    const id = a.getAttribute('href')
    if (!id || id === '#') return
    const target = document.querySelector(id)
    if (target) {
      e.preventDefault()
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  })
}

document.addEventListener('DOMContentLoaded', () => {
  const lessonsContent = document.getElementById('lessons-content')
  const lessonsNav = document.getElementById('lessons-nav')

  if (lessonsContent) {
    lessonsContent.innerHTML = buildLessonsHtml()
  }
  if (lessonsNav) {
    renderLessonNav(lessonsNav)
  }

  initLearnPage()
  initAnchorSmoothScroll()

  Prism.highlightAll()
  AOS.init({
    duration: 780,
    easing: 'ease-out-quart',
    once: true,
    offset: 72,
    anchorPlacement: 'top-bottom',
  })
})
