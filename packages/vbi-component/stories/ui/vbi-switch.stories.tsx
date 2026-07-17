import type { Meta, StoryObj } from '@storybook/web-components-vite'

const meta: Meta = {
  title: 'ui/VbiSwitch',
  component: 'vbi-switch',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'success', 'warning', 'info', 'error', 'neutral'],
    },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  },
}

export default meta

type Story = StoryObj

export const Default: Story = {
  args: { color: 'primary', size: 'md' },
}
