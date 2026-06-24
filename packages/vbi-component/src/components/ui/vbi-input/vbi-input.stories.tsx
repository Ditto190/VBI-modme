import type { Meta, StoryObj } from '@stencil/storybook-plugin'
import { h } from '@stencil/core'
import { VbiInput } from './vbi-input'

const meta: Meta<VbiInput> = {
  title: 'ui/VbiInput',
  component: VbiInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: {
      control: 'text',
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

type Story = StoryObj<VbiInput>

export const Default: Story = {
  args: {
    value: '',
    placeholder: 'Type something...',
  },
  render: (props, context) => {
    const currentTheme = context.globals.backgrounds?.value || 'light'

    return (
      <vbi-config-provider theme={{ mode: currentTheme }}>
        <vbi-input {...props}></vbi-input>
      </vbi-config-provider>
    )
  },
}

export const WithSlots: Story = {
  args: {
    value: '',
    placeholder: 'Enter amount',
  },
  render: (props, context) => {
    const currentTheme = context.globals.backgrounds?.value || 'light'

    return (
      <vbi-config-provider theme={{ mode: currentTheme }}>
        <vbi-input {...props}>
          <span slot='prefix' style={{ color: 'var(--color-base-content)' }}>
            $
          </span>
          <span slot='suffix' style={{ color: 'var(--color-base-content)' }}>
            USD
          </span>
        </vbi-input>
      </vbi-config-provider>
    )
  },
}
