import { h } from '@stencil/core'
import type { Meta, StoryObj } from '@stencil/storybook-plugin'
import { darkTheme, lightTheme } from './theme'
import { VbiConfigProvider } from './vbi-config-provider'

const meta: Meta<VbiConfigProvider> = {
  title: 'ui/VbiConfigProvider',
  component: VbiConfigProvider,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    theme: { control: 'object' },
  },
  args: {
    theme: lightTheme,
  },
}

export default meta

type Story = StoryObj<VbiConfigProvider>

export const DefaultLight: Story = {
  args: {
    theme: lightTheme,
  },
  render: (props) => (
    <vbi-config-provider {...props}>
      <div
        style={{
          padding: '2rem',
          background: 'var(--color-base-100)',
          color: 'var(--color-base-content)',
          borderRadius: 'var(--radius-box)',
        }}
      >
        <h3 style={{ margin: '0 0 1rem 0' }}>Config Provider (Light Mode)</h3>
        <p style={{ margin: '0 0 1.5rem 0' }}>This area is themed using the Config Provider.</p>
      </div>
    </vbi-config-provider>
  ),
}

export const DarkMode: Story = {
  args: {
    theme: darkTheme,
  },
  render: (props) => (
    <vbi-config-provider {...props}>
      <div
        style={{
          padding: '2rem',
          background: 'var(--color-base-100)',
          color: 'var(--color-base-content)',
          borderRadius: 'var(--radius-box)',
        }}
      >
        <h3 style={{ margin: '0 0 1rem 0' }}>Config Provider (Dark Mode)</h3>
        <p style={{ margin: '0 0 1.5rem 0' }}>This area is themed using the Config Provider.</p>
      </div>
    </vbi-config-provider>
  ),
}

export const CustomTheme: Story = {
  args: {
    theme: {
      mode: 'dark',
      tokens: {
        colorBase100: 'oklch(20% 0.1 140)', // Dark forest green background
        colorBaseContent: 'oklch(95% 0.05 140)',
        radiusBox: '2rem',
      },
    },
  },
  render: (props) => (
    <vbi-config-provider {...props}>
      <div
        style={{
          padding: '2rem',
          background: 'var(--color-base-100)',
          color: 'var(--color-base-content)',
          borderRadius: 'var(--radius-box)',
        }}
      >
        <h3 style={{ margin: '0 0 1rem 0' }}>Config Provider (Custom Theme)</h3>
        <p style={{ margin: '0 0 1.5rem 0' }}>Custom background and extra rounded corners.</p>
      </div>
    </vbi-config-provider>
  ),
}
