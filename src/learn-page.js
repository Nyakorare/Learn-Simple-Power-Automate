export function initLearnPage() {
  const searchInput = document.getElementById('lesson-search')
  const lessonsSidebar = document.getElementById('lessons-sidebar')
  const drawerToggle = document.getElementById('lessons-drawer')

  if (!lessonsSidebar) return

  const lessonLinks = lessonsSidebar.querySelectorAll('a.lesson-link')

  lessonLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 1024 && drawerToggle) {
        drawerToggle.checked = false
      }
    })
  })

  if (!searchInput) return

  searchInput.addEventListener('input', () => {
    const term = searchInput.value.trim().toLowerCase()
    lessonLinks.forEach((item) => {
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
