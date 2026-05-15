import { FullscreenOutlined, SettingOutlined } from '@ant-design/icons'
import type { VBIChartBuilder, VBIChartDSL } from '@visactor/vbi'
import { Button, Popover, Tooltip } from 'antd'
import type { StreamLabels } from 'src/i18n'
import { ChartSettings } from './ChartSettings'

type ChartToolbarProps = {
  builder: VBIChartBuilder
  dsl: VBIChartDSL
  hideLocale: boolean
  hideTheme: boolean
  isFullscreen: boolean
  labels: StreamLabels
  onToggleFullscreen: () => void | Promise<void>
  rowCount: number
}

export const ChartToolbar = (props: ChartToolbarProps) => (
  <div className='stream-chart-toolbar'>
    <div className='stream-chart-actions'>
      <span className='stream-row-count'>{`${props.rowCount} ${props.labels.rowCount}`}</span>
      <Popover
        content={<ChartSettings {...props} />}
        getPopupContainer={(node) => node.closest('.stream-app') ?? document.body}
        placement='bottomRight'
        trigger='click'
      >
        <Button aria-label={props.labels.settings} icon={<SettingOutlined />} type='text' />
      </Popover>
      <Tooltip title={props.isFullscreen ? props.labels.exitFullscreen : props.labels.fullscreen}>
        <Button
          aria-label={props.isFullscreen ? props.labels.exitFullscreen : props.labels.fullscreen}
          icon={<FullscreenOutlined />}
          onClick={() => void props.onToggleFullscreen()}
          type='text'
        />
      </Tooltip>
    </div>
  </div>
)
