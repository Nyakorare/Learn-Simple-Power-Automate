/**
 * Multiple-choice pools per lesson; one question is chosen at random when the page loads.
 * @typedef {{ q: string; options: string[]; correct: number }} QuizItem
 */

/** @type {Record<string, QuizItem[]>} */
export const QUIZZES_BY_SLUG = {
  intro: [
    {
      q: 'What is the main purpose of Power Automate?',
      options: [
        'Replace the Windows desktop entirely',
        'Automate tasks across apps and services using flows',
        'Host SQL Server databases only',
        'Edit Word documents offline only',
      ],
      correct: 1,
    },
    {
      q: 'A typical cloud flow starts with a ___ and runs a series of ___.',
      options: ['report … dashboards', 'trigger … actions', 'form … portals', 'license … invoices'],
      correct: 1,
    },
  ],
  licensing: [
    {
      q: 'Licensing for Power Automate often depends on your ___ and whether connectors are ___.',
      options: ['SQL version … encrypted', 'Microsoft 365 / Power Platform plan … standard or premium', 'monitor size … touch', 'browser … Chromium-only'],
      correct: 1,
    },
    {
      q: 'Premium connectors generally require ___ than only what a basic M365 license might include.',
      options: ['no network', 'appropriate premium or seeded capacity', 'a USB key', 'Excel 2003'],
      correct: 1,
    },
  ],
  interface: [
    {
      q: 'Where do you visually design most cloud flows?',
      options: ['Power Automate designer (flow canvas)', 'Windows Notepad', 'Azure DevOps Repos only', 'SharePoint classic pages only'],
      correct: 0,
    },
    {
      q: 'The canvas shows the flow as a sequence of connected ___.',
      options: ['SQL indexes', 'steps (triggers and actions)', 'PowerPoint slides', 'Excel named ranges'],
      correct: 1,
    },
  ],
  flows: [
    {
      q: 'An automated cloud flow runs when ___.',
      options: ['you always press F5', 'a trigger event occurs (or on a schedule)', 'only when the PC sleeps', 'only inside Excel'],
      correct: 1,
    },
    {
      q: 'A scheduled flow is useful when you want automation to run ___.',
      options: ['never', 'on a recurring time pattern', 'only once ever', 'only from a USB device'],
      correct: 1,
    },
  ],
  triggers: [
    {
      q: 'Every automated flow must have at least one ___.',
      options: ['SQL Server login', 'trigger', 'Power BI dataset refresh', 'Visio diagram'],
      correct: 1,
    },
    {
      q: 'A trigger defines ___.',
      options: ['what starts the flow', 'only the flow name color', 'the desktop wallpaper', 'printer drivers'],
      correct: 0,
    },
  ],
  variables: [
    {
      q: 'Variables in a flow are typically initialized with which action?',
      options: ['Initialize variable', 'Delete database', 'Format painter', 'Compile C#'],
      correct: 0,
    },
    {
      q: 'You use variables to store values you may ___ later in the run.',
      options: ['read or update during the same run', 'sell on an auction site', 'encrypt the OS disk', 'replace Azure AD'],
      correct: 0,
    },
  ],
  conditions: [
    {
      q: 'A Condition control lets the flow branch based on ___.',
      options: ['whether an expression is true or false', 'monitor refresh rate only', 'Teams theme only', 'CPU temperature'],
      correct: 0,
    },
    {
      q: '“If yes / If no” branches are a common pattern for ___.',
      options: ['decision logic', 'printing barcodes only', 'installing drivers', 'BI drillthrough only'],
      correct: 0,
    },
  ],
  loops: [
    {
      q: 'Apply to each runs actions ___.',
      options: ['once for every item in a collection', 'only when the flow is deleted', 'inside SQL Server only', 'without any inputs'],
      correct: 0,
    },
    {
      q: 'Heavy nesting of loops can contribute to ___.',
      options: ['slower runs and limit issues', 'faster-than-light travel', 'automatic DBA rights', 'offline OneDrive sync only'],
      correct: 0,
    },
  ],
  approvals: [
    {
      q: 'Approval actions are often used to ___.',
      options: ['request a human decision before continuing', 'format USB drives', 'compile Android APKs', 'replace Active Directory'],
      correct: 0,
    },
    {
      q: 'Approvers can often respond from ___.',
      options: ['email, Teams, or the Power Automate approvals center', 'only floppy disk', 'BIOS settings', 'printer firmware'],
      correct: 0,
    },
  ],
  connectors: [
    {
      q: 'Connectors let your flow talk to ___.',
      options: ['external services and data sources', 'only local RAM', 'GPU shaders only', 'motherboard firmware'],
      correct: 0,
    },
    {
      q: 'Premium connectors usually require ___.',
      options: ['appropriate licensing or capacity', 'Windows XP', 'no internet', 'a parallel port'],
      correct: 0,
    },
  ],
  expressions: [
    {
      q: 'Expressions in Power Automate often use functions from the ___.',
      options: ['Workflow Definition Language', 'Fortran 77 spec', 'AutoCAD LISP only', 'bash history file'],
      correct: 0,
    },
    {
      q: 'Dynamic content picks values from ___.',
      options: ['previous steps in the same run', 'random internet pages', 'printer queues only', 'CPU microcode'],
      correct: 0,
    },
  ],
  json: [
    {
      q: 'JSON is commonly used to represent ___.',
      options: ['structured data as text', 'physical cable lengths', 'BIOS passwords', 'printer DPI only'],
      correct: 0,
    },
    {
      q: 'Parse JSON helps turn a JSON string into ___.',
      options: ['properties you can reference in later actions', 'a video file', 'an .exe', 'a SQL backup'],
      correct: 0,
    },
  ],
  api: [
    {
      q: 'The HTTP action is often used to call ___.',
      options: ['REST APIs and webhooks', 'only FTP from 1995', 'parallel printer ports', 'floppy disk images'],
      correct: 0,
    },
    {
      q: 'When calling APIs you should handle ___.',
      options: ['authentication, errors, and throttling', 'only screen brightness', 'mouse ball cleaning', 'CRT degaussing'],
      correct: 0,
    },
  ],
  errors: [
    {
      q: 'A Scope action with “run after” settings can help ___.',
      options: ['catch and handle failures in a section of the flow', 'delete Azure subscriptions', 'format USB drives', 'install printer drivers'],
      correct: 0,
    },
    {
      q: 'Configure run after on a step to react when that step ___.',
      options: ['fails, is skipped, or times out (as you choose)', 'only when the moon is full', 'never', 'only on Sundays'],
      correct: 0,
    },
  ],
  testing: [
    {
      q: 'Run history shows ___.',
      options: ['inputs, outputs, and errors for past runs', 'only your Teams wallpaper', 'GPU temperature', 'Windows product key'],
      correct: 0,
    },
    {
      q: 'Testing in a non-production environment reduces risk to ___.',
      options: ['production data and users', 'your mouse battery only', 'screen savers', 'wallpaper rotation'],
      correct: 0,
    },
  ],
  limits: [
    {
      q: 'Throttling means a service may ___.',
      options: ['slow or reject calls when limits are exceeded', 'always run unlimited', 'delete your tenant', 'only work on Sundays'],
      correct: 0,
    },
    {
      q: 'Pagination helps when a list has ___.',
      options: ['more items than a single response should return', 'zero items always', 'only pictures', 'only audio'],
      correct: 0,
    },
  ],
  sharepoint: [
    {
      q: 'SharePoint connectors often react to events like ___.',
      options: ['item created or modified in a list/library', 'CPU fan speed', 'BIOS updates', 'DVD insertion'],
      correct: 0,
    },
    {
      q: 'SharePoint is strong for documents and site-based lists; Dataverse is often better for ___.',
      options: ['modeled relational business data with security roles', 'GPU overclocking', 'printer firmware', 'video editing'],
      correct: 0,
    },
  ],
  teams: [
    {
      q: 'Power Automate can post messages or cards to ___.',
      options: ['Microsoft Teams channels or chats', 'only IRC from 1990', 'fax machines only', 'parallel ports'],
      correct: 0,
    },
    {
      q: 'Teams + flows are common for ___.',
      options: ['notifications and approvals where people already work', 'replacing TCP/IP', 'disk defrag', 'CRT calibration'],
      correct: 0,
    },
  ],
  forms: [
    {
      q: 'Microsoft Forms triggers often start when ___.',
      options: ['a respondent submits a form', 'Excel autosaves', 'the PC sleeps', 'a printer jams'],
      correct: 0,
    },
    {
      q: 'Form responses can be processed to notify people or update ___.',
      options: ['SharePoint, Excel, Dataverse, or other systems', 'only the BIOS', 'GPU drivers only', 'mouse firmware'],
      correct: 0,
    },
  ],
  dataverse: [
    {
      q: 'Dataverse stores business data with ___.',
      options: ['tables, relationships, and security', 'only GIF files', 'temporary RAM only', 'printer queues'],
      correct: 0,
    },
    {
      q: 'Model-driven apps often use Dataverse as their ___.',
      options: ['data and metadata layer', 'video codec', 'GPU shader cache', 'sound card driver'],
      correct: 0,
    },
  ],
  powerapps: [
    {
      q: 'Power Apps can trigger or interact with flows for ___.',
      options: ['user-driven scenarios and line-of-business UIs', 'only BIOS settings', 'CRT monitors only', 'parallel ports'],
      correct: 0,
    },
    {
      q: 'Canvas apps give flexible UI; model-driven apps lean on ___.',
      options: ['Dataverse metadata and views', 'only Notepad', 'printer DPI', 'mouse ball weight'],
      correct: 0,
    },
  ],
  childflows: [
    {
      q: 'Child flows help you ___.',
      options: ['reuse logic and keep parent flows readable', 'delete all environments', 'replace Windows', 'format disks'],
      correct: 0,
    },
    {
      q: 'Calling a child flow is similar to ___.',
      options: ['calling a subroutine with inputs and outputs', 'installing a printer driver manually', 'BIOS flashing', 'defragging HDD'],
      correct: 0,
    },
  ],
  envvars: [
    {
      q: 'Environment variables help store configuration ___.',
      options: ['per environment (dev/test/prod) without hard-coding secrets in every flow', 'only on floppy disks', 'in GPU VRAM only', 'in mouse firmware'],
      correct: 0,
    },
    {
      q: 'Secrets should use ___.',
      options: ['Azure Key Vault references or approved secret stores—not plain text in email', 'sticky notes on monitors', 'public chat', 'unencrypted FTP'],
      correct: 0,
    },
  ],
  solutions: [
    {
      q: 'Solutions support ALM by packaging ___.',
      options: ['flows, apps, tables, and related components for deployment', 'only wallpapers', 'printer drivers', 'GPU BIOS'],
      correct: 0,
    },
    {
      q: 'Deploying through solutions helps with ___.',
      options: ['repeatable promotion between environments', 'random flow deletion', 'disabling HTTPS', 'removing backups'],
      correct: 0,
    },
  ],
  security: [
    {
      q: 'DLP policies can restrict which connectors or data ___.',
      options: ['flows are allowed to use in an environment', 'wallpapers can show', 'mouse can click', 'speakers can play'],
      correct: 0,
    },
    {
      q: 'Least privilege means service accounts and connections should have ___.',
      options: ['only the permissions they truly need', 'global admin always', 'every license', 'owner on all tenants'],
      correct: 0,
    },
  ],
  copilot: [
    {
      q: 'Copilot features in Power Platform aim to help you ___.',
      options: ['draft or explain steps faster—with you still validating results', 'replace all testing', 'guarantee zero bugs', 'delete production data'],
      correct: 0,
    },
    {
      q: 'You should always ___.',
      options: ['review AI-suggested actions against your org policies and real data', 'run untested flows in production blindly', 'share secrets in prompts', 'ignore run history'],
      correct: 0,
    },
  ],
}

