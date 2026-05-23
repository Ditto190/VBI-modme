import dynamic from 'next/dynamic'
import { EditableDrawerTitle } from '../../components/ui/editable-drawer-title'
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
} from '../../components/ui/drawer'
import { Input, Textarea } from '../../components/ui/input'
import type { Translate } from '../../i18n'
import { ResourceCreateDrawer } from './ResourceCreateDrawer'

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
    <ResourceCreateDrawer
      cancelLabel={t('common.cancel')}
      closeLabel={t('common.close')}
      confirmLabel={t('insights.create')}
      invalidMessage={t('insights.nameRequired')}
      isValid={() => !!createName.trim()}
      open={createOpen}
      title={t('insights.createTitle')}
      onClose={closeCreate}
      onConfirm={create}
    >
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
    </ResourceCreateDrawer>
    <Drawer
      open={!!selectedId}
      direction='right'
      onOpenChange={(open) => {
        if (!open) void closeDetail()
      }}
    >
      <DrawerContent showHandle={false}>
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
          <DrawerCloseButton label={t('common.close')} />
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
