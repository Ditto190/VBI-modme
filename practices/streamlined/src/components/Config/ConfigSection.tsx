import { DownOutlined } from '@ant-design/icons'
import type { ReactNode } from 'react'

type ConfigSectionProps = {
  children: ReactNode
  open: boolean
  onToggle: () => void
  title: string
}

export const ConfigSection = ({ children, open, onToggle, title }: ConfigSectionProps) => (
  <section className={`stream-config-section ${open ? 'stream-config-section--open' : ''}`}>
    <button aria-expanded={open} className='stream-config-section-title' onClick={onToggle} type='button'>
      <span>{title}</span>
      <DownOutlined />
    </button>
    <div className='stream-config-section__body'>
      <div className='stream-config-section__content'>{children}</div>
    </div>
  </section>
)
