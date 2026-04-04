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
  const html = NAV_GROUPS.map((group, groupIndex) => {
    const items = LESSON_NAV_ITEMS.filter((l) => l.group === group.id)
    const links = items
      .map(
        (l) => `
        <li>
          <a href="#${escapeHtml(l.id)}" class="lesson-link group/link flex items-center gap-2 py-1.5 px-2 rounded-lg hover:bg-primary hover:text-primary-content transition-all duration-200 motion-safe:hover:translate-x-1">
            <i class="fas fa-angle-right ${group.chevronClass} text-xs opacity-80 transition-transform duration-200 motion-safe:group-hover/link:translate-x-0.5"></i>
            ${escapeHtml(l.title)}
          </a>
        </li>`
      )
      .join('')

    return `
      <div class="sidebar-group" data-aos="fade-left" data-aos-delay="${groupIndex * 100}" data-aos-duration="520" data-aos-offset="0">
        <h3 class="text-xs font-semibold ${group.headerClass} uppercase tracking-wide mb-1 flex items-center gap-2">
          <i class="${group.icon} w-4"></i> ${escapeHtml(group.label)}
        </h3>
        <p class="text-[0.65rem] text-neutral-content/55 mb-2 leading-tight" data-nav-group-progress="${escapeHtml(group.id)}" aria-live="polite"></p>
        <ul class="space-y-0.5">${links}</ul>
      </div>`
  }).join('')

  navEl.innerHTML = html.trim()
}
