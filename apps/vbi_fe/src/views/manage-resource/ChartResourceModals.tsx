import { Input } from '../../components/ui/input'
import type { Translate } from '../../i18n'
import { ResourceCreateDrawer } from './ResourceCreateDrawer'

type Props = {
  createName: string
  createOpen: boolean
  t: Translate
  closeCreate(): void
  create(): Promise<void>
  setCreateName(createName: string): void
}

export const ChartResourceModals = ({ closeCreate, create, createName, createOpen, setCreateName, t }: Props) => {
  return (
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
  )
}
