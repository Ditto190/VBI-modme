'use client'

import { memo, useEffect, useMemo } from 'react'
import { applicationShallowEqual, useApplication } from '../../application'
import { Collaborators } from '../../components/Collaborators'
import { lazyComponent } from '../../components/LazyComponent'
import { FullscreenSpinner } from '../../components/ui/spinner'
import { useTranslation } from '../../i18n'
import { getSessionUserName } from '../../utils/collaboration'
import { useResourceEditorName } from '../resources/shared/useResourceEditorName'
import { useManageRouteChrome } from '../workspace/ManageRouteChrome'

const userName = getSessionUserName()
const ReportWorkspace = lazyComponent(
  () => import('./ReportWorkspace').then((module) => ({ default: module.ReportWorkspace })),
  <FullscreenSpinner />,
)

export const ReportDetailPage = memo(({ id = '' }: { id?: string }) => {
  const { t } = useTranslation()
  const backLabel = t('common.back')
  const reportTitle = t('reportDetail.title')
  const renameLabel = t('common.rename')
  const { activateList, activateReport, provider, reportBuilder } = useApplication(
    (state) => ({
      activateList: state.report.activate,
      activateReport: state.reportDetail.activate,
      provider: state.reportDetail.provider,
      reportBuilder: state.reportDetail.reportBuilder,
    }),
    { equality: applicationShallowEqual },
  )
  const { name, rename, setName } = useResourceEditorName({
    fallback: reportTitle,
    id,
    kind: 'report',
  })
  const routeChrome = useMemo(
    () => ({
      actions: provider ? <Collaborators provider={provider} /> : undefined,
      backLabel,
      contentClassName: 'overflow-hidden p-0 max-[720px]:p-0',
      rename: {
        fallbackTitle: reportTitle,
        label: renameLabel,
        onChange: setName,
        onCommit: rename,
        value: name,
      },
      title: name.trim() || reportTitle,
      onBack: () => {
        void activateList()
      },
    }),
    [activateList, backLabel, name, provider, rename, renameLabel, reportTitle, setName],
  )
  useManageRouteChrome(routeChrome)

  useEffect(() => activateReport(id, userName), [activateReport, id])

  if (!id) return <div>{t('reportDetail.invalidId')}</div>
  if (!reportBuilder) return <FullscreenSpinner />

  return (
    <div className='flex h-full min-h-0 overflow-hidden bg-transparent transition-colors duration-300'>
      <ReportWorkspace />
    </div>
  )
})
