import dynamic from 'next/dynamic'
import { CenteredState } from '../../components/ui/centered-state'
import { EditableDrawerTitle } from '../../components/ui/editable-drawer-title'
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
} from '../../components/ui/drawer'
import { Input } from '../../components/ui/input'
import { Spinner } from '../../components/ui/spinner'
import { useTranslation } from '../../i18n'
import { ResourceCreateDrawer } from '../manage-resource/ResourceCreateDrawer'

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
      <CenteredState minHeight='sm'>
        <Spinner />
      </CenteredState>
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
      <ResourceCreateDrawer
        cancelLabel={t('common.cancel')}
        closeLabel={t('common.close')}
        confirmLabel={t('reports.create')}
        invalidMessage={t('reports.nameRequired')}
        isValid={() => !!createName.trim()}
        open={isCreateOpen}
        title={t('reports.createTitle')}
        onClose={onCloseCreate}
        onConfirm={onConfirmCreate}
      >
        <Input
          value={createName}
          placeholder={t('reports.namePlaceholder')}
          onChange={(event) => onCreateNameChange(event.target.value)}
        />
      </ResourceCreateDrawer>
      <Drawer
        open={!!selectedId}
        direction='right'
        onOpenChange={(open) => {
          if (!open) void onCloseDetail()
        }}
      >
        <DrawerContent showHandle={false}>
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
            <DrawerCloseButton label={t('common.close')} />
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
