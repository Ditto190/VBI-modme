import { Button } from '../../components/ui/button'
import { CenteredState } from '../../components/ui/centered-state'
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '../../components/ui/drawer'
import { Spinner } from '../../components/ui/spinner'
import { Textarea } from '../../components/ui/input'
import { useTranslation } from '../../i18n'
import { useInsightBuilderModel } from '../../models'
import { useReportDetailStore } from '../../stores/report-detail.store'

export const InsightEditorDrawer = () => {
  const { t } = useTranslation()
  const closeInsightEditor = useReportDetailStore((state) => state.closeInsightEditor)
  const insightId = useReportDetailStore((state) => state.connectedInsightId)
  const open = useReportDetailStore((state) => state.insightEditorOpen)
  const setInsightContent = useReportDetailStore((state) => state.setInsightContent)
  const insightSession = useInsightBuilderModel((state) => state.sessions[insightId])
  const insightBuilder = insightSession?.builder ?? null
  const content = insightBuilder?.build().content ?? ''

  return (
    <Drawer
      open={open}
      direction='right'
      onOpenChange={(nextOpen) => {
        if (!nextOpen) closeInsightEditor()
      }}
    >
      <DrawerContent showHandle={false}>
        <DrawerHeader>
          <div>
            <DrawerTitle>{t('reportDetail.editInsight')}</DrawerTitle>
            <DrawerDescription className='sr-only'>{t('reportDetail.editInsight')}</DrawerDescription>
          </div>
          <DrawerCloseButton label={t('common.close')} />
        </DrawerHeader>
        <DrawerBody>
          {insightBuilder ? (
            <Textarea
              className='min-h-80'
              value={content}
              placeholder={t('reportDetail.insightPlaceholder')}
              onChange={(event) => setInsightContent(event.target.value)}
            />
          ) : (
            <CenteredState minHeight='sm'>
              <Spinner label={t('reportDetail.connectingInsightEditor')} />
            </CenteredState>
          )}
        </DrawerBody>
        <DrawerFooter>
          <Button onClick={closeInsightEditor}>{t('common.close')}</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
