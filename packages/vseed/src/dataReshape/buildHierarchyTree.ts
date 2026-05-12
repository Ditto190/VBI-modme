import type { Datum, FoldInfo, UnfoldInfo } from 'src/types'
import { Separator } from './constant'

/**
 * 将按 hierarchy encoding reshape 后的平铺数据构造成递归树结构。
 *
 * 默认行为服务于 treeMap / sunburst / circlePacking：
 * - 只构造 children 树
 * - 聚合 value / measure 字段
 * - 不计算入度、出度
 *
 * 当 withDegree = true 时，额外为 hierarchySankey 计算：
 * - inDegree: 该节点的入度
 * - outDegree: 该节点的出度
 */
export const buildHierarchyTree = (
  dataset: Datum[],
  hierarchyFields: string[],
  foldInfo: FoldInfo,
  unfoldInfo: UnfoldInfo,
  measureKeys: string[] = [],
  options?: {
    withDegree?: boolean
  },
) => {
  const { withDegree = false } = options || {}
  const { measureValue, measureId, measureName } = foldInfo
  const { encodingColor, encodingColorId } = unfoldInfo

  // 这些字段在树节点聚合时不能简单覆盖，需要先收集唯一值，最后再拼接回字符串。
  const collectFields = [measureId, measureName, encodingColor, encodingColorId].filter(Boolean) as string[]

  const root: Datum = { name: 'root', children: [] }

  dataset.forEach((datum) => {
    let currentNode = root

    // 按 hierarchy 路径逐层向下创建节点。
    for (let i = 0; i < hierarchyFields.length; i++) {
      const field = hierarchyFields[i]
      const value = String(datum[field])

      let child = currentNode.children.find((c: Datum) => c.name === value)

      if (!child) {
        const pathValues = hierarchyFields.slice(0, i + 1).map((key) => String(datum[key]))
        child = {
          name: value,
          key: pathValues.join(Separator),
          group: field,
          color: value,
          children: [],
        }
        for (let j = 0; j <= i; j++) {
          child[hierarchyFields[j]] = datum[hierarchyFields[j]]
        }
        currentNode.children.push(child)
      }

      currentNode = child
    }

    // 首次命中叶子节点时，拷贝原始记录并初始化聚合容器。
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

    // 聚合当前折叠后的主 value 字段。
    if (measureValue && datum[measureValue] !== undefined) {
      currentNode[measureValue] += Number(datum[measureValue])
    }

    // 聚合原始 measures，便于后续 label / tooltip / spec 继续消费。
    measureKeys.forEach((key) => {
      if (datum[key] !== undefined) {
        currentNode[key] = (currentNode[key] || 0) + Number(datum[key])
      }
    })

    // 收集需要保留的维度/颜色/指标元信息。
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
      if (withDegree) {
        // hierarchySankey 中叶子节点没有子边，因此出度为 0。
        node.outDegree = 0
      }
      return node.value || 0
    }

    if (!node.children?.length) {
      if (withDegree) {
        // 兜底空节点，按没有出边处理。
        node.outDegree = 0
      }
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

    mergeCollectFieldsFromChildren(node)
    if (withDegree) {
      // hierarchySankey 使用 children 数量表达当前节点分出的边数。
      node.outDegree = node.children.length
    }

    return sum
  }

  root.children.forEach(aggregate)

  if (withDegree) {
    const fillInDegree = (node: Datum, parent?: Datum) => {
      // 目前 hierarchySankey 的 children 树是单父结构，因此非根节点入度恒为 1。
      node.inDegree = parent ? 1 : 0
      node.children?.forEach((child: Datum) => fillInDegree(child, node))
    }
    root.children.forEach((child: Datum) => fillInDegree(child))
  }

  return root.children
}
