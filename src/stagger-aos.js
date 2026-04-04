/** Cycle subtle variants so long lesson lists do not feel monotonous. */
const LESSON_AOS_VARIANTS = ['fade-up', 'fade-up', 'zoom-in-up', 'fade-up']

/**
 * Assign staggered AOS timing to dynamically injected lesson cards.
 * @param {ParentNode | null | undefined} container
 */
export function staggerLessonCards(container) {
  if (!container) return
  container.querySelectorAll('.lesson-card').forEach((card, i) => {
    card.setAttribute('data-aos', LESSON_AOS_VARIANTS[i % LESSON_AOS_VARIANTS.length])
    card.setAttribute('data-aos-delay', String(Math.min(i * 45, 420)))
    card.setAttribute('data-aos-duration', '680')
    card.setAttribute('data-aos-easing', 'ease-out-quart')
  })
}

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
