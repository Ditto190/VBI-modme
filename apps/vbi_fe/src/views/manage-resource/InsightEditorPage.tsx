'use client'

import { useCallback, useMemo } from 'react'
import { CenteredState } from '../../components/ui/centered-state'
import { Spinner } from '../../components/ui/spinner'
import { useStoreLifecycle } from '../../hooks/useStoreLifecycle'
import { useTranslation } from '../../i18n'
import { useInsightBuilderModel } from '../../models'
import { useNavigationStore } from '../../stores/navigation.store'
import { connectResourceSession, releaseResourceSession } from '../../stores/resource-session.store'
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
  const go = useNavigationStore((state) => state.go)
  const builder = useInsightBuilderModel((state) => state.sessions[id]?.builder ?? null)
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
      onBack: () => go('/manage/insights'),
    }),
    [backLabel, editorTitle, go, name, rename, renameLabel, setName],
  )
  useManageRouteChrome(routeChrome)

  const bootInsight = useCallback(() => connectResourceSession('insight', id, getSessionUserName()), [id])
  const releaseInsight = useCallback(() => releaseResourceSession('insight', id), [id])
  useStoreLifecycle(bootInsight, releaseInsight)

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
