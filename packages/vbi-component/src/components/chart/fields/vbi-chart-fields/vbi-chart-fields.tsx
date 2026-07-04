import { Component, Host, h } from '@stencil/core'

@Component({
  tag: 'vbi-chart-fields',
  styleUrl: 'vbi-chart-fields.css',
  shadow: true,
})
export class VbiChartFields {
  render() {
    return (
      <Host>
        <div class='chartfields'>
          <h4 class='chartfields-title'>Field List</h4>

          <div class='chartfields-filter'>
            <vbi-input size='sm' />

            <select id='cfFilter' class='type-filter'>
              <option value='all'>Tất cả Loại</option>
              <option value='account'>Account</option>
              <option value='department'>Department</option>
              <option value='project'>Project</option>
            </select>
          </div>

          <div class='chartfields-list'>ss</div>
        </div>
      </Host>
    )
  }
}
