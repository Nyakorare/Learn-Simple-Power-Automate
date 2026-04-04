import Prism from 'prismjs'

/**
 * Highlight code blocks inside a single lesson (book page).
 * @param {Element | null} scope
 */
export function highlightPrismIn(scope) {
  if (!scope) return
  scope.querySelectorAll('pre code').forEach((block) => {
    Prism.highlightElement(block)
  })
}
