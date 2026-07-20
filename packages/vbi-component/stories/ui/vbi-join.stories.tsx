import type { Meta, StoryObj } from '@storybook/web-components-vite'

const meta: Meta = {
  title: 'ui/VbiJoin',
  component: 'vbi-join',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj

export const Default: Story = {
  args: {},
  render: (args) => {
    const el = document.createElement('vbi-join')
    Object.assign(el, args)
    el.innerHTML = `
      <vbi-button>Button</vbi-button>
      <vbi-button>Button</vbi-button>
      <vbi-button>Button</vbi-button>
    `
    return el
  },
}
