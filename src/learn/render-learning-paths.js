import { LEARNING_PATHS } from './lesson-manifest.js'
import { refreshLearningPathCards } from './lesson-progress.js'

function escapeHtml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * @param {HTMLElement | null} container
 * @param {{ lessonHrefPrefix?: string }} [options] use `learn.html` on index.html so CTAs open the lesson book
 */
export function mountLearningPaths(container, options = {}) {
  if (!container) return

  if (options.lessonHrefPrefix != null) {
    container.dataset.lessonHrefPrefix = options.lessonHrefPrefix
  }

  container.innerHTML = LEARNING_PATHS.map((p, i) => cardHtml(p, i * 100)).join('')

  refreshLearningPathCards(container)
}

/** @param {typeof LEARNING_PATHS[0]} p */
function cardHtml(p, aosDelay) {
  const diffBadge =
    p.difficulty === 'Beginner'
      ? 'badge-success badge-outline'
      : p.difficulty === 'Intermediate'
        ? 'badge-info badge-outline'
        : 'badge-accent badge-outline'

  return `
<article class="card bg-base-100 border shadow-lg path-card-lift overflow-hidden ${escapeHtml(p.cardBorder)}" data-learning-path="${escapeHtml(p.groupId)}" data-aos="zoom-in-up" data-aos-delay="${aosDelay}">
  <div class="card-body">
    <div class="flex items-start justify-between gap-2 mb-2">
      <div class="flex items-center gap-3 min-w-0">
        <div class="${escapeHtml(p.iconWrap)} p-3 rounded-box shrink-0"><i class="${escapeHtml(p.icon)} ${escapeHtml(p.iconClass)}" aria-hidden="true"></i></div>
        <h4 class="card-title text-base leading-tight">${escapeHtml(p.title)}</h4>
      </div>
      <span class="badge ${diffBadge} badge-sm shrink-0 whitespace-nowrap" title="Suggested level">${escapeHtml(p.difficulty)}</span>
    </div>
    <p class="text-base-content/80 text-sm">${escapeHtml(p.description)}</p>
    <p class="text-xs text-base-content/55 mt-3 mb-1" data-path-progress-label aria-live="polite"></p>
    <progress class="progress ${escapeHtml(p.progressClass)} w-full h-2" data-path-progress-bar value="0" max="100" aria-label="Progress for ${escapeHtml(p.title)}"></progress>
    <a href="#" data-path-continue data-cta-start="${escapeHtml(p.ctaStart)}" class="btn ${escapeHtml(p.btnClass)} btn-block mt-3 ${p.id === 'advanced' ? 'text-accent-content' : ''}">Open</a>
  </div>
</article>`
}
