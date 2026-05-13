import { findAllMeasures } from 'src/pipeline/utils'
import { Separator } from 'src/dataReshape/constant'
import type { Datum, FoldInfo, UnfoldInfo, VChartSpecPipe } from 'src/types'

export const datasetHierarchySankey: VChartSpecPipe = (spec, context) => {
  const result = { ...spec } as Record<string, any>
  const { advancedVSeed } = context
  const { dataset, datasetReshapeInfo, measures } = advancedVSeed
  const { foldInfo, unfoldInfo } = datasetReshapeInfo[0]
  const hierarchyFields = (advancedVSeed.encoding as Datum)?.hierarchy || []
  const measureKeys = findAllMeasures(measures).map((m) => m.id)
  const nodes = buildHierarchySankeyNodes(dataset as Datum[], hierarchyFields, foldInfo, unfoldInfo, measureKeys)

  result.data = [
    {
      id: 'data',
      values: [
        {
          nodes,
        },
      ],
    },
  ]

  return result as any
}

export const buildHierarchySankeyNodes = (
  dataset: Datum[],
  hierarchyFields: string[],
  foldInfo: FoldInfo,
  unfoldInfo: UnfoldInfo,
  measureKeys: string[],
) => {
  if (!hierarchyFields.length) {
    return dataset
  }

  const { measureValue, measureId, measureName } = foldInfo
  const { encodingColor, encodingColorId } = unfoldInfo
  const collectFields = [measureId, measureName, encodingColor, encodingColorId].filter(Boolean) as string[]

  const root: Datum = { name: 'root', children: [] }

  dataset.forEach((datum) => {
    let currentNode = root

    for (let i = 0; i < hierarchyFields.length; i++) {
      const field = hierarchyFields[i]
      const value = String(datum[field])
      const nodeName =
        field === measureId && measureName && datum[measureName] !== undefined ? String(datum[measureName]) : value
      let child = currentNode.children.find((c: Datum) => c.name === nodeName)

      if (!child) {
        const pathValues = hierarchyFields.slice(0, i + 1).map((key) => String(datum[key]))
        child = {
          field: field,
          key: nodeName,
          name: nodeName,
          color: nodeName,
          path: pathValues.join(Separator),
          children: [],
        }
        for (let j = 0; j <= i; j++) {
          child[hierarchyFields[j]] = datum[hierarchyFields[j]]
        }
        currentNode.children.push(child)
      }

      currentNode = child
    }

    if (!currentNode.isLeaf) {
      Object.assign(currentNode, datum)
      currentNode.isLeaf = true

      if (measureValue) currentNode[measureValue] = 0
      measureKeys.forEach((key) => {
        currentNode[key] = 0
      })

      collectFields.forEach((field) => {
        currentNode[`_set_${field}`] = new Set()
      })
    }

    if (measureValue && datum[measureValue] !== undefined) {
      currentNode[measureValue] += Number(datum[measureValue])
    }

    measureKeys.forEach((key) => {
      if (datum[key] !== undefined) {
        currentNode[key] = (currentNode[key] || 0) + Number(datum[key])
      }
    })

    collectFields.forEach((field) => {
      if (datum[field]) currentNode[`_set_${field}`].add(datum[field])
    })

    if (measureValue) {
      currentNode.value = currentNode[measureValue]
    }
  })

  const flattenSets = (node: Datum) => {
    collectFields.forEach((field) => {
      const setKey = `_set_${field}`
      if (node[setKey]) {
        node[field] = Array.from(node[setKey]).join('+')
        delete node[setKey]
      }
    })
  }

  const mergeCollectFieldsFromChildren = (node: Datum) => {
    collectFields.forEach((field) => {
      const merged = new Set<string>()
      node.children.forEach((child: Datum) => {
        if (child[field]) {
          child[field].split('+').forEach((v: string) => merged.add(v))
        }
      })
      if (merged.size > 0) {
        node[field] = Array.from(merged).join('+')
      }
    })
  }

  const aggregate = (node: Datum): number => {
    if (node.isLeaf) {
      flattenSets(node)
      node.outDegree = 0
      return node.value || 0
    }

    if (!node.children?.length) {
      node.outDegree = 0
      return node.value || 0
    }

    let sum = 0
    node.children.forEach((child: Datum) => {
      sum += aggregate(child)
      measureKeys.forEach((key) => {
        node[key] = (node[key] || 0) + (child[key] || 0)
      })
    })

    node.value = sum
    if (measureValue) node[measureValue] = sum
    node.outDegree = node.children.length
    mergeCollectFieldsFromChildren(node)

    return sum
  }

  const fillInDegree = (node: Datum, parent?: Datum) => {
    node.inDegree = parent ? 1 : 0
    node.children?.forEach((child: Datum) => fillInDegree(child, node))
  }

  root.children.forEach(aggregate)
  root.children.forEach((child: Datum) => fillInDegree(child))

  return root.children
}

export const getHierarchySankeyNodesFromSpec = (spec: Record<string, any>, fallback: Datum[] = []) => {
  const nodes = spec.data?.[0]?.values?.[0]?.nodes
  return Array.isArray(nodes) ? (nodes as Datum[]) : fallback
}
