import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import useApiFetch from './useApiFetch.jsx';

const useApiFetchMock = [{ title: 'Hello' }, { title: 'World' }];

const mockFetch = (mockData) => {
  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockData),
    })
  );
};

const mockFetchError = (error) => {
  global.fetch = jest.fn().mockImplementation(() => Promise.reject(error));
};

const mockFetchCleanUp = () => {
  global.fetch.mockClear();
  delete global.fetch;
};

describe('useApi Hook', () => {
  it('initial and success state', async () => {
    mockFetch(useApiFetchMock);
    const { result, waitForNextUpdate } = renderHook(() =>
      useApiFetch('lorem')
    );
    expect(result.current).toMatchObject({
      data: [],
      error: '',
      state: 'LOADING',
    });

    await waitForNextUpdate();

    expect(result.current).toMatchObject({
      data: useApiFetchMock,
      error: '',
      state: 'SUCCESS',
    });
    mockFetchCleanUp();
  });

  it('error state', async () => {
    mockFetchError('Network Error');

    const { result, waitForNextUpdate } = renderHook(() =>
      useApiFetch('lorem')
    );
    await waitForNextUpdate();
    mockFetchCleanUp();

    expect(result.current).toMatchObject({
      data: [],
      error: 'Fetch failed',
      state: 'ERROR',
    });
  });
});
