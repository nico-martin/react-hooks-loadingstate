import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-test-renderer';
import { apiDataStates } from '../constants.js';
import useApi from './useApi';
import axios from 'axios';

jest.mock('axios');

export const useApiMock = {
  data: [
    {
      key: 'Mocked Post 1',
      title: 'Mocked Post 1',
      abstract:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et',
      date: '2020-04-10',
      publisher: 'publisher',
      link: 'https://css-tricks.com/creating-scheduled-push-notifications/',
    },
    {
      key: 'Mocked Post 2',
      title: 'Mocked Post 2',
      abstract:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et',
      date: '2019-05-24',
      publisher: 'publisher',
      link: 'https://www.cyon.ch/blog/Progressive-Web-Apps-PWA',
    },
  ],
};

describe('useApi Hook', () => {
  it('initial state', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve(useApiMock));
    const { result } = renderHook(() => useApi('lorem'));

    await expect(result.current).toMatchObject({
      data: [],
      error: '',
      reload: expect.any(Function),
      state: 'LOADING',
    });
  });

  it('success state', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve(useApiMock));
    const { result } = renderHook(() => useApi('lorem'));
    axios.get.mockImplementationOnce(() => Promise.resolve(useApiMock));
    await act(async () => {
      result.current.reload();
    });

    await expect(result.current).toMatchObject({
      data: useApiMock.data,
      error: '',
      reload: expect.any(Function),
      state: 'SUCCESS',
    });
  });

  it('error state', async () => {
    const errorMessage = 'Network Error';
    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );
    const { result } = renderHook(() => useApi('lorem'));
    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );
    await act(async () => {
      result.current.reload();
    });

    await expect(result.current).toMatchObject({
      data: [],
      error: 'Fetch failed',
      reload: expect.any(Function),
      state: 'ERROR',
    });
  });
});
