import { afterEach, beforeEach, expect, test } from '@rstest/core'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import { APP } from 'src/App'
import { createDefaultBuilder, setLocalDataWithSchema } from 'src/utils/localConnector'

beforeEach(() => {
  setLocalDataWithSchema([], [])
})

afterEach(() => {
  cleanup()
  setLocalDataWithSchema([], null)
})

test('APP keeps edit workbench as the default mode', async () => {
  render(<APP builder={createDefaultBuilder()} />)

  expect(await screen.findByPlaceholderText('搜索')).toBeInTheDocument()
  expect(screen.getAllByText('暂时为空').length).toBeGreaterThan(0)
})

test('APP hides editor controls in view mode', async () => {
  render(<APP builder={createDefaultBuilder()} mode="view" />)

  expect((await screen.findAllByText('暂时为空')).length).toBeGreaterThan(0)

  await waitFor(() => {
    expect(screen.queryByPlaceholderText('搜索')).not.toBeInTheDocument()
  })
})

test('APP can hide internal locale and theme controls', async () => {
  render(<APP builder={createDefaultBuilder()} hideLocale hideTheme locale="en-US" theme="dark" />)

  expect(await screen.findByPlaceholderText('Search')).toBeInTheDocument()
  expect(screen.queryByText('EN')).not.toBeInTheDocument()
  expect(screen.queryByLabelText('sun')).not.toBeInTheDocument()
})
