import React from 'react';
import PostList from './PostList';
import renderer from 'react-test-renderer';

describe('PostList Snapshots', () => {
  it('loading renders correctly', () => {
    const tree = renderer.create(<PostList title="Test" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('success renders correctly', () => {
    // need to find a way to mock posts
    const tree = renderer.create(<PostList title="Test" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
