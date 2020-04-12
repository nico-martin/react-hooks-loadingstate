import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import useApi from './useApi.jsx';
import axios from 'axios';

jest.mock('axios');

export const useApiMock = {
  data: [
    {
      hello: 'World',
    },
  ],
};

describe('useApi Hook', () => {
  it('initial state', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve(useApiMock));
    const { result } = renderHook(() => useApi('lorem'));

    expect(result.current).toMatchObject({
      data: [],
      error: '',
      state: 'LOADING',
    });
  });

  it('success state', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve(useApiMock));
    const { result, waitForNextUpdate } = renderHook(() => useApi('lorem'));
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
