import { ChartBody } from 'src/components/ChartBody'
import { FieldPanel } from 'src/components/FieldPanel'
import { FilterPanel } from 'src/components/FilterPanel'
import { ShelfPanel } from 'src/components/ShelfPanel'
import { Toolbar } from 'src/components/Toolbar'
import type { MinimalLabels } from 'src/i18n'
import { useVBIStore, useVBIStoreConfig } from 'src/model'
import { toEditorField, toggleField } from 'src/utils/fields'

type EditModeProps = {
  isFullscreen: boolean
  labels: MinimalLabels
  onToggleFullscreen: () => void
}

export const EditMode = (props: EditModeProps) => {
  const builder = useVBIStore((state) => state.builder)
  const dsl = useVBIStore((state) => state.dsl)
  const { hideLocale, hideTheme } = useVBIStoreConfig()
  const fields = useVBIStore((state) => state.schema).map(toEditorField)
  const rowCount = (useVBIStore((state) => state.vseed)?.dataset ?? []).filter(Boolean).length
  const selectedFields = new Set([
    ...dsl.dimensions.filter((item) => 'field' in item).map((item) => item.field),
    ...dsl.measures.filter((item) => 'field' in item).map((item) => item.field),
  ])

  return (
    <>
      <Toolbar
        {...props}
        builder={builder}
        dsl={dsl}
        hideLocale={hideLocale}
        hideTheme={hideTheme}
        rowCount={rowCount}
      />
      <div className='mini-workbench'>
        <div className='mini-left'>
          <FieldPanel
            fields={fields}
            labels={props.labels}
            selectedFields={selectedFields}
            onToggleField={(field) => toggleField(builder, dsl, field)}
          />
        </div>
        <main className='mini-main'>
          <div className='mini-config'>
            <ShelfPanel builder={builder} dsl={dsl} fields={fields} labels={props.labels} />
            <FilterPanel builder={builder} dsl={dsl} fields={fields} labels={props.labels} />
          </div>
          <section className='mini-chart'>
            <ChartBody labels={props.labels} />
          </section>
        </main>
      </div>
    </>
  )
}
