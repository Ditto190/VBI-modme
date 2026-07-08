import { Component, Event, type EventEmitter, h, Prop, Watch } from '@stencil/core'

@Component({
  tag: 'vbi-modal',
  styleUrl: 'vbi-modal.css',
  shadow: true,
})
export class VbiModal {
  @Prop({ mutable: true, reflect: true }) open: boolean = false
  @Prop() position: 'top' | 'bottom' | 'middle' | 'start' | 'end' = 'middle'
  @Event() vbiModalToggle!: EventEmitter<boolean>

  @Watch('open')
  watchOpenHandler(isOpen: boolean) {
    if (isOpen) {
      document.body.style.setProperty('overflow', 'hidden')
    } else {
      document.body.style.removeProperty('overflow')
    }
    this.vbiModalToggle.emit(isOpen)
  }

  disconnectedCallback() {
    document.body.style.removeProperty('overflow')
  }

  private handleClose = () => {
    this.open = false
  }

  render() {
    return (
      <dialog
        class={{
          modal: true,
          'modal-open': this.open,
          [`modal-${this.position}`]: true,
        }}
      >
        <div class='modal-box'>
          <slot></slot>

          <div class='modal-action'>
            <slot name='action'></slot>
          </div>
        </div>

        <div class='modal-backdrop' onClick={this.handleClose} />
      </dialog>
    )
  }
}
