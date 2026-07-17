import type { Meta, StoryObj } from '@storybook/web-components-vite'

const meta: Meta = {
  title: 'ui/VbiInput',
  component: 'vbi-input',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: { control: 'text' },
    type: { control: 'text' },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'neutral', 'info', 'success', 'warning', 'error'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: 'radio',
      options: ['default', 'ghost'],
      mapping: {
        default: undefined,
        ghost: 'ghost',
      },
    },
  },
}

export default meta

type Story = StoryObj

export const Default: Story = {
  args: {
    value: '',
    placeholder: 'Type something...',
    type: 'text',
    color: 'primary',
    size: 'md',
  },
}

export const WithSlots: Story = {
  args: {
    value: '',
    placeholder: 'Enter amount',
    type: 'text',
    color: 'primary',
    size: 'md',
  },
  render: (args) => {
    const el = document.createElement('vbi-input')
    Object.assign(el, args)
    el.innerHTML = `
      <span slot="prefix" style="color: var(--color-base-content)">$</span>
      <span slot="suffix" style="color: var(--color-base-content)">USD</span>
    `
    return el
  },
}
