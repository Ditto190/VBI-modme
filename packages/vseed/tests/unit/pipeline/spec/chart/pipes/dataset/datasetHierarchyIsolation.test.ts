import { describe, it, expect } from 'vitest'
import { buildTree } from 'src/pipeline/spec/chart/pipes/dataset/datasetHierarchy'
import {
  buildHierarchySankeyNodes,
  datasetHierarchySankey,
} from 'src/pipeline/spec/chart/pipes/dataset/datasetHierarchySankey'
import type { Datum, FoldInfo, UnfoldInfo } from 'src/types'

const foldInfo: FoldInfo = {
  foldMap: {},
  statistics: {
    min: 10,
    max: 30,
    sum: 60,
    count: 3,
    colorMin: 10,
    colorMax: 30,
  },
  measureId: '__measureId__',
  measureName: '__measureName__',
  measureValue: 'value',
}

const unfoldInfo: UnfoldInfo = {
  encodingX: '',
  encodingY: '',
  encodingColor: 'color',
  encodingColorId: 'colorId',
  encodingDetail: '',
  encodingAngle: '',
  encodingPlayer: '',
  encodingHierarchy: 'continent+country+city',
  colorItems: [],
  colorIdMap: {},
}

const dataset: Datum[] = [
  {
    continent: 'Asia',
    country: 'China',
    city: 'Beijing',
    value: 30,
    revenue: 30,
    color: 'Asia',
    colorId: 'asia',
    __measureId__: 'revenue',
    __measureName__: 'Revenue',
  },
  {
    continent: 'Asia',
    country: 'China',
    city: 'Shanghai',
    value: 20,
    revenue: 20,
    color: 'Asia',
    colorId: 'asia',
    __measureId__: 'revenue',
    __measureName__: 'Revenue',
  },
  {
    continent: 'Asia',
    country: 'Japan',
    city: 'Tokyo',
    value: 10,
    revenue: 10,
    color: 'Asia',
    colorId: 'asia',
    __measureId__: 'revenue',
    __measureName__: 'Revenue',
  },
]

describe('datasetHierarchy buildTree', () => {
  it('builds ordinary hierarchy tree without sankey-only fields', () => {
    const tree = buildTree(dataset, ['continent', 'country', 'city'], foldInfo, unfoldInfo, ['revenue'])

    expect(tree).toHaveLength(1)
    expect(tree[0].name).toBe('Asia')
    expect(tree[0].value).toBe(60)
    expect(tree[0].revenue).toBe(60)
    expect(tree[0]).not.toHaveProperty('key')
    expect(tree[0]).not.toHaveProperty('group')
    expect(tree[0]).not.toHaveProperty('inDegree')
    expect(tree[0]).not.toHaveProperty('outDegree')

    const china = tree[0].children?.find((node: Datum) => node.name === 'China')
    expect(china?.value).toBe(50)
    expect(china?.revenue).toBe(50)
    expect(china).not.toHaveProperty('key')
    expect(china).not.toHaveProperty('group')
    expect(china).not.toHaveProperty('inDegree')
    expect(china).not.toHaveProperty('outDegree')

    const beijing = china?.children?.find((node: Datum) => node.name === 'Beijing')
    expect(beijing?.color).toBe('Asia')
    expect(beijing?.value).toBe(30)
    expect(beijing?.revenue).toBe(30)
    expect(beijing).not.toHaveProperty('key')
    expect(beijing).not.toHaveProperty('group')
    expect(beijing).not.toHaveProperty('inDegree')
    expect(beijing).not.toHaveProperty('outDegree')
  })

  it('uses measure name as display name when hierarchy field is measure id', () => {
    const tree = buildTree(dataset, ['__measureId__'], foldInfo, unfoldInfo, ['revenue'])

    expect(tree).toHaveLength(1)
    expect(tree[0].name).toBe('Revenue')
    expect(tree[0].__measureId__).toBe('revenue')
    expect(tree[0].__measureName__).toBe('Revenue')
    expect(tree[0].value).toBe(60)
  })
})

describe('buildHierarchySankeyNodes', () => {
  it('builds sankey nodes with sankey-only fields', () => {
    const tree = buildHierarchySankeyNodes(dataset, ['continent', 'country', 'city'], foldInfo, unfoldInfo, ['revenue'])

    const asia = tree[0]
    expect(asia.key).toBe('Asia')
    expect(asia.group).toBe('continent')
    expect(asia.inDegree).toBe(0)
    expect(asia.outDegree).toBe(2)
    expect(asia.value).toBe(60)

    const china = asia.children?.find((node: Datum) => node.name === 'China')
    expect(china?.key).toBe('Asia-China')
    expect(china?.group).toBe('country')
    expect(china?.inDegree).toBe(1)
    expect(china?.outDegree).toBe(2)
    expect(china?.value).toBe(50)

    const japan = asia.children?.find((node: Datum) => node.name === 'Japan')
    expect(japan?.inDegree).toBe(1)
    expect(japan?.outDegree).toBe(1)
    expect(japan?.value).toBe(10)

    const beijing = china?.children?.find((node: Datum) => node.name === 'Beijing')
    expect(beijing?.inDegree).toBe(1)
    expect(beijing?.outDegree).toBe(0)
    expect(beijing?.value).toBe(30)
  })

  it('uses measure name as sankey node display name when hierarchy field is measure id', () => {
    const tree = buildHierarchySankeyNodes(dataset, ['continent', '__measureId__'], foldInfo, unfoldInfo, ['revenue'])

    const asia = tree[0]
    const revenue = asia.children?.find((node: Datum) => node.name === 'Revenue')

    expect(revenue?.key).toBe('Asia-Revenue')
    expect(revenue?.path).toBe('Asia-Revenue')
    expect(revenue?.group).toBe('__measureId__')
    expect(revenue?.__measureId__).toBe('revenue')
    expect(revenue?.__measureName__).toBe('Revenue')
    expect(revenue?.value).toBe(60)
  })
})

describe('datasetHierarchySankey', () => {
  it('builds sankey nodes in spec dataset pipe', () => {
    const spec = datasetHierarchySankey(
      {},
      {
        advancedVSeed: {
          dataset,
          datasetReshapeInfo: [{ foldInfo, unfoldInfo }],
          encoding: {
            hierarchy: ['continent', 'country', 'city'],
          },
          measures: [{ id: 'revenue' }],
        },
      } as any,
    ) as any

    const nodes = spec.data[0].values[0].nodes as Datum[]
    expect(nodes).toHaveLength(1)
    expect(nodes[0].name).toBe('Asia')
    expect(nodes[0].inDegree).toBe(0)
    expect(nodes[0].outDegree).toBe(2)
  })
})
