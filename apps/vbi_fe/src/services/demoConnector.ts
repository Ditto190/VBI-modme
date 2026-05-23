let demoConnectorPromise: Promise<void> | null = null

export const ensureDemoConnector = () => {
  demoConnectorPromise ??= import('@visactor/headless-bi-provider/demo-connector-browser').then(
    ({ registerDemoConnector }) => {
      registerDemoConnector()
    },
  )

  return demoConnectorPromise
}
