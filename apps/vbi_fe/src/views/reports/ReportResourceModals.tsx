import dynamic from 'next/dynamic'
import { Button } from '../../components/ui/button'
import { EditableDrawerTitle } from '../../components/ui/editable-drawer-title'
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
import { Input } from '../../components/ui/input'
import { Spinner } from '../../components/ui/spinner'
import { toast } from '../../components/ui/toast'
import { useTranslation } from '../../i18n'

type Props = {
  createName: string
  editorName: string
  isCreateOpen: boolean
  selectedId: string
  onCloseCreate: () => void
  onCloseDetail: () => Promise<void>
  onConfirmCreate: () => Promise<void>
  onCreateNameChange: (value: string) => void
  onEditorNameChange: (value: string) => void
  onRenameSelected: () => Promise<void>
}

const ReportResourceEditor = dynamic(
  () => import('./ReportResourceEditor').then((module) => module.ReportResourceEditor),
  {
    loading: () => (
      <div className='flex h-full min-h-64 items-center justify-center'>
        <Spinner />
      </div>
    ),
    ssr: false,
  },
)

export const ReportResourceModals = ({
  createName,
  editorName,
  isCreateOpen,
  selectedId,
  onCloseCreate,
  onCloseDetail,
  onConfirmCreate,
  onCreateNameChange,
  onEditorNameChange,
  onRenameSelected,
}: Props) => {
  const { t } = useTranslation()

  return (
    <>
      <Drawer
        open={isCreateOpen}
        direction='bottom'
        onOpenChange={(open) => {
          if (!open) onCloseCreate()
        }}
      >
        <DrawerContent className='ui-drawer-panel-wide'>
          <DrawerHeader>
            <div>
              <DrawerTitle>{t('reports.createTitle')}</DrawerTitle>
              <DrawerDescription className='sr-only'>{t('reports.createTitle')}</DrawerDescription>
            </div>
            <DrawerClose className='ui-drawer-close' aria-label='Close'>
              <X className='h-4 w-4' />
            </DrawerClose>
          </DrawerHeader>
          <DrawerBody>
            <Input value={createName} onChange={(event) => onCreateNameChange(event.target.value)} />
          </DrawerBody>
          <DrawerFooter>
            <Button variant='secondary' onClick={onCloseCreate}>
              {t('common.cancel')}
            </Button>
            <Button
              variant='primary'
              onClick={() => {
                if (!createName.trim()) {
                  toast.warning(t('reports.nameRequired'))
                  return
                }
                void onConfirmCreate()
              }}
            >
              {t('reports.create')}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Drawer
        open={!!selectedId}
        direction='right'
        onOpenChange={(open) => {
          if (!open) void onCloseDetail()
        }}
      >
        <DrawerContent className='ui-drawer-panel-wide' showHandle={false}>
          <DrawerHeader>
            <div>
              <EditableDrawerTitle
                editLabel={t('common.rename')}
                fallback={t('reportDetail.title')}
                value={editorName}
                onChange={onEditorNameChange}
                onCommit={onRenameSelected}
              />
              <DrawerDescription className='sr-only'>{t('reportDetail.title')}</DrawerDescription>
            </div>
            <DrawerClose className='ui-drawer-close' aria-label='Close'>
              <X className='h-4 w-4' />
            </DrawerClose>
          </DrawerHeader>
          <DrawerBody className='flex flex-col gap-4'>
            <div className='flex min-h-0 flex-1 overflow-hidden'>
              {selectedId ? <ReportResourceEditor selectedId={selectedId} /> : null}
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
