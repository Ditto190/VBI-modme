import { Input, Modal } from 'antd'
import type { VBIChartBuilder } from '@visactor/vbi'
import type { MappedField } from 'src/types'
import type { ProfessionalLabels } from 'src/config/labels'
import { renameMappedField } from './fieldMutations'

export const openRenameModal = (builder: VBIChartBuilder, item: MappedField, labels: ProfessionalLabels) => {
  let alias = item.alias || item.field
  Modal.confirm({
    title: labels.menuRename,
    okText: 'OK',
    cancelText: 'Cancel',
    content: (
      <Input
        autoFocus
        defaultValue={alias}
        onChange={(event) => {
          alias = event.target.value
        }}
      />
    ),
    onOk: () => renameMappedField(builder, item, alias),
  })
}
