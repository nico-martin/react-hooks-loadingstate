import React from 'react';
import PostList from './PostList';
import renderer from 'react-test-renderer';
import useApi from './common/hooks/useApi.jsx';

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
