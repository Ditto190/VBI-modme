import type { Meta, StoryObj } from '@stencil/storybook-plugin'
import { h } from '@stencil/core'
import { VbiModal } from './vbi-modal'

const meta: Meta<VbiModal> = {
  title: 'ui/VbiModal',
  component: VbiModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
}

export default meta

type Story = StoryObj<VbiModal>

export const Default: Story = {
  args: {
    open: false,
    position: 'middle',
  },
  render: (props) => {
    const showModal = () => {
      const modal = document.getElementById('default-modal') as HTMLVbiModalElement
      if (modal) modal.open = true
    }

    const hideModal = () => {
      const modal = document.getElementById('default-modal') as HTMLVbiModalElement
      if (modal) modal.open = false
    }

    return (
      <div>
        <vbi-button onClick={showModal}>Open Modal</vbi-button>

        <vbi-modal id='default-modal' {...props}>
          <h3 style={{ marginTop: '0' }}>Modal Title</h3>
          <p>Default modal content goes here.</p>
          <div slot='action' style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <vbi-button onClick={hideModal}>Close</vbi-button>
            <vbi-button color='primary' onClick={hideModal}>
              Confirm
            </vbi-button>
          </div>
        </vbi-modal>
      </div>
    )
  },
}
