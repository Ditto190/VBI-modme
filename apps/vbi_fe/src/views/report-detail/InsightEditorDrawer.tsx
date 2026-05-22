import { Button } from '../../components/ui/button'
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '../../components/ui/drawer'
import { X } from '../../components/ui/icons'
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
      <DrawerContent className='ui-drawer-panel-wide' showHandle={false}>
        <DrawerHeader>
          <div>
            <DrawerTitle>{t('reportDetail.editInsight')}</DrawerTitle>
            <DrawerDescription className='sr-only'>{t('reportDetail.editInsight')}</DrawerDescription>
          </div>
          <DrawerClose className='ui-drawer-close' aria-label='Close'>
            <X className='h-4 w-4' />
          </DrawerClose>
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
            <div className='report-detail-placeholder'>
              <Spinner label={t('reportDetail.connectingInsightEditor')} />
            </div>
          )}
        </DrawerBody>
        <DrawerFooter>
          <Button onClick={closeInsightEditor}>{t('common.close')}</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
