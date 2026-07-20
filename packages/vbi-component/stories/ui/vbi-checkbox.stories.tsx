import type { Meta, StoryObj } from '@storybook/web-components-vite'

const meta: Meta = {
  title: 'ui/VbiCheckbox',
  component: 'vbi-checkbox',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'neutral', 'info', 'success', 'warning', 'error'],
    },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  },
}

export default meta

type Story = StoryObj

export const Default: Story = {
  args: { color: 'primary', size: 'md' },
}
