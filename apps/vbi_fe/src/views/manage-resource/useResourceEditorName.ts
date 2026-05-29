import { useCallback, useEffect, useState } from 'react'
import { updateInsight } from '../../services/insightApi'
import { listResources, renameResource } from '../../services/resourceApi'
import type { ResourceKind } from '../../types'

type UseResourceEditorNameOptions = {
  fallback: string
  id: string
  kind: ResourceKind
}

export const useResourceEditorName = ({ fallback, id, kind }: UseResourceEditorNameOptions) => {
  const [name, setName] = useState('')

  useEffect(() => {
    let active = true

    setName('')
    void listResources(kind)
      .then((items) => {
        if (!active) return
        setName(items.find((item) => item.id === id)?.name ?? '')
      })
      .catch(() => undefined)

    return () => {
      active = false
    }
  }, [id, kind])

  const rename = useCallback(async () => {
    const nextName = name.trim() || fallback
    setName(nextName)

    if (kind === 'insight') {
      await updateInsight(id, { name: nextName })
      return
    }

    await renameResource(kind, id, nextName)
  }, [fallback, id, kind, name])

  return {
    name,
    rename,
    setName,
  }
}
