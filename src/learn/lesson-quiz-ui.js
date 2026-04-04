/**
 * Event delegation for injected lesson quiz blocks inside #lessons-content.
 * @param {ParentNode | null} root
 */
export function initLessonQuizzes(root) {
  if (!root) return

  root.addEventListener('click', (e) => {
    const t = e.target
    if (!(t instanceof Element)) return

    const checkBtn = t.closest('.lesson-quiz-check')
    const resetBtn = t.closest('.lesson-quiz-reset')
    if (!checkBtn && !resetBtn) return

    const section = t.closest('.lesson-quiz')
    if (!section) return

    const feedback = section.querySelector('.lesson-quiz-feedback')
    if (!feedback) return

    if (resetBtn) {
      section.querySelectorAll('input[type="radio"]').forEach((input) => {
        input.checked = false
      })
      feedback.textContent = ''
      feedback.classList.add('hidden')
      feedback.className =
        'lesson-quiz-feedback mt-3 hidden text-sm font-medium'
      return
    }

    const correct = Number(section.getAttribute('data-correct'))
    const picked = section.querySelector('input[type="radio"]:checked')

    feedback.classList.remove('hidden')
    if (!picked) {
      feedback.textContent = 'Choose one answer, then tap Check answer.'
      feedback.className =
        'lesson-quiz-feedback mt-3 text-sm font-medium rounded-lg border border-warning/40 bg-warning/10 px-3 py-2 text-base-content'
      return
    }

    const i = Number(picked.value)
    const ok = i === correct && !Number.isNaN(correct)
    if (ok) {
      feedback.textContent = 'Correct — that lines up with this lesson. Nice work!'
      feedback.className =
        'lesson-quiz-feedback mt-3 text-sm font-medium rounded-lg border border-success/40 bg-success/10 px-3 py-2 text-base-content'
    } else {
      feedback.textContent =
        'Not quite — skim the lesson again and try another option (or clear and re-pick).'
      feedback.className =
        'lesson-quiz-feedback mt-3 text-sm font-medium rounded-lg border border-error/35 bg-error/10 px-3 py-2 text-base-content'
    }
  })
}
