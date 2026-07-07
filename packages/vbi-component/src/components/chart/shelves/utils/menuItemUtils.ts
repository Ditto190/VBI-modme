export const buildShelfMenuLabel = (label: string, extra?: string) => {
  if (!extra) {
    return label
  }

  return `${label} (${extra})`
}
