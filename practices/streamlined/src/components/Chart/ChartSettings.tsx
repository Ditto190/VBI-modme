import type { VBIChartBuilder, VBIChartDSL } from '@visactor/vbi'
import { InputNumber, Segmented } from 'antd'
import type { ReactNode } from 'react'
import type { StreamLabels } from 'src/config/labels'
import { normalizeLimit, readLimit } from 'src/utils/chartControlUtils'

type ChartSettingsProps = {
  builder: VBIChartBuilder
  dsl: VBIChartDSL
  hideLocale: boolean
  hideTheme: boolean
  labels: StreamLabels
}

const SettingRow = ({ children, label }: { children: ReactNode; label: string }) => (
  <div className='stream-setting-row'>
    <span>{label}</span>
    {children}
  </div>
)

export const ChartSettings = ({ builder, dsl, hideLocale, hideTheme, labels }: ChartSettingsProps) => (
  <div className='stream-settings-content'>
    <SettingRow label={labels.limit}>
      <InputNumber
        min={1}
        size='small'
        step={50}
        value={readLimit(dsl.limit)}
        onChange={(value) => {
          if (typeof value === 'number') builder.limit.setLimit(normalizeLimit(value))
        }}
      />
    </SettingRow>
    {!hideTheme && (
      <SettingRow label={labels.theme}>
        <Segmented
          onChange={(value) => builder.theme.setTheme(value === 'dark' ? 'dark' : 'light')}
          options={[
            { label: labels.themeLight, value: 'light' },
            { label: labels.themeDark, value: 'dark' },
          ]}
          size='small'
          value={dsl.theme === 'dark' ? 'dark' : 'light'}
        />
      </SettingRow>
    )}
    {!hideLocale && (
      <SettingRow label={labels.language}>
        <Segmented
          onChange={(value) => builder.locale.setLocale(value === 'en-US' ? 'en-US' : 'zh-CN')}
          options={[
            { label: labels.languageChinese, value: 'zh-CN' },
            { label: labels.languageEnglish, value: 'en-US' },
          ]}
          size='small'
          value={dsl.locale === 'en-US' ? 'en-US' : 'zh-CN'}
        />
      </SettingRow>
    )}
  </div>
)
