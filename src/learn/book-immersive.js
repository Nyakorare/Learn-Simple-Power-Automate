const STORAGE_KEY = 'pa-learn-immersive'

function syncToggleButtons(on) {
  document.querySelectorAll('[data-book-immersive-toggle]').forEach((toggle) => {
    toggle.setAttribute('aria-pressed', on ? 'true' : 'false')
    toggle.setAttribute('aria-label', on ? 'Exit focused reading' : 'Enter focused reading mode')
    toggle.setAttribute(
      'title',
      on ? 'Exit focused reading (Esc)' : 'Focused reading—book fills the window; scroll inside the lesson'
    )
    const icon = toggle.querySelector('.book-immersive-toggle__icon')
    if (icon) {
      icon.classList.toggle('fa-expand', !on)
      icon.classList.toggle('fa-compress', on)
    }
    const label = toggle.querySelector('.book-immersive-toggle__label')
    if (label) {
      label.textContent = on ? 'Exit focus' : 'Focus'
    }
  })
}

function applyImmersive(on) {
  document.documentElement.classList.toggle('learn-immersive', on)
  document.body.classList.toggle('learn-immersive', on)
  syncToggleButtons(on)

  try {
    sessionStorage.setItem(STORAGE_KEY, on ? '1' : '0')
  } catch {
    /* ignore */
  }
}

export function initBookImmersive() {
  const toggles = document.querySelectorAll('[data-book-immersive-toggle]')
  if (!toggles.length) return

  try {
    if (sessionStorage.getItem(STORAGE_KEY) === '1') {
      applyImmersive(true)
    }
  } catch {
    /* ignore */
  }

  toggles.forEach((btn) => {
    btn.addEventListener('click', () => {
      applyImmersive(!document.body.classList.contains('learn-immersive'))
    })
  })

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return
    if (!document.body.classList.contains('learn-immersive')) return
    e.preventDefault()
    applyImmersive(false)
    const focusAfter =
      document.getElementById('book-immersive-toggle-inbook') ||
      document.getElementById('book-immersive-toggle')
    focusAfter?.focus()
  })
}
