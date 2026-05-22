import { useEffect, useRef, useState } from 'react'
import { Input } from './input'
import { DrawerTitle } from './drawer'
import { Pencil } from './icons'

type EditableDrawerTitleProps = {
  editLabel?: string
  fallback: string
  value: string
  onChange(value: string): void
  onCommit(): Promise<void> | void
}

export const EditableDrawerTitle = ({
  editLabel = 'Edit title',
  fallback,
  onChange,
  onCommit,
  value,
}: EditableDrawerTitleProps) => {
  const [editing, setEditing] = useState(false)
  const [draftBeforeEdit, setDraftBeforeEdit] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const displayValue = value.trim() || fallback

  useEffect(() => {
    if (!editing) return
    inputRef.current?.focus()
    inputRef.current?.select()
  }, [editing])

  const commit = () => {
    setEditing(false)
    void onCommit()
  }

  const startEditing = () => {
    if (editing) return
    setDraftBeforeEdit(value)
    setEditing(true)
  }

  return (
    <DrawerTitle
      className='ui-drawer-title-editable'
      title={editing ? undefined : displayValue}
      onDoubleClick={startEditing}
    >
      {editing ? (
        <Input
          ref={inputRef}
          className='ui-drawer-title-input'
          value={value}
          onBlur={commit}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.currentTarget.blur()
              return
            }
            if (event.key === 'Escape') {
              onChange(draftBeforeEdit)
              setEditing(false)
            }
          }}
        />
      ) : (
        <>
          <span className='ui-drawer-title-text'>{displayValue}</span>
          <button
            aria-label={editLabel}
            className='ui-drawer-title-edit-button'
            title={editLabel}
            type='button'
            onClick={startEditing}
          >
            <Pencil className='h-3.5 w-3.5' />
          </button>
        </>
      )}
    </DrawerTitle>
  )
}
