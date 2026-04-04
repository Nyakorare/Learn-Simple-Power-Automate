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
  AOS.init({ duration: 650, once: true, offset: 40 })
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

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in')
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  )
  document.querySelectorAll('section').forEach((section) => observer.observe(section))
})
