import { h } from '@stencil/core'
import type { Meta, StoryObj } from '@stencil/storybook-plugin'
import { VbiSelect } from './vbi-select'

const meta: Meta<VbiSelect> = {
  title: 'ui/VbiSelect',
  component: VbiSelect,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<VbiSelect>

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
  render: (props) => {
    return <vbi-select {...props} />
  },
}

export const Sizes: Story = {
  render: () => {
    const opts = [
      { label: 'Option 1', value: 1 },
      { label: 'Option 2', value: 2 },
    ]
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
        <vbi-select size='xs' placeholder='Extra Small (xs)' options={opts} />
        <vbi-select size='sm' placeholder='Small (sm)' options={opts} />
        <vbi-select size='md' placeholder='Medium (md)' options={opts} />
        <vbi-select size='lg' placeholder='Large (lg)' options={opts} />
        <vbi-select size='xl' placeholder='Extra Large (xl)' options={opts} />
      </div>
    )
  },
}
