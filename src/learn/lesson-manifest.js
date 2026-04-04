/**
 * Single source of truth for lesson order and sidebar navigation.
 * HTML bodies live in src/lessons/<slug>.html (imported as raw).
 */
export const LESSON_SLUGS = [
  'intro',
  'licensing',
  'interface',
  'flows',
  'triggers',
  'variables',
  'conditions',
  'loops',
  'approvals',
  'connectors',
  'expressions',
  'json',
  'api',
  'errors',
  'testing',
  'limits',
  'sharepoint',
  'teams',
  'forms',
  'dataverse',
  'powerapps',
  'childflows',
  'envvars',
  'solutions',
  'security',
  'copilot',
]

/** @type {{ id: string; slug: string; group: string; title: string }[]} */
export const LESSON_NAV_ITEMS = [
  { id: 'lesson-intro', slug: 'intro', group: 'basics', title: 'Introduction' },
  { id: 'lesson-licensing', slug: 'licensing', group: 'basics', title: 'Licensing' },
  { id: 'lesson-interface', slug: 'interface', group: 'basics', title: 'Interface' },
  { id: 'lesson-flows', slug: 'flows', group: 'basics', title: 'Types of flows' },
  { id: 'lesson-triggers', slug: 'triggers', group: 'basics', title: 'Triggers & actions' },
  { id: 'lesson-variables', slug: 'variables', group: 'basics', title: 'Variables' },
  { id: 'lesson-conditions', slug: 'conditions', group: 'flow', title: 'Conditional logic' },
  { id: 'lesson-loops', slug: 'loops', group: 'flow', title: 'Loops' },
  { id: 'lesson-approvals', slug: 'approvals', group: 'flow', title: 'Approvals' },
  { id: 'lesson-connectors', slug: 'connectors', group: 'flow', title: 'Connectors' },
  { id: 'lesson-testing', slug: 'testing', group: 'flow', title: 'Test & run history' },
  { id: 'lesson-limits', slug: 'limits', group: 'flow', title: 'Limits & pagination' },
  { id: 'lesson-sharepoint', slug: 'sharepoint', group: 'm365', title: 'SharePoint' },
  { id: 'lesson-teams', slug: 'teams', group: 'm365', title: 'Teams' },
  { id: 'lesson-forms', slug: 'forms', group: 'm365', title: 'Microsoft Forms' },
  { id: 'lesson-dataverse', slug: 'dataverse', group: 'm365', title: 'Dataverse' },
  { id: 'lesson-powerapps', slug: 'powerapps', group: 'm365', title: 'Power Apps' },
  { id: 'lesson-expressions', slug: 'expressions', group: 'advanced', title: 'Expressions' },
  { id: 'lesson-json', slug: 'json', group: 'advanced', title: 'JSON' },
  { id: 'lesson-api', slug: 'api', group: 'advanced', title: 'HTTP & APIs' },
  { id: 'lesson-errors', slug: 'errors', group: 'advanced', title: 'Error handling' },
  { id: 'lesson-childflows', slug: 'childflows', group: 'advanced', title: 'Child flows' },
  { id: 'lesson-envvars', slug: 'envvars', group: 'advanced', title: 'Environment variables' },
  { id: 'lesson-solutions', slug: 'solutions', group: 'advanced', title: 'Solutions & ALM' },
  { id: 'lesson-security', slug: 'security', group: 'advanced', title: 'Security' },
  { id: 'lesson-copilot', slug: 'copilot', group: 'advanced', title: 'Copilot' },
]

/** All lesson anchor ids (for book view + routing). */
export const LESSON_IDS = new Set(LESSON_NAV_ITEMS.map((l) => l.id))

export const NAV_GROUPS = [
  {
    id: 'basics',
    label: 'Basics',
    icon: 'fas fa-star',
    headerClass: 'text-warning',
    chevronClass: 'text-warning',
  },
  {
    id: 'flow',
    label: 'Flow design',
    icon: 'fas fa-diagram-project',
    headerClass: 'text-info',
    chevronClass: 'text-info',
  },
  {
    id: 'm365',
    label: 'Microsoft 365',
    icon: 'fas fa-building',
    headerClass: 'text-secondary',
    chevronClass: 'text-secondary',
  },
  {
    id: 'advanced',
    label: 'Advanced',
    icon: 'fas fa-rocket',
    headerClass: 'text-accent',
    chevronClass: 'text-accent',
  },
]
