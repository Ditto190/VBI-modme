import { h } from '@stencil/core'
import type { VBIMeasureFormat } from '@visactor/vbi'

export interface MeasureFormatPanelProps {
  format?: VBIMeasureFormat
  onFormatChange: (format: VBIMeasureFormat | undefined) => void
  t?: (key: string) => string
  style?: Record<string, any>
}

const FORMAT_TYPES = ['number', 'percent', 'permille', 'scientific'] as const

const FORMAT_TYPE_LABEL_KEYS: Record<string, string> = {
  number: 'formatTypeNumber',
  percent: 'formatTypePercent',
  permille: 'formatTypePermille',
  scientific: 'formatTypeScientific',
}

const LABEL_STYLE: Record<string, any> = {
  fontSize: '0.75rem',
  marginBottom: '0',
  whiteSpace: 'nowrap',
  minWidth: '4.375rem',
  color: 'var(--color-base-content)',
}

const ROW_STYLE: Record<string, any> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '8px',
}

const PANEL_STYLE: Record<string, any> = {
  width: '17.5rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  background: 'var(--color-base-100)',
  margin: '-0.5rem -0.75rem',
  padding: '0.5rem 0.75rem',
}

export function renderMeasureFormatPanel(props: MeasureFormatPanelProps) {
  const { format, onFormatChange, t = (k: string) => k, style } = props

  const isAutoFormat = format !== undefined && 'autoFormat' in format && (format as any).autoFormat === true

  const customFormat = (!format || isAutoFormat ? {} : format) as Record<string, any>

  const handleAutoToggle = (checked: boolean) => {
    if (checked) {
      onFormatChange({ autoFormat: true } as VBIMeasureFormat)
    } else {
      onFormatChange({ type: 'number', fractionDigits: 2 } as VBIMeasureFormat)
    }
  }

  const updateField = (key: string, value: unknown) => {
    const base = isAutoFormat ? {} : { ...customFormat }
    onFormatChange({
      ...base,
      autoFormat: false,
      [key]: value,
    } as VBIMeasureFormat)
  }

  return (
    <div
      onClick={(event: MouseEvent) => event.stopPropagation()}
      onKeyDown={(event: KeyboardEvent) => event.stopPropagation()}
      style={{
        ...PANEL_STYLE,
        ...style,
      }}
    >
      <vbi-tab
        size='sm'
        value={isAutoFormat ? 'auto' : 'custom'}
        items={[
          { label: t('formatAuto'), value: 'auto', active: isAutoFormat },
          { label: t('formatCustom'), value: 'custom', active: !isAutoFormat },
        ]}
        onVbiTabChange={(e: CustomEvent<any>) => handleAutoToggle(e.detail.value === 'auto')}
      />

      {!isAutoFormat && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={ROW_STYLE}>
            <span style={LABEL_STYLE}>{t('formatTypeLabel')}</span>
            <vbi-select
              size='sm'
              value={customFormat.type ?? 'number'}
              options={FORMAT_TYPES.map((type) => ({
                value: type,
                label: t(FORMAT_TYPE_LABEL_KEYS[type]),
              }))}
              onVbiSelectChange={(e: CustomEvent<string>) => updateField('type', e.detail)}
              style={{ width: '8.75rem' }}
            />
          </div>

          <div style={ROW_STYLE}>
            <span style={LABEL_STYLE}>{t('formatPrefix')}</span>
            <vbi-input
              size='sm'
              value={customFormat.prefix ?? ''}
              placeholder='$, ¥...'
              onVbiInputValue={(e: CustomEvent<string>) => updateField('prefix', e.detail || undefined)}
              style={{ width: '8.75rem' }}
            />
          </div>

          <div style={ROW_STYLE}>
            <span style={LABEL_STYLE}>{t('formatSuffix')}</span>
            <vbi-input
              size='sm'
              value={customFormat.suffix ?? ''}
              onVbiInputValue={(e: CustomEvent<string>) => updateField('suffix', e.detail || undefined)}
              style={{ width: '8.75rem' }}
            />
          </div>

          <div style={ROW_STYLE}>
            <span style={LABEL_STYLE}>{t('formatRatio')}</span>
            <vbi-input
              type='number'
              size='sm'
              min={0.0001}
              step='any'
              value={customFormat.ratio ?? 1}
              onVbiInputValue={(e: CustomEvent<string>) => {
                const val = e.detail === '' ? undefined : Number(e.detail)
                updateField('ratio', val !== undefined && !Number.isNaN(val) ? val : undefined)
              }}
              style={{ width: '8.75rem' }}
            />
          </div>

          <div style={ROW_STYLE}>
            <span style={LABEL_STYLE}>{t('formatSymbol')}</span>
            <vbi-input
              size='sm'
              value={customFormat.symbol ?? ''}
              placeholder='万, K...'
              onVbiInputValue={(e: CustomEvent<string>) => updateField('symbol', e.detail || undefined)}
              style={{ width: '8.75rem' }}
            />
          </div>

          <div style={ROW_STYLE}>
            <span style={LABEL_STYLE}>{t('formatFractionDigits')}</span>
            <vbi-input
              type='number'
              size='sm'
              min={0}
              max={10}
              step={1}
              value={customFormat.fractionDigits ?? 2}
              onVbiInputValue={(e: CustomEvent<string>) => {
                const val = e.detail === '' ? undefined : Number(e.detail)
                updateField('fractionDigits', val !== undefined && !Number.isNaN(val) ? val : undefined)
              }}
              style={{ width: '8.75rem' }}
            />
          </div>

          <div style={ROW_STYLE}>
            <span style={LABEL_STYLE}>{t('formatThousandSeparator')}</span>
            <vbi-switch
              color='primary'
              size='sm'
              checked={customFormat.thousandSeparator ?? false}
              onVbiSwitchChange={(e: CustomEvent<boolean>) => updateField('thousandSeparator', e.detail)}
            />
          </div>
        </div>
      )}

      <vbi-button
        size='sm'
        variant='ghost'
        color='error'
        onClick={() => onFormatChange(undefined)}
        style={{ alignSelf: 'flex-start' }}
      >
        {t('formatClear')}
      </vbi-button>
    </div>
  )
}
