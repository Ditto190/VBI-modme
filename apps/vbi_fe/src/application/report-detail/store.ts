import { createStore } from 'zustand/vanilla'
import { bindReportDetailLazyApplicationEmitter, getLazyReportDetailApplication } from './lazy'
import type { ReportDetailApplication } from './contract'

export const reportDetailApplicationStore = createStore<ReportDetailApplication>()(() =>
  getLazyReportDetailApplication(),
)

export const refreshReportDetailApplicationStore = () => {
  reportDetailApplicationStore.setState(getLazyReportDetailApplication(), true)
}

bindReportDetailLazyApplicationEmitter(refreshReportDetailApplicationStore)
