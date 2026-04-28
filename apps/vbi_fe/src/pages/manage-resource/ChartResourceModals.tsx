import { APP as StandardAPP } from 'standard'
import { Drawer, Input, Modal, Typography, message } from 'antd'
import type { Translate } from '../../i18n'
import type { useStandardAppProps } from '../../hooks/useStandardAppProps'
import type { BuilderByKind } from '../../models/resource-builder.types'

type Props = {
  builder: BuilderByKind['chart'] | null
  createName: string
  createOpen: boolean
  editorName: string
  selectedId: string
  standardAppProps: ReturnType<typeof useStandardAppProps>
  t: Translate
  closeCreate(): void
  closeDetail(): Promise<void>
  create(): Promise<void>
  renameSelected(): Promise<void>
  setCreateName(createName: string): void
  setEditorName(editorName: string): void
}

const drawerStyles = { wrapper: { maxWidth: '92vw' } }

export const ChartResourceModals = ({
  builder,
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
  standardAppProps,
  t,
}: Props) => (
  <>
    <Modal
      open={createOpen}
      title={t('charts.createTitle')}
      onOk={async () => {
        if (!createName.trim()) {
          message.warning(t('charts.nameRequired'))
          return
        }
        await create()
      }}
      onCancel={closeCreate}
    >
      <Input value={createName} onChange={(event) => setCreateName(event.target.value)} />
    </Modal>
    <Drawer
      open={!!selectedId}
      size={1440}
      styles={drawerStyles}
      title={editorName || t('charts.editorTitle')}
      onClose={() => void closeDetail()}
    >
      <Input
        style={{ marginBottom: 16 }}
        value={editorName}
        onChange={(event) => setEditorName(event.target.value)}
        placeholder={t('charts.namePlaceholder')}
        onBlur={() => void renameSelected()}
        onPressEnter={() => void renameSelected()}
      />
      {builder ? (
        <StandardAPP builder={builder} mode='edit' {...standardAppProps} />
      ) : (
        <Typography.Text>{t('charts.connecting')}</Typography.Text>
      )}
    </Drawer>
  </>
)
