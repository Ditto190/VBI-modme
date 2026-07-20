import type { Meta, StoryObj } from '@storybook/web-components-vite'

const meta: Meta = {
  title: 'ui/VbiSelect',
  component: 'vbi-select',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'success', 'warning', 'info', 'error', 'neutral', 'ghost'],
    },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  },
}

export default meta

type Story = StoryObj

export const Default: Story = {
  args: {
    placeholder: 'Select option...',
    options: [
      { label: 'Option 1', value: 1 },
      { label: 'Option 2', value: 2 },
      { label: 'Option 3 (Disabled)', value: 3, disabled: true },
      { label: 'Option 4', value: 4 },
    ],
  },
}

export const Sizes: Story = {
  render: () => {
    const opts = [
      { label: 'Option 1', value: 1 },
      { label: 'Option 2', value: 2 },
    ]
    const container = document.createElement('div')
    container.style.display = 'flex'
    container.style.flexDirection = 'column'
    container.style.gap = '12px'
    container.style.alignItems = 'flex-start'

    const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
    sizes.forEach((size) => {
      const select = document.createElement('vbi-select') as any
      select.size = size
      select.placeholder = `Size (${size})`
      select.options = opts
      container.appendChild(select)
    })

    return container
  },
}
