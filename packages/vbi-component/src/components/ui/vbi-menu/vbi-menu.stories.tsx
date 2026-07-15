import { SettingOutlined, UserOutlined, MailOutlined } from '@ant-design/icons-svg'
import { h } from '@stencil/core'
import type { Meta, StoryObj } from '@stencil/storybook-plugin'
import { VbiMenu } from './vbi-menu'

const meta: Meta<VbiMenu> = {
  title: 'ui/VbiMenu',
  component: VbiMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<VbiMenu>

export const Default: Story = {
  args: {
    size: 'md',
    variant: 'vertical',
    items: [
      {
        label: 'Main Navigation',
        isTitle: true,
      },
      {
        label: 'Dashboard',
        icon: SettingOutlined,
        url: '#',
        isActive: true,
      },
      {
        label: 'Profile',
        icon: UserOutlined,
        disabled: true,
      },
      {
        label: 'Messages',
        icon: MailOutlined,
        badge: '99+',
        url: '#',
      },
      {
        label: 'Preferences',
        isTitle: true,
      },
      {
        label: 'Settings',
        icon: SettingOutlined,
        children: [
          {
            label: 'Account',
          },
          {
            label: 'Privacy',
            badge: 'New',
          },
        ],
      },
    ],
  },
  render: (args) => {
    return <vbi-menu {...args} onVbiMenuSelect={(e: CustomEvent) => console.log('Clicked item:', e.detail)}></vbi-menu>
  },
}
