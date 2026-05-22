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
import { Input, Textarea } from '../../components/ui/input'
import { toast } from '../../components/ui/toast'
import { X } from '../../components/ui/icons'
import type { Translate } from '../../i18n'

const InsightResourceEditor = dynamic(
  () => import('./InsightResourceEditor').then((module) => module.InsightResourceEditor),
  {
    ssr: false,
  },
)

type Props = {
  createContent: string
  createName: string
  createOpen: boolean
  editorName: string
  selectedId: string
  t: Translate
  closeCreate(): void
  closeDetail(): Promise<void>
  create(): Promise<void>
  renameSelected(): Promise<void>
  setCreateContent(createContent: string): void
  setCreateName(createName: string): void
  setEditorName(editorName: string): void
}

export const InsightResourceModals = ({
  closeCreate,
  closeDetail,
  create,
  createContent,
  createName,
  createOpen,
  editorName,
  renameSelected,
  selectedId,
  setCreateContent,
  setCreateName,
  setEditorName,
  t,
}: Props) => (
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
            <DrawerTitle>{t('insights.createTitle')}</DrawerTitle>
            <DrawerDescription className='sr-only'>{t('insights.createTitle')}</DrawerDescription>
          </div>
          <DrawerClose className='ui-drawer-close' aria-label='Close'>
            <X className='h-4 w-4' />
          </DrawerClose>
        </DrawerHeader>
        <DrawerBody>
          <div className='grid gap-3'>
            <Input
              value={createName}
              placeholder={t('insights.titlePlaceholder')}
              onChange={(event) => setCreateName(event.target.value)}
            />
            <Textarea
              rows={6}
              value={createContent}
              placeholder={t('insights.contentPlaceholder')}
              onChange={(event) => setCreateContent(event.target.value)}
            />
          </div>
        </DrawerBody>
        <DrawerFooter>
          <Button variant='secondary' onClick={closeCreate}>
            {t('common.cancel')}
          </Button>
          <Button
            variant='primary'
            onClick={() => {
              if (!createName.trim()) {
                toast.warning(t('insights.nameRequired'))
                return
              }
              void create()
            }}
          >
            {t('insights.create')}
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
      <DrawerContent className='ui-drawer-panel-wide' showHandle={false}>
        <DrawerHeader>
          <div>
            <EditableDrawerTitle
              editLabel={t('common.rename')}
              fallback={t('insights.editorTitle')}
              value={editorName}
              onChange={setEditorName}
              onCommit={renameSelected}
            />
            <DrawerDescription className='sr-only'>{t('insights.editorTitle')}</DrawerDescription>
          </div>
          <DrawerClose className='ui-drawer-close' aria-label='Close'>
            <X className='h-4 w-4' />
          </DrawerClose>
        </DrawerHeader>
        <DrawerBody>
          {selectedId ? (
            <InsightResourceEditor placeholder={t('insights.editContentPlaceholder')} selectedId={selectedId} />
          ) : null}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  </>
)
