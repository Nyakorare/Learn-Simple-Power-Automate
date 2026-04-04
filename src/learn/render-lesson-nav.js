import { LESSON_NAV_ITEMS, NAV_GROUPS } from './lesson-manifest.js'

function escapeHtml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * @param {HTMLElement} navEl
 */
export function renderLessonNav(navEl) {
  const html = NAV_GROUPS.map((group) => {
    const items = LESSON_NAV_ITEMS.filter((l) => l.group === group.id)
    const links = items
      .map(
        (l) => `
        <li>
          <a href="#${escapeHtml(l.id)}" class="lesson-link flex items-center gap-2 py-1.5 px-2 rounded-lg hover:bg-primary hover:text-primary-content transition-all duration-200">
            <i class="fas fa-angle-right ${group.chevronClass} text-xs opacity-80"></i>
            ${escapeHtml(l.title)}
          </a>
        </li>`
      )
      .join('')

    return `
      <div class="sidebar-group">
        <h3 class="text-xs font-semibold ${group.headerClass} uppercase tracking-wide mb-2 flex items-center gap-2">
          <i class="${group.icon} w-4"></i> ${escapeHtml(group.label)}
        </h3>
        <ul class="space-y-0.5">${links}</ul>
      </div>`
  }).join('')

  navEl.innerHTML = html.trim()
}
