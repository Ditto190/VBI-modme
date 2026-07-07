import { h } from '@stencil/core'
import type { Meta, StoryObj } from '@stencil/storybook-plugin'
import { VbiCascadingMenu } from './vbi-cascading-menu'

const meta: Meta<VbiCascadingMenu> = {
  title: 'ui/VbiCascadingMenu',
  component: VbiCascadingMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<VbiCascadingMenu>

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
    return (
      <vbi-cascading-menu
        {...args}
        onVbiCascadingMenuSelect={(e: CustomEvent) => console.log('Clicked item:', e.detail)}
      ></vbi-cascading-menu>
    )
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
    return (
      <vbi-cascading-menu
        {...args}
        onVbiCascadingMenuSelect={(e: CustomEvent) => console.log('Clicked item:', e.detail)}
      >
        <div slot='custom-profile' style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 0' }}>
          <div style={{ lineHeight: '1.2' }}>
            <strong>John Doe</strong>
            <div style={{ fontSize: '10px' }}>admin@example.com</div>
          </div>
        </div>
        <div
          slot='custom-account'
          style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary)' }}
        >
          <span>🛡️</span>
          <span>Security & Account</span>
        </div>
      </vbi-cascading-menu>
    )
  },
}
