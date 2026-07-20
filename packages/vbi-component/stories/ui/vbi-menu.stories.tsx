import { SettingOutlined, UserOutlined, MailOutlined } from '@ant-design/icons-svg'
import type { Meta, StoryObj } from '@storybook/web-components-vite'

const meta: Meta = {
  title: 'ui/VbiMenu',
  component: 'vbi-menu',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    variant: { control: 'select', options: ['horizontal', 'vertical'] },
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
    const el = document.createElement('vbi-menu')
    Object.assign(el, args)
    el.addEventListener('vbiMenuSelect', (e: any) => console.log('Clicked item:', e.detail))
    return el
  },
}
