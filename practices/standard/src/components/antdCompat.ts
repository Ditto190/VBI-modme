import { Card, Select, type CardProps } from 'antd'
import type { ComponentType, ReactNode } from 'react'

type SelectOptionProps = {
  children?: ReactNode
  disabled?: boolean
  value?: number | string
}

export const CompatCard = Card as unknown as ComponentType<CardProps>
export const CompatSelectOption = Select.Option as unknown as ComponentType<SelectOptionProps>
