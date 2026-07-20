import type { Meta, StoryObj } from '@storybook/web-components-vite'

const lightTheme = {
  tokens: {
    colorBase100: '#ffffff',
    colorBaseContent: '#000000',
    radiusBox: '4px',
  },
}

const darkTheme = {
  tokens: {
    colorBase100: '#000000',
    colorBaseContent: '#ffffff',
    radiusBox: '4px',
  },
}

const meta: Meta = {
  title: 'ui/VbiConfigProvider',
  component: 'vbi-config-provider',
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

type Story = StoryObj

export const DefaultLight: Story = {
  args: {
    theme: lightTheme,
  },
  render: (args) => {
    const el = document.createElement('vbi-config-provider')
    Object.assign(el, args)
    el.innerHTML = `
      <div style="padding: 2rem; background: var(--color-base-100); color: var(--color-base-content); border-radius: var(--radius-box);">
        <h3 style="margin: 0 0 1rem 0;">Config Provider (Light Mode)</h3>
        <p style="margin: 0 0 1.5rem 0;">This area is themed using the Config Provider.</p>
      </div>
    `
    return el
  },
}

export const DarkMode: Story = {
  args: {
    theme: darkTheme,
  },
  render: (args) => {
    const el = document.createElement('vbi-config-provider')
    Object.assign(el, args)
    el.innerHTML = `
      <div style="padding: 2rem; background: var(--color-base-100); color: var(--color-base-content); border-radius: var(--radius-box);">
        <h3 style="margin: 0 0 1rem 0;">Config Provider (Dark Mode)</h3>
        <p style="margin: 0 0 1.5rem 0;">This area is themed using the Config Provider.</p>
      </div>
    `
    return el
  },
}

export const CustomTheme: Story = {
  args: {
    theme: {
      tokens: {
        colorBase100: 'oklch(20% 0.1 140)', // Dark forest green background
        colorBaseContent: 'oklch(95% 0.05 140)',
        radiusBox: '2rem',
      },
    },
  },
  render: (args) => {
    const el = document.createElement('vbi-config-provider')
    Object.assign(el, args)
    el.innerHTML = `
      <div style="padding: 2rem; background: var(--color-base-100); color: var(--color-base-content); border-radius: var(--radius-box);">
        <h3 style="margin: 0 0 1rem 0;">Config Provider (Custom Theme)</h3>
        <p style="margin: 0 0 1.5rem 0;">Custom background and extra rounded corners.</p>
      </div>
    `
    return el
  },
}
