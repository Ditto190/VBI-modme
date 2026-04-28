import { Button, Drawer, Input, Modal, Space, message } from 'antd'
import type { VBIInsightBuilder } from '@visactor/vbi'
import type { Translate } from '../../i18n'
import type { BuilderSession } from '../../models/resource-builder.types'

type Props = {
  createContent: string
  createName: string
  createOpen: boolean
  editorName: string
  insightContent: string
  insightSession?: BuilderSession<VBIInsightBuilder>
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

const drawerStyles = { wrapper: { maxWidth: '92vw' } }
const fullWidth = { width: '100%' }

export const InsightResourceModals = ({
  closeCreate,
  closeDetail,
  create,
  createContent,
  createName,
  createOpen,
  editorName,
  insightContent,
  insightSession,
  renameSelected,
  selectedId,
  setCreateContent,
  setCreateName,
  setEditorName,
  t,
}: Props) => (
  <>
    <Modal
      open={createOpen}
      title={t('insights.createTitle')}
      onOk={async () => {
        if (!createName.trim()) {
          message.warning(t('insights.nameRequired'))
          return
        }
        await create()
      }}
      onCancel={closeCreate}
    >
      <Space orientation="vertical" style={fullWidth} size={12}>
        <Input
          value={createName}
          placeholder={t('insights.titlePlaceholder')}
          onChange={(event) => setCreateName(event.target.value)}
        />
        <Input.TextArea
          rows={6}
          value={createContent}
          placeholder={t('insights.contentPlaceholder')}
          onChange={(event) => setCreateContent(event.target.value)}
        />
      </Space>
    </Modal>
    <Drawer
      open={!!selectedId}
      size={720}
      styles={drawerStyles}
      title={editorName || t('insights.editorTitle')}
      onClose={() => void closeDetail()}
      extra={<Button onClick={() => void closeDetail()}>{t('common.close')}</Button>}
    >
      <Space orientation="vertical" style={fullWidth} size={12}>
        <Input
          value={editorName}
          placeholder={t('insights.titlePlaceholder')}
          onChange={(event) => setEditorName(event.target.value)}
          onBlur={() => void renameSelected()}
          onPressEnter={() => void renameSelected()}
        />
        <Input.TextArea
          autoSize={{ minRows: 10, maxRows: 20 }}
          value={insightContent}
          placeholder={t('insights.editContentPlaceholder')}
          onChange={(event) => {
            insightSession?.builder?.setContent(event.target.value)
          }}
        />
      </Space>
    </Drawer>
  </>
)
