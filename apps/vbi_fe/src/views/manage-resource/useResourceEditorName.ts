import { useCallback, useEffect, useState } from 'react'
import { applicationShallowEqual, useApplication } from '../../application'
import type { ResourceKind } from '../../types'

type UseResourceEditorNameOptions = {
  fallback: string
  id: string
  kind: ResourceKind
}

export const useResourceEditorName = ({ fallback, id, kind }: UseResourceEditorNameOptions) => {
  const [name, setName] = useState('')
  const { list, rename: renameResource } = useApplication(
    (state) => ({
      list: state[kind].list,
      rename: state[kind].rename,
    }),
    { equality: applicationShallowEqual },
  )

  useEffect(() => {
    let active = true

    setName('')
    void list()
      .then((items) => {
        if (!active) return
        setName(items.find((item) => item.id === id)?.name ?? '')
      })
      .catch(() => undefined)

    return () => {
      active = false
    }
  }, [id, list])

  const rename = useCallback(async () => {
    const nextName = name.trim() || fallback
    setName(nextName)

    await renameResource({ id, name: nextName })
  }, [fallback, id, name, renameResource])

  return {
    name,
    rename,
    setName,
  }
}
