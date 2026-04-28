import { FullscreenOutlined, SettingOutlined } from '@ant-design/icons'
import type { VBIChartBuilder, VBIChartDSL } from '@visactor/vbi'
import { Button, InputNumber, Popover, Select, Tooltip } from 'antd'
import type { MinimalLabels } from 'src/config/labels'
import { readLimit } from 'src/utils/limit'

type ToolbarProps = {
  builder: VBIChartBuilder
  dsl: VBIChartDSL
  isFullscreen: boolean
  labels: MinimalLabels
  onToggleFullscreen: () => void | Promise<void>
  rowCount: number
}

const Settings = ({ builder, dsl, labels }: ToolbarProps) => (
  <div className='mini-settings'>
    <label>
      <span>{labels.limit}</span>
      <InputNumber min={1} size='small' value={readLimit(dsl.limit)} onChange={(v) => v && builder.limit.setLimit(v)} />
    </label>
  </div>
)

export const Toolbar = (props: ToolbarProps) => (
  <header className='mini-toolbar'>
    <div className='mini-brand'>
      <strong>VBI</strong>
      <Select
        className='mini-chart-type'
        options={props.builder.chartType.getAvailableChartTypes().map((type) => ({ label: type, value: type }))}
        value={props.dsl.chartType}
        onChange={(type) => props.builder.chartType.changeChartType(type)}
      />
    </div>
    <div className='mini-toolbar__actions'>
      <span>{`${props.rowCount} ${props.labels.rowCount}`}</span>
      <Popover content={<Settings {...props} />} placement='bottomRight' trigger='click'>
        <Button aria-label='settings' icon={<SettingOutlined />} size='small' type='text' />
      </Popover>
      <Tooltip title={props.isFullscreen ? props.labels.exitFullscreen : props.labels.fullscreen}>
        <Button
          aria-label={props.isFullscreen ? props.labels.exitFullscreen : props.labels.fullscreen}
          icon={<FullscreenOutlined />}
          size='small'
          type='text'
          onClick={() => void props.onToggleFullscreen()}
        />
      </Tooltip>
    </div>
  </header>
)
