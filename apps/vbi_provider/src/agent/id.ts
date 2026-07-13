export const resolveResourceId = (defaultId: string | undefined, id: string | undefined, resource: string) => {
  const resolved = id ?? defaultId
  if (resolved) return resolved
  throw new Error(`${resource} id is required. Use vbi_resource_lookup first, then call ${resource}.open(id).`)
}
