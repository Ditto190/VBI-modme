import { Input } from '../../components/ui/input'
import { useTranslation } from '../../i18n'
import { ResourceCreateDrawer } from '../manage-resource/ResourceCreateDrawer'

type Props = {
  createName: string
  isCreateOpen: boolean
  onCloseCreate: () => void
  onConfirmCreate: () => Promise<void>
  onCreateNameChange: (value: string) => void
}

export const ReportResourceModals = ({
  createName,
  isCreateOpen,
  onCloseCreate,
  onConfirmCreate,
  onCreateNameChange,
}: Props) => {
  const { t } = useTranslation()

  return (
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
  )
}
