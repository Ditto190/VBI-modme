import type { VBIChartBuilder } from '@visactor/vbi'
import { fixture, fixtureCleanup } from '@open-wc/testing'
import { html } from 'lit'

import { VBIChartToolbar } from 'src/vbi-chart-editor/vbi-chart-toolbar'

type VBIChartToolbarInstance = InstanceType<typeof VBIChartToolbar>

const query = <T extends Element>(el: VBIChartToolbarInstance, selector: string): T => {
  const item = el.shadowRoot?.querySelector<T>(selector)
  if (!item) throw new Error(`${selector} not found`)
  return item
}

const click = (el: VBIChartToolbarInstance, selector: string): void => {
  query<HTMLButtonElement>(el, selector).click()
}

const createBuilder = () => {
  let chartType = 'line'
  let limit = 25
  let theme = 'light'
  let canUndo = true
  let canRedo = false
  let undoCalls = 0
  let redoCalls = 0
  const docListeners = new Set<() => void>()
  const chartTypeObservers = new Set<() => void>()

  const emitDocUpdate = () => {
    docListeners.forEach((listener) => listener())
  }

  return {
    builder: {
      doc: {
        on: (name: string, listener: () => void) => {
          if (name === 'update') {
            docListeners.add(listener)
          }
        },
        off: (name: string, listener: () => void) => {
          if (name === 'update') {
            docListeners.delete(listener)
          }
        },
      },
      chartType: {
        getChartType: () => chartType,
        getAvailableChartTypes: () => ['table', 'bar', 'line'],
        changeChartType: (nextChartType: string) => {
          chartType = nextChartType
          chartTypeObservers.forEach((observer) => observer())
          emitDocUpdate()
        },
        observe: (callback: () => void) => {
          chartTypeObservers.add(callback)
          return () => chartTypeObservers.delete(callback)
        },
      },
      limit: {
        getLimit: () => limit,
        setLimit: (nextLimit: number) => {
          limit = nextLimit
          emitDocUpdate()
        },
      },
      theme: {
        getTheme: () => theme,
        setTheme: (nextTheme: string) => {
          theme = nextTheme
          emitDocUpdate()
        },
      },
      undoManager: {
        canUndo: () => canUndo,
        canRedo: () => canRedo,
        undo: () => {
          undoCalls += 1
          canUndo = false
          canRedo = true
          emitDocUpdate()
          return true
        },
        redo: () => {
          redoCalls += 1
          canUndo = true
          canRedo = false
          emitDocUpdate()
          return true
        },
      },
    } as unknown as VBIChartBuilder,
    getLimit: () => limit,
    getTheme: () => theme,
    getUndoCalls: () => undoCalls,
    getRedoCalls: () => redoCalls,
    getDocListenerCount: () => docListeners.size,
    setHistory: (nextCanUndo: boolean, nextCanRedo: boolean) => {
      canUndo = nextCanUndo
      canRedo = nextCanRedo
      emitDocUpdate()
    },
  }
}

describe('vbi-chart-toolbar', () => {
  afterEach(() => {
    fixtureCleanup()
  })

  it('should register as a custom element and render core controls', async () => {
    expect(customElements.get('vbi-chart-toolbar')).toBeDefined()

    const el = await fixture<VBIChartToolbarInstance>(html`<vbi-chart-toolbar></vbi-chart-toolbar>`)

    expect(el).toBeInstanceOf(VBIChartToolbar)
    expect(query(el, 'vbi-chart-type')).toBeTruthy()
    expect(query<HTMLInputElement>(el, '.limit-input').value).toBe('1000')
    expect(query<HTMLInputElement>(el, '.limit-input').disabled).toBe(true)
    expect(query<HTMLButtonElement>(el, '[data-theme-option="dark"]').disabled).toBe(true)
    expect(query<HTMLButtonElement>(el, '[data-action="undo"]').disabled).toBe(true)
    expect(query<HTMLButtonElement>(el, '[data-action="redo"]').disabled).toBe(true)
  })

  it('should read and mutate builder limit, theme, and history', async () => {
    const fake = createBuilder()
    const el = await fixture<VBIChartToolbarInstance>(
      html`<vbi-chart-toolbar .builder=${fake.builder}></vbi-chart-toolbar>`,
    )
    await el.updateComplete

    expect(query<HTMLInputElement>(el, '.limit-input').value).toBe('25')
    expect(query<HTMLButtonElement>(el, '[data-action="undo"]').disabled).toBe(false)
    expect(query<HTMLButtonElement>(el, '[data-action="redo"]').disabled).toBe(true)

    const input = query<HTMLInputElement>(el, '.limit-input')
    input.value = '48'
    input.dispatchEvent(new Event('change', { bubbles: true, composed: true }))
    click(el, '[data-theme-option="dark"]')
    click(el, '[data-action="undo"]')
    await el.updateComplete

    expect(fake.getLimit()).toBe(48)
    expect(fake.getTheme()).toBe('dark')
    expect(fake.getUndoCalls()).toBe(1)
    expect(query<HTMLButtonElement>(el, '[data-action="undo"]').disabled).toBe(true)
    expect(query<HTMLButtonElement>(el, '[data-action="redo"]').disabled).toBe(false)

    el.remove()
    expect(fake.getDocListenerCount()).toBe(0)
  })

  it('should sync history availability after builder updates', async () => {
    const fake = createBuilder()
    const el = await fixture<VBIChartToolbarInstance>(
      html`<vbi-chart-toolbar .builder=${fake.builder}></vbi-chart-toolbar>`,
    )

    fake.setHistory(false, true)
    await el.updateComplete

    expect(query<HTMLButtonElement>(el, '[data-action="undo"]').disabled).toBe(true)
    expect(query<HTMLButtonElement>(el, '[data-action="redo"]').disabled).toBe(false)
  })

  it('should support keyboard shortcuts when enabled', async () => {
    const fake = createBuilder()
    const el = await fixture<VBIChartToolbarInstance>(
      html`<vbi-chart-toolbar .builder=${fake.builder}></vbi-chart-toolbar>`,
    )
    await el.updateComplete

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'z', ctrlKey: true }))
    await el.updateComplete
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'y', ctrlKey: true }))
    await el.updateComplete

    expect(fake.getUndoCalls()).toBe(1)
    expect(fake.getRedoCalls()).toBe(1)
  })
})
