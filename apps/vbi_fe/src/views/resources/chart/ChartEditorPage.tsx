'use client'

import { useEffect, useMemo } from 'react'
import { applicationShallowEqual, useApplication } from '../../../application'
import { CenteredState } from '../../../components/ui/centered-state'
import { Spinner } from '../../../components/ui/spinner'
import { useTranslation } from '../../../i18n'
import { getSessionUserName } from '../../../utils/collaboration'
import { useManageRouteChrome } from '../../workspace/ManageRouteChrome'
import { ChartResourceEditor } from './ChartResourceEditor'
import { useResourceEditorName } from '../shared/useResourceEditorName'

type ChartEditorPageProps = {
  id: string
}

export const ChartEditorPage = ({ id }: ChartEditorPageProps) => {
  const { t } = useTranslation()
  const backLabel = t('common.back')
  const editorTitle = t('charts.editorTitle')
  const renameLabel = t('common.rename')
  const { activateList, connectSession } = useApplication(
    (state) => ({
      activateList: state.chart.activate,
      connectSession: state.chart.editor.connect,
    }),
    { equality: applicationShallowEqual },
  )
  const builder = useApplication((state) => state.chart.editor.builders[id]?.builder ?? null)
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
      onBack: () => {
        void activateList()
      },
    }),
    [activateList, backLabel, editorTitle, name, rename, renameLabel, setName],
  )
  useManageRouteChrome(routeChrome)

  useEffect(() => connectSession(id, getSessionUserName()), [connectSession, id])

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
