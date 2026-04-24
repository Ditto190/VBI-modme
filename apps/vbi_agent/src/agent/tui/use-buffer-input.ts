import { useInput } from 'ink'
import { useState } from 'react'

export const useBufferInput = (onSubmit: (value: string) => void, enabled: boolean) => {
  const [value, setValue] = useState('')

  useInput(
    (input, key) => {
      if (!enabled) return
      if (key.return) return onSubmit(value)
      if (key.backspace || key.delete) return setValue((current) => current.slice(0, -1))
      if (!key.ctrl && !key.meta && input) setValue((current) => current + input)
    },
    { isActive: enabled },
  )

  return { clear: () => setValue(''), value }
}
