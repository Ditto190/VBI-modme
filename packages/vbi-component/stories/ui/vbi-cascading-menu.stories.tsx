import type { Meta, StoryObj } from '@storybook/web-components-vite'

const meta: Meta = {
  title: 'ui/VbiCascadingMenu',
  component: 'vbi-cascading-menu',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
}

export default meta

type Story = StoryObj

export const Default: Story = {
  args: {
    size: 'md',
    variant: 'vertical',
    items: [
      {
        label: 'Dashboard',
        isActive: true,
      },
      {
        label: 'Profile',
        disabled: true,
      },
      {
        label: 'Messages',
        children: [
          {
            label: 'Inbox',
          },
          {
            label: 'Sent',
          },
        ],
      },
      {
        label: 'Settings',
        children: [
          {
            label: 'Account',
            children: [
              {
                label: 'Personal Info',
              },
              {
                label: 'Security',
              },
            ],
          },
          {
            label: 'Privacy',
          },
        ],
      },
    ],
  },
  render: (args) => {
    const el = document.createElement('vbi-cascading-menu')
    Object.assign(el, args)
    el.addEventListener('vbiCascadingMenuSelect', (e: any) => console.log('Clicked item:', e.detail))
    return el
  },
}

export const WithSlots: Story = {
  args: {
    size: 'md',
    variant: 'vertical',
    items: [
      {
        label: 'Dashboard',
      },
      {
        slot: 'custom-profile',
      },
      {
        label: 'Settings',
        children: [
          {
            slot: 'custom-account',
          },
          {
            label: 'Privacy',
          },
        ],
      },
    ],
  },
  render: (args) => {
    const el = document.createElement('vbi-cascading-menu')
    Object.assign(el, args)
    el.addEventListener('vbiCascadingMenuSelect', (e: any) => console.log('Clicked item:', e.detail))
    el.innerHTML = `
      <div slot="custom-profile" style="display: flex; align-items: center; gap: 8px; padding: 4px 0;">
        <div style="line-height: 1.2;">
          <strong>John Doe</strong>
          <div style="font-size: 10px;">admin@example.com</div>
        </div>
      </div>
      <div slot="custom-account" style="display: flex; align-items: center; gap: 8px; color: var(--color-primary);">
        <span>🛡️</span>
        <span>Security & Account</span>
      </div>
    `
    return el
  },
}
