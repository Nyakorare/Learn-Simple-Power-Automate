import './style.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-json.js'
import { initLearnPage } from './learn-page.js'

document.addEventListener('DOMContentLoaded', () => {
  initLearnPage()
  Prism.highlightAll()
  AOS.init({ duration: 650, once: true, offset: 40 })

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href')
      if (!id || id === '#') return
      const target = document.querySelector(id)
      if (target) {
        e.preventDefault()
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
  })

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in')
        }
      })
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  )
  document.querySelectorAll('section').forEach((section) => observer.observe(section))
})
