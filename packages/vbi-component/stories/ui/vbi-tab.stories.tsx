import type { Meta, StoryObj } from '@storybook/web-components-vite'

const meta: Meta = {
  title: 'ui/VbiTab',
  component: 'vbi-tab',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  },
}

export default meta

type Story = StoryObj

export const Default: Story = {
  args: {
    items: [
      {
        id: 'tab-1',
        label: 'Overview',
        active: true,
      },
      {
        id: 'tab-2',
        label: 'Analytics',
      },
      {
        id: 'tab-3',
        label: 'Settings',
      },
      {
        id: 'tab-4',
        label: 'Disabled',
        disabled: true,
      },
    ],
  },
}
