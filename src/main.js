import './style.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import AOS from 'aos'
import 'aos/dist/aos.css'

function initSmoothAnchors() {
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
}

document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  AOS.init({
    duration: reduceMotion ? 0 : 780,
    easing: 'ease-out-quart',
    once: true,
    offset: 72,
    anchorPlacement: 'top-bottom',
    disable: reduceMotion,
  })
  initSmoothAnchors()

  const navDrawer = document.getElementById('main-nav-drawer')
  const sidebar = document.getElementById('sidebar')
  if (navDrawer && sidebar) {
    sidebar.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 1024) {
          navDrawer.checked = false
        }
      })
    })
  }

})
