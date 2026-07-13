export const applicationObjectIs = <TValue>(left: TValue, right: TValue) => Object.is(left, right)

export const applicationShallowEqual = <TValue>(left: TValue, right: TValue) => {
  if (applicationObjectIs(left, right)) return true
  if (!left || !right || typeof left !== 'object' || typeof right !== 'object') return false

  const leftRecord = left as Record<PropertyKey, unknown>
  const rightRecord = right as Record<PropertyKey, unknown>
  const leftKeys = Reflect.ownKeys(leftRecord)
  const rightKeys = Reflect.ownKeys(rightRecord)
  if (leftKeys.length !== rightKeys.length) return false

  return leftKeys.every(
    (key) =>
      Object.prototype.hasOwnProperty.call(rightRecord, key) && applicationObjectIs(leftRecord[key], rightRecord[key]),
  )
}
