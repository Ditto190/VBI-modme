import type { Meta, StoryObj } from '@storybook/web-components-vite'

const meta: Meta = {
  title: 'ui/VbiDropdown',
  component: 'vbi-dropdown',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    'popover-mode': { control: 'select', options: ['auto', 'manual'] },
    trigger: { control: 'select', options: ['click', 'hover'] },
  },
}

export default meta

type Story = StoryObj

export const Default: Story = {
  args: { 'popover-mode': 'auto', trigger: 'click' },
  render: (args) => {
    const el = document.createElement('vbi-dropdown')
    Object.entries(args).forEach(([key, value]) => {
      if (key.includes('-')) {
        el.setAttribute(key, value as string)
      } else {
        ;(el as any)[key] = value
      }
    })
    el.innerHTML = `
      <vbi-button slot="trigger">Open Dropdown</vbi-button>
      <div slot="content" style="padding: 8px; border: 1px solid var(--color-base-300, #ccc); border-radius: var(--radius-box, 4px); background: var(--color-base-100, #fff); color: var(--color-base-content, #000);">
        Dropdown Content
      </div>
    `
    return el
  },
}