function escapeHtml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * @param {string} slug
 * @returns {string}
 */
export function getRandomQuizHtml(slug) {
  const pool = QUIZZES_BY_SLUG[slug]
  if (!pool?.length) return ''

  const item = pool[Math.floor(Math.random() * pool.length)]
  const name = `lesson-quiz-${slug.replace(/[^a-z0-9-]/gi, '-')}`
  const opts = item.options
    .map((opt, i) => {
      const id = `${name}-opt-${i}`
      return `<label class="lesson-quiz-option flex cursor-pointer items-start gap-3 rounded-lg border border-base-300/80 bg-base-100 px-3 py-2.5 has-[:checked]:border-primary/60 has-[:checked]:bg-primary/5">
  <input type="radio" class="radio radio-primary radio-sm mt-0.5 shrink-0" name="${escapeHtml(name)}" value="${i}" id="${escapeHtml(id)}" />
  <span class="text-sm leading-snug text-base-content/90">${escapeHtml(opt)}</span>
</label>`
    })
    .join('\n')

  return `
<section class="lesson-quiz not-prose mt-8 rounded-xl border border-primary/25 bg-gradient-to-br from-primary/5 to-base-100 p-4 md:p-5 shadow-sm" data-correct="${item.correct}" aria-label="Quick knowledge check">
  <h5 class="lesson-quiz-heading mb-1 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-primary">
    <i class="fas fa-circle-question" aria-hidden="true"></i>
    Quick check
  </h5>
  <p class="lesson-quiz-question mb-4 text-base font-medium text-base-content">${escapeHtml(item.q)}</p>
  <fieldset class="lesson-quiz-fieldset space-y-2 border-0 p-0 m-0">
    <legend class="sr-only">Choose one answer</legend>
    ${opts}
  </fieldset>
  <div class="mt-4 flex flex-wrap items-center gap-2">
    <button type="button" class="lesson-quiz-check btn btn-primary btn-sm gap-2">
      <i class="fas fa-check" aria-hidden="true"></i>
      Check answer
    </button>
    <button type="button" class="lesson-quiz-reset btn btn-ghost btn-sm btn-outline border-base-300">
      Clear
    </button>
  </div>
  <p class="lesson-quiz-feedback mt-3 hidden text-sm font-medium" role="status" aria-live="polite"></p>
</section>`
}
