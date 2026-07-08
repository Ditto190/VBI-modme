import { h } from '@stencil/core'

export interface RenameTarget {
  id: string
  alias: string
}

export interface DimensionRenameModalProps {
  target: RenameTarget
  title: string
  placeholder: string
  okText: string
  cancelText: string
  emptyNameMessage: string
  onClose: () => void
  onValueChange: (value: string) => void
  onRename: (id: string, newAlias: string) => void
}

export function renderShelfRenameModal(props: DimensionRenameModalProps) {
  const { target, title, placeholder, okText, cancelText, emptyNameMessage, onClose, onValueChange, onRename } = props

  const handleSave = () => {
    const trimmed = target.alias.trim()
    if (!trimmed) return
    onRename(target.id, trimmed)
  }

  return (
    <vbi-modal
      open={true}
      onVbiModalToggle={(e: CustomEvent<boolean>) => {
        if (!e.detail) onClose()
      }}
    >
      <div style={{ marginBottom: '16px', fontWeight: 'bold' }}>{title}</div>
      <vbi-input
        value={target.alias}
        onVbiInputValue={(e: CustomEvent<string>) => onValueChange(e.detail)}
        onKeyDown={(e: KeyboardEvent) => {
          if (e.key === 'Enter') handleSave()
        }}
        placeholder={placeholder}
        autofocus
      />
      {!target.alias.trim() && (
        <div style={{ color: 'var(--vbi-color-error, #ff4d4f)', fontSize: '12px', marginTop: '4px' }}>
          {emptyNameMessage}
        </div>
      )}
      <div slot='action' style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <vbi-button onClick={() => onClose()} size='sm'>
          {cancelText}
        </vbi-button>
        <vbi-button onClick={handleSave} size='sm' color='primary' disabled={!target.alias.trim()}>
          {okText}
        </vbi-button>
      </div>
    </vbi-modal>
  )
}
