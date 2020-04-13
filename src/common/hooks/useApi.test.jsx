import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import useApi from './useApi.jsx';
import axios from 'axios';

jest.mock('axios');

export const useApiMock = {
  data: [{ title: 'Hello' }, { title: 'World' }],
};

describe('useApi Hook', () => {
  it('initial and success state', async () => {
    axios.get.mockResolvedValue(useApiMock);
    const { result, waitForNextUpdate } = renderHook(() => useApi('lorem'));

    expect(result.current).toMatchObject({
      data: [],
      error: '',
      state: 'LOADING',
    });

    await waitForNextUpdate();

    expect(result.current).toMatchObject({
      data: useApiMock.data,
      error: '',
      state: 'SUCCESS',
    });
  });

  it('error state', async () => {
    const errorMessage = 'Network Error';
    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );
    const { result, waitForNextUpdate } = renderHook(() => useApi('lorem'));
    await waitForNextUpdate();

    expect(result.current).toMatchObject({
      data: [],
      error: 'Fetch failed',
      state: 'ERROR',
    });
  });
});
