import { afterEach, beforeEach, expect, test } from '@rstest/core';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { APP } from 'src/App';
import {
  createDefaultBuilder,
  setLocalDataWithSchema,
} from 'src/utils/localConnector';

beforeEach(() => {
  setLocalDataWithSchema([], []);
});

afterEach(() => {
  cleanup();
  setLocalDataWithSchema([], null);
});

test('APP keeps edit workbench as the default mode', async () => {
  render(<APP builder={createDefaultBuilder()} />);

  expect(await screen.findByPlaceholderText('搜索')).toBeInTheDocument();
  expect(screen.getAllByText('暂时为空').length).toBeGreaterThan(0);
});

test('APP hides editor controls in view mode', async () => {
  render(<APP builder={createDefaultBuilder()} mode="view" />);

  expect((await screen.findAllByText('暂时为空')).length).toBeGreaterThan(0);

  await waitFor(() => {
    expect(screen.queryByPlaceholderText('搜索')).not.toBeInTheDocument();
  });
});
