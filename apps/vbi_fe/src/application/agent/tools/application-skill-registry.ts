export const vbiApplicationSkillNames = [
  'application_overview',
  'resources',
  'report_detail',
  'layout_preferences',
  'agent',
  'builder_api',
] as const

export type VBIApplicationSkillName = (typeof vbiApplicationSkillNames)[number]

const skillMetadata: Record<VBIApplicationSkillName, { summary: string; title: string }> = {
  agent: {
    summary: 'Use application.agent for conversations, model preferences, and panel state.',
    title: 'Agent application API',
  },
  application_overview: {
    summary: 'Use the trusted vbi_application code tool against the semantic application API.',
    title: 'Application tool overview',
  },
  builder_api: {
    summary: 'Use VBI and Builder APIs from the application tool without legacy resource tools.',
    title: 'Builder and VBI API',
  },
  layout_preferences: {
    summary: 'Use layout, theme, and i18n application APIs.',
    title: 'Layout and preferences API',
  },
  report_detail: {
    summary: 'Use application.reportDetail for report pages and embedded chart or insight sections.',
    title: 'Report detail application API',
  },
  resources: {
    summary: 'Use application.chart, application.insight, and application.report resource APIs.',
    title: 'Resource application API',
  },
}

const skillLoaders: Record<VBIApplicationSkillName, () => Promise<string>> = {
  agent: () => import('./skills/agent').then((module) => module.agentApplicationSkill),
  application_overview: () => import('./skills/application-overview').then((module) => module.applicationOverviewSkill),
  builder_api: () => import('./skills/builder-api').then((module) => module.builderApiSkill),
  layout_preferences: () => import('./skills/layout-preferences').then((module) => module.layoutPreferencesSkill),
  report_detail: () => import('./skills/report-detail').then((module) => module.reportDetailSkill),
  resources: () => import('./skills/resources').then((module) => module.resourcesSkill),
}

const isVBIApplicationSkillName = (name: string): name is VBIApplicationSkillName =>
  (vbiApplicationSkillNames as readonly string[]).includes(name)

export const listVBIApplicationSkills = () =>
  vbiApplicationSkillNames.map((name) => ({
    name,
    summary: skillMetadata[name].summary,
    title: skillMetadata[name].title,
  }))

export const readVBIApplicationSkill = async (name: string) => {
  if (isVBIApplicationSkillName(name)) {
    return skillLoaders[name]()
  }
  throw new Error(`Unknown VBI application skill: ${name}`)
}
