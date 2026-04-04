const TOC_STORAGE_KEY = 'learn-toc-open'

function syncTocAria(drawerToggle, tocToggleLabel) {
  const open = drawerToggle.checked
  tocToggleLabel?.setAttribute('aria-expanded', open ? 'true' : 'false')
}

function closeDrawer(drawerToggle) {
  if (!drawerToggle.checked) return
  drawerToggle.checked = false
  drawerToggle.dispatchEvent(new Event('change', { bubbles: true }))
}

export function initLearnPage() {
  const searchInput = document.getElementById('lesson-search')
  const lessonsSidebar = document.getElementById('lessons-sidebar')
  const drawerToggle = document.getElementById('lessons-drawer')
  const tocToggleLabel = document.getElementById('toc-toggle-label')

  if (!lessonsSidebar || !drawerToggle) return

  function applySavedOrDefaultDrawer() {
    try {
      const saved = sessionStorage.getItem(TOC_STORAGE_KEY)
      if (saved === '0') {
        drawerToggle.checked = false
      } else if (saved === '1') {
        drawerToggle.checked = true
      } else if (window.matchMedia('(min-width: 1024px)').matches) {
        drawerToggle.checked = true
      } else {
        drawerToggle.checked = false
      }
    } catch {
      drawerToggle.checked = window.matchMedia('(min-width: 1024px)').matches
    }
    syncTocAria(drawerToggle, tocToggleLabel)
  }

  applySavedOrDefaultDrawer()

  drawerToggle.addEventListener('change', () => {
    try {
      sessionStorage.setItem(TOC_STORAGE_KEY, drawerToggle.checked ? '1' : '0')
    } catch {
      /* ignore */
    }
    syncTocAria(drawerToggle, tocToggleLabel)
  })

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return
    if (!drawerToggle.checked) return
    e.preventDefault()
    closeDrawer(drawerToggle)
    tocToggleLabel?.focus()
  })

  const lessonLinks = lessonsSidebar.querySelectorAll('a.lesson-link')

  lessonLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 1024) {
        closeDrawer(drawerToggle)
      }
    })
  })

  if (!searchInput) return

  searchInput.addEventListener('input', () => {
    const term = searchInput.value.trim().toLowerCase()
    const links = lessonsSidebar.querySelectorAll('a.lesson-link')
    links.forEach((item) => {
      const text = item.textContent.toLowerCase()
      if (!term || text.includes(term)) {
        item.classList.remove('hidden')
      } else {
        item.classList.add('hidden')
      }
    })
    lessonsSidebar.querySelectorAll('.sidebar-group').forEach((group) => {
      const visible = group.querySelectorAll('a.lesson-link:not(.hidden)')
      const header = group.querySelector('h3')
      if (header) {
        header.classList.toggle('hidden', visible.length === 0)
      }
    })
  })
}
