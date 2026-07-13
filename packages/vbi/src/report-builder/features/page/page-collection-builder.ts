import type * as Y from 'yjs'
import type { DefaultVBIQueryDSL, DefaultVBISeedDSL } from 'src/chart-builder/adapters/vquery-vseed/types'
import type { VBIReportBuilder } from 'src/report-builder/builder'
import type { VBIReportPageDSLInput } from 'src/types'
import { createEmptyReportPage } from 'src/vbi/create-empty-report-page'
import { createReportPageYMap, getOrCreateReportPages, locateReportPageIndexById } from 'src/vbi/from/report-page-y-map'
import { ReportPageBuilder } from './page-builder'

export class ReportPageCollectionBuilder<TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL> {
  constructor(
    private parent: VBIReportBuilder<TQueryDSL, TSeedDSL>,
    private doc: Y.Doc,
    private dsl: Y.Map<any>,
  ) {
    doc.transact(() => {
      getOrCreateReportPages(this.dsl)
    })
  }

  add(
    title: string,
    callback?: (page: ReportPageBuilder<TQueryDSL, TSeedDSL>) => void,
  ): VBIReportBuilder<TQueryDSL, TSeedDSL> {
    const pageMap = createReportPageYMap({
      ...createEmptyReportPage(),
      title,
    })

    this.doc.transact(() => {
      getOrCreateReportPages(this.dsl).push([pageMap])
    })

    if (callback) {
      callback(this.createPageBuilder(pageMap))
    }

    return this.parent
  }

  remove(pageId: string): VBIReportBuilder<TQueryDSL, TSeedDSL> {
    this.doc.transact(() => {
      const pages = getOrCreateReportPages(this.dsl)
      const index = locateReportPageIndexById(pages, pageId)
      if (index !== -1) {
        pages.delete(index, 1)
      }
    })
    return this.parent
  }

  reorder(pageIds: string[]): VBIReportBuilder<TQueryDSL, TSeedDSL> {
    const pages = getOrCreateReportPages(this.dsl)
    const currentPages = pages.toArray()
    const pageById = new Map(currentPages.map((page) => [page.get('id'), page]))
    const uniquePageIds = new Set(pageIds)

    if (pageIds.length !== currentPages.length) {
      throw new Error('Report page order does not match current page count')
    }
    if (uniquePageIds.size !== pageIds.length) {
      throw new Error('Report page order contains duplicate page ids')
    }
    for (const pageId of pageIds) {
      if (!pageById.has(pageId)) {
        throw new Error(`Report page with id "${pageId}" not found`)
      }
    }

    this.doc.transact(() => {
      const reorderedPages = pageIds.map((pageId) =>
        createReportPageYMap(pageById.get(pageId)!.toJSON() as VBIReportPageDSLInput),
      )
      if (pages.length > 0) {
        pages.delete(0, pages.length)
      }
      if (reorderedPages.length > 0) {
        pages.push(reorderedPages)
      }
    })

    return this.parent
  }

  update(
    pageId: string,
    callback: (page: ReportPageBuilder<TQueryDSL, TSeedDSL>) => void,
  ): VBIReportBuilder<TQueryDSL, TSeedDSL> {
    this.doc.transact(() => {
      const page = this.get(pageId)
      if (!page) {
        throw new Error(`Report page with id "${pageId}" not found`)
      }
      callback(page)
    })
    return this.parent
  }

  get(pageId: string): ReportPageBuilder<TQueryDSL, TSeedDSL> | undefined {
    const pages = getOrCreateReportPages(this.dsl)
    const index = locateReportPageIndexById(pages, pageId)
    return index === -1 ? undefined : this.createPageBuilder(pages.get(index))
  }

  private createPageBuilder(page: Y.Map<any>) {
    return new ReportPageBuilder(this.parent, page)
  }
}
