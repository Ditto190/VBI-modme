import { VBI } from '@visactor/vbi'
import { VBIDashboardDefaultBreakpoints } from 'src/types/dashboardDSL/breakpoint'
import { createEmptyDashboardLayout } from 'src/vbi/create-empty-dashboard'

describe('VBIDashboardBuilder', () => {
  test('empty dashboard helper accepts custom uuid', () => {
    expect(VBI.dashboard.createEmpty('dashboard-uuid')).toMatchObject({
      uuid: 'dashboard-uuid',
      widgets: [],
      breakpoints: VBIDashboardDefaultBreakpoints,
      layout: createEmptyDashboardLayout(),
      meta: {
        title: '',
        theme: 'light',
      },
      version: 0,
    })
  })
})
