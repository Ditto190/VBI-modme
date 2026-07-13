'use client'

import { useEffect, useMemo } from 'react'
import { applicationShallowEqual, useApplication } from '../../application'
import { CenteredState } from '../../components/ui/centered-state'
import { Spinner } from '../../components/ui/spinner'
import { useTranslation } from '../../i18n'
import { getSessionUserName } from '../../utils/collaboration'
import { useManageRouteChrome } from '../ManageRouteChrome'
import { InsightResourceEditor } from './InsightResourceEditor'
import { useResourceEditorName } from './useResourceEditorName'

type InsightEditorPageProps = {
  id: string
}

export const InsightEditorPage = ({ id }: InsightEditorPageProps) => {
  const { t } = useTranslation()
  const backLabel = t('common.back')
  const editorTitle = t('insights.editorTitle')
  const renameLabel = t('common.rename')
  const { activateList, connectSession } = useApplication(
    (state) => ({
      activateList: state.insight.activate,
      connectSession: state.insight.editor.connect,
    }),
    { equality: applicationShallowEqual },
  )
  const builder = useApplication((state) => state.insight.editor.builders[id]?.builder ?? null)
  const { name, rename, setName } = useResourceEditorName({
    fallback: editorTitle,
    id,
    kind: 'insight',
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
    <div className='flex h-full min-h-0 overflow-auto bg-[var(--vbi-bg)] p-5 text-[var(--vbi-text)] transition-colors duration-300'>
      <section className='mx-auto flex w-[min(100%,960px)] min-h-0 flex-1 flex-col rounded-md border border-[var(--vbi-border)] bg-[var(--vbi-secondary)] p-4 shadow-[var(--vbi-shadow)]'>
        {builder ? (
          <InsightResourceEditor placeholder={t('insights.editContentPlaceholder')} selectedId={id} />
        ) : (
          <CenteredState className='h-full flex-1' minHeight='sm'>
            <Spinner label={editorTitle} />
          </CenteredState>
        )}
      </section>
    </div>
  )
}
