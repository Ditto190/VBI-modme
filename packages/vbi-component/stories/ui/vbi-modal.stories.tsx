import type { Meta, StoryObj } from '@storybook/web-components-vite'

const meta: Meta = {
  title: 'ui/VbiModal',
  component: 'vbi-modal',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom', 'middle', 'start', 'end'],
    },
  },
}

export default meta

type Story = StoryObj

export const Default: Story = {
  args: {
    open: false,
    position: 'middle',
  },
  render: (args) => {
    const container = document.createElement('div')

    const btn = document.createElement('vbi-button')
    btn.innerHTML = 'Open Modal'

    const modal = document.createElement('vbi-modal') as any
    modal.id = 'default-modal'
    Object.assign(modal, args)

    modal.innerHTML = `
      <h3 style="margin-top: 0;">Modal Title</h3>
      <p>Default modal content goes here.</p>
      <div slot="action" style="display: flex; gap: 8px; justify-content: flex-end;">
        <vbi-button id="close-modal">Close</vbi-button>
        <vbi-button id="confirm-modal" color="primary">Confirm</vbi-button>
      </div>
    `

    btn.addEventListener('click', () => {
      modal.open = true
    })

    container.appendChild(btn)
    container.appendChild(modal)

    // Defer adding event listeners to children until they are parsed
    setTimeout(() => {
      modal.querySelector('#close-modal')?.addEventListener('click', () => {
        modal.open = false
      })
      modal.querySelector('#confirm-modal')?.addEventListener('click', () => {
        modal.open = false
      })
    }, 0)

    return container
  },
}
