import { Input, Textarea } from '../../components/ui/input'
import type { Translate } from '../../i18n'
import { ResourceCreateDrawer } from './ResourceCreateDrawer'

type Props = {
  createContent: string
  createName: string
  createOpen: boolean
  t: Translate
  closeCreate(): void
  create(): Promise<void>
  setCreateContent(createContent: string): void
  setCreateName(createName: string): void
}

export const InsightResourceModals = ({
  closeCreate,
  create,
  createContent,
  createName,
  createOpen,
  setCreateContent,
  setCreateName,
  t,
}: Props) => (
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
)
