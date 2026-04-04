/** localStorage key; values: "light" | "dark" */
export const THEME_STORAGE_KEY = 'pa-color-mode'

export const THEME_IDS = {
  light: 'powerautomate',
  dark: 'powerautomate-dark',
}

/**
 * @returns {'light' | 'dark'}
 */
export function resolveInitialMode() {
  try {
    const s = localStorage.getItem(THEME_STORAGE_KEY)
    if (s === 'light' || s === 'dark') return s
  } catch {
    /* ignore */
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/**
 * @param {'light' | 'dark'} mode
 */
export function applyColorMode(mode) {
  const html = document.documentElement
  const id = mode === 'dark' ? THEME_IDS.dark : THEME_IDS.light
  html.setAttribute('data-theme', id)
  try {
    localStorage.setItem(THEME_STORAGE_KEY, mode)
  } catch {
    /* ignore */
  }
  syncToggleButtons(mode)
}

/**
 * @param {'light' | 'dark'} mode
 */
export function syncToggleButtons(mode) {
  const dark = mode === 'dark'
  document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
    btn.setAttribute('aria-pressed', dark ? 'true' : 'false')
    btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode')
    btn.setAttribute('title', dark ? 'Light mode' : 'Dark mode')
    const moon = btn.querySelector('.theme-toggle-moon')
    const sun = btn.querySelector('.theme-toggle-sun')
    if (moon && sun) {
      moon.classList.toggle('theme-toggle-icon--inactive', dark)
      sun.classList.toggle('theme-toggle-icon--inactive', !dark)
    }
  })
}

export function initThemeToggle() {
  const html = document.documentElement
  let theme = html.getAttribute('data-theme')
  if (theme !== THEME_IDS.dark && theme !== THEME_IDS.light) {
    applyColorMode(resolveInitialMode())
  } else {
    syncToggleButtons(theme === THEME_IDS.dark ? 'dark' : 'light')
  }

  document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const cur = html.getAttribute('data-theme') === THEME_IDS.dark ? 'dark' : 'light'
      applyColorMode(cur === 'dark' ? 'light' : 'dark')
    })
  })
}
