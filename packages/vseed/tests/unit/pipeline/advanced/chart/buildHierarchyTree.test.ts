import { describe, it, expect } from 'vitest'
import { buildHierarchyTree } from '../../../../../src/dataReshape/buildHierarchyTree'
import type { Datum, FoldInfo, UnfoldInfo } from '../../../../../src/types'

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

describe('buildHierarchyTree', () => {
  it('builds hierarchy tree without degree fields by default', () => {
    const tree = buildHierarchyTree(dataset, ['continent', 'country', 'city'], foldInfo, unfoldInfo, ['revenue'])

    expect(tree).toHaveLength(1)
    expect(tree[0].name).toBe('Asia')
    expect(tree[0].key).toBe('Asia')
    expect(tree[0].value).toBe(60)
    expect(tree[0].revenue).toBe(60)
    expect(tree[0]).not.toHaveProperty('inDegree')
    expect(tree[0]).not.toHaveProperty('outDegree')

    const china = tree[0].children?.find((node: Datum) => node.name === 'China')
    expect(china?.key).toBe('Asia-China')
    expect(china?.value).toBe(50)
    expect(china?.revenue).toBe(50)
    expect(china).not.toHaveProperty('inDegree')
    expect(china).not.toHaveProperty('outDegree')

    const beijing = china?.children?.find((node: Datum) => node.name === 'Beijing')
    expect(beijing?.key).toBe('Asia-China-Beijing')
    expect(beijing?.group).toBe('city')
    expect(beijing?.color).toBe('Asia')
    expect(beijing?.value).toBe(30)
    expect(beijing?.revenue).toBe(30)
    expect(beijing).not.toHaveProperty('inDegree')
    expect(beijing).not.toHaveProperty('outDegree')
  })

  it('adds inDegree and outDegree for hierarchySankey mode', () => {
    const tree = buildHierarchyTree(dataset, ['continent', 'country', 'city'], foldInfo, unfoldInfo, ['revenue'], {
      withDegree: true,
    })

    const asia = tree[0]
    expect(asia.inDegree).toBe(0)
    expect(asia.outDegree).toBe(2)
    expect(asia.value).toBe(60)

    const china = asia.children?.find((node: Datum) => node.name === 'China')
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
})
