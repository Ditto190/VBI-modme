import type { Meta, StoryObj } from '@storybook/web-components-vite'

const meta: Meta = {
  component: 'vbi-button',
  title: 'ui/VbiButton',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'neutral', 'info', 'success', 'warning', 'error'],
    },
    variant: {
      control: 'select',
      options: ['ghost', 'outline', 'dash', 'soft', 'link'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    shape: {
      control: 'select',
      options: ['square', 'circle', 'wide', 'block'],
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
    },
  },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  args: {
    innerHTML: 'Test',
  },
}
