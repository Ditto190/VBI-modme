export type AppMode = 'edit' | 'view'

export type FieldRole = 'dimension' | 'measure'

export type EditorField = {
  isDate: boolean
  name: string
  role: FieldRole
  type: string
}

export type DragPayload =
  | ({ kind: 'field' } & Pick<EditorField, 'name' | 'role'>)
  | { field: string; id: string; kind: 'token'; role: FieldRole }
