import React from 'react';
import PostList from './PostList';
import renderer from 'react-test-renderer';
import useApi from './common/hooks/useApi.jsx';
import { apiDataStates } from './common/constants.js';
import { useApiMock } from './common/hooks/useApi.test.jsx';

jest.mock('./common/hooks/useApi.jsx');

describe('PostList Snapshots', () => {
  it('loading renders correctly', () => {
    useApi.mockReturnValue({
      state: 'LOADING',
      error: '',
      data: [],
      reload: () => {},
    });
    const tree = renderer.create(<PostList title="Test" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('success renders correctly', () => {
    useApi.mockReturnValue({
      state: 'SUCCESS',
      error: '',
      data: useApiMock.data,
      reload: () => {},
    });
    const tree = renderer.create(<PostList title="Test" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('error renders correctly', () => {
    useApi.mockReturnValue({
      state: 'ERROR',
      error: 'General Error',
      data: [],
      reload: () => {},
    });
    const tree = renderer.create(<PostList title="Test" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
