import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import useTimeout from './useTimeout';
jest.setTimeout(2000);
describe('useTimeout Hook', () => {
  it('test state and nextUpdated state', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useTimeout());
    expect(result.current).toEqual(false);
    await waitForNextUpdate();
    expect(result.current).toEqual(true);
  });
});
