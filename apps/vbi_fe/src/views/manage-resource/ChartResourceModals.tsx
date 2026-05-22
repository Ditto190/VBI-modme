import { Input } from '../../components/ui/input'
import { EditableDrawerTitle } from '../../components/ui/editable-drawer-title'
import dynamic from 'next/dynamic'
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
import { toast } from '../../components/ui/toast'
import { Button } from '../../components/ui/button'
import { X } from '../../components/ui/icons'
import type { Translate } from '../../i18n'

const ChartResourceEditor = dynamic(
  () => import('./ChartResourceEditor').then((module) => module.ChartResourceEditor),
  {
    ssr: false,
  },
)

type Props = {
  createName: string
  createOpen: boolean
  editorName: string
  selectedId: string
  t: Translate
  closeCreate(): void
  closeDetail(): Promise<void>
  create(): Promise<void>
  renameSelected(): Promise<void>
  setCreateName(createName: string): void
  setEditorName(editorName: string): void
}

export const ChartResourceModals = ({
  closeCreate,
  closeDetail,
  create,
  createName,
  createOpen,
  editorName,
  renameSelected,
  selectedId,
  setCreateName,
  setEditorName,
  t,
}: Props) => {
  return (
    <>
      <Drawer
        open={createOpen}
        direction='bottom'
        onOpenChange={(open) => {
          if (!open) closeCreate()
        }}
      >
        <DrawerContent className='ui-drawer-panel-wide'>
          <DrawerHeader>
            <div>
              <DrawerTitle>{t('charts.createTitle')}</DrawerTitle>
              <DrawerDescription className='sr-only'>{t('charts.createTitle')}</DrawerDescription>
            </div>
            <DrawerClose className='ui-drawer-close' aria-label='Close'>
              <X className='h-4 w-4' />
            </DrawerClose>
          </DrawerHeader>
          <DrawerBody>
            <Input value={createName} onChange={(event) => setCreateName(event.target.value)} />
          </DrawerBody>
          <DrawerFooter>
            <Button variant='secondary' onClick={closeCreate}>
              {t('common.cancel')}
            </Button>
            <Button
              variant='primary'
              onClick={() => {
                if (!createName.trim()) {
                  toast.warning(t('charts.nameRequired'))
                  return
                }
                void create()
              }}
            >
              {t('charts.create')}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Drawer
        open={!!selectedId}
        direction='right'
        onOpenChange={(open) => {
          if (!open) void closeDetail()
        }}
      >
        <DrawerContent className='chart-resource-editor-drawer ui-drawer-panel-wide' showHandle={false}>
          <DrawerHeader>
            <div>
              <EditableDrawerTitle
                editLabel={t('common.rename')}
                fallback={t('charts.editorTitle')}
                value={editorName}
                onChange={setEditorName}
                onCommit={renameSelected}
              />
              <DrawerDescription className='sr-only'>{t('charts.editorTitle')}</DrawerDescription>
            </div>
            <DrawerClose className='ui-drawer-close' aria-label='Close'>
              <X className='h-4 w-4' />
            </DrawerClose>
          </DrawerHeader>
          <DrawerBody className='chart-resource-editor-drawer-body'>
            {selectedId ? <ChartResourceEditor selectedId={selectedId} t={t} /> : null}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
