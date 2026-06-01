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
      className='ui-drawer-title-editable group relative inline-flex max-w-[min(520px,58vw)] cursor-text items-center leading-[30px]'
      title={editing ? undefined : displayValue}
      onDoubleClick={startEditing}
    >
      {editing ? (
        <Input
          ref={inputRef}
          className='ui-drawer-title-input h-8 w-[min(520px,58vw)] px-2 text-[15px] font-semibold tracking-normal'
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
          <span className='ui-drawer-title-text min-w-0 truncate'>{displayValue}</span>
          <button
            aria-label={editLabel}
            className='ui-drawer-title-edit-button pointer-events-none absolute left-[calc(100%+8px)] top-1/2 inline-flex size-6 shrink-0 -translate-y-1/2 -translate-x-1 scale-95 cursor-pointer items-center justify-center rounded-md border border-[var(--vbi-border)] bg-[var(--vbi-secondary)] text-[var(--vbi-text-muted)] opacity-0 transition duration-200 hover:border-[var(--vbi-border-strong)] hover:bg-[var(--vbi-control)] hover:text-[var(--vbi-text-strong)] hover:shadow-sm focus-visible:pointer-events-auto focus-visible:translate-x-0 focus-visible:scale-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--vbi-focus)] group-hover:pointer-events-auto group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-x-0 group-focus-within:scale-100 group-focus-within:opacity-100'
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
