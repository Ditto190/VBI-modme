'use client'

import { useCallback, useMemo } from 'react'
import { CenteredState } from '../../components/ui/centered-state'
import { Spinner } from '../../components/ui/spinner'
import { useStoreLifecycle } from '../../hooks/useStoreLifecycle'
import { useTranslation } from '../../i18n'
import { useChartBuilderModel } from '../../models'
import { useNavigationStore } from '../../stores/navigation.store'
import { connectResourceSession, releaseResourceSession } from '../../stores/resource-session.store'
import { getSessionUserName } from '../../utils/collaboration'
import { useManageRouteChrome } from '../ManageRouteChrome'
import { ChartResourceEditor } from './ChartResourceEditor'
import { useResourceEditorName } from './useResourceEditorName'

type ChartEditorPageProps = {
  id: string
}

export const ChartEditorPage = ({ id }: ChartEditorPageProps) => {
  const { t } = useTranslation()
  const backLabel = t('common.back')
  const editorTitle = t('charts.editorTitle')
  const renameLabel = t('common.rename')
  const go = useNavigationStore((state) => state.go)
  const builder = useChartBuilderModel((state) => state.sessions[id]?.builder ?? null)
  const { name, rename, setName } = useResourceEditorName({
    fallback: editorTitle,
    id,
    kind: 'chart',
  })
  const routeChrome = useMemo(
    () => ({
      backLabel,
      contentClassName: 'overflow-hidden p-0 max-[720px]:p-0',
      rename: {
        fallbackTitle: editorTitle,
        label: renameLabel,
        onChange: setName,
        onCommit: rename,
        value: name,
      },
      title: name.trim() || editorTitle,
      onBack: () => go('/manage/charts'),
    }),
    [backLabel, editorTitle, go, name, rename, renameLabel, setName],
  )
  useManageRouteChrome(routeChrome)

  const bootChart = useCallback(() => connectResourceSession('chart', id, getSessionUserName()), [id])
  const releaseChart = useCallback(() => releaseResourceSession('chart', id), [id])
  useStoreLifecycle(bootChart, releaseChart)

  return (
    <div className='flex h-full min-h-0 overflow-hidden bg-[var(--vbi-editor-bg)] p-2.5 text-[var(--vbi-text)] transition-colors duration-300'>
      {builder ? (
        <ChartResourceEditor selectedId={id} t={t} />
      ) : (
        <CenteredState className='h-full flex-1' minHeight='sm'>
          <Spinner label={t('charts.connecting')} />
        </CenteredState>
      )}
    </div>
  )
}
