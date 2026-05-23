import { Input } from '../../components/ui/input'
import { EditableDrawerTitle } from '../../components/ui/editable-drawer-title'
import dynamic from 'next/dynamic'
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
} from '../../components/ui/drawer'
import type { Translate } from '../../i18n'
import { ResourceCreateDrawer } from './ResourceCreateDrawer'

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
      <ResourceCreateDrawer
        cancelLabel={t('common.cancel')}
        closeLabel={t('common.close')}
        confirmLabel={t('charts.create')}
        invalidMessage={t('charts.nameRequired')}
        isValid={() => !!createName.trim()}
        open={createOpen}
        title={t('charts.createTitle')}
        onClose={closeCreate}
        onConfirm={create}
      >
        <Input
          value={createName}
          placeholder={t('charts.namePlaceholder')}
          onChange={(event) => setCreateName(event.target.value)}
        />
      </ResourceCreateDrawer>
      <Drawer
        open={!!selectedId}
        direction='right'
        onOpenChange={(open) => {
          if (!open) void closeDetail()
        }}
      >
        <DrawerContent
          className='chart-resource-editor-drawer overflow-hidden bg-[var(--vbi-editor-bg)]'
          showHandle={false}
        >
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
            <DrawerCloseButton label={t('common.close')} />
          </DrawerHeader>
          <DrawerBody className='chart-resource-editor-drawer-body flex min-h-0 flex-col gap-2.5 overflow-hidden bg-[var(--vbi-editor-bg)] p-2.5'>
            {selectedId ? <ChartResourceEditor selectedId={selectedId} t={t} /> : null}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
