import type { Meta, StoryObj } from '@storybook/web-components-vite'

const meta: Meta = {
  title: 'ui/VbiTooltip',
  component: 'vbi-tooltip',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    position: {
      control: 'select',
      options: [
        'top',
        'bottom',
        'left',
        'right',
        'top-start',
        'top-end',
        'bottom-start',
        'bottom-end',
        'left-start',
        'left-end',
        'right-start',
        'right-end',
      ],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error'],
    },
    trigger: { control: 'select', options: ['hover', 'click', 'manual'] },
  },
}

export default meta

type Story = StoryObj

export const Default: Story = {
  args: {
    text: 'This is a very long tooltip text to demonstrate the placement behavior for start and end positions.',
    position: 'top',
    open: false,
  },
  render: (args) => {
    const el = document.createElement('vbi-tooltip')
    Object.assign(el, args)
    el.innerHTML = `<vbi-button>Hover me</vbi-button>`
    return el
  },
}
