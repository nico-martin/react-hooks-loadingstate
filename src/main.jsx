import React from 'react';
import ReactDOM from 'react-dom';

import PostList from './PostList.jsx';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.log('ERROR', error);
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          <p>check the console</p>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.render(
  <ErrorBoundary>
    <PostList title="meine Posts" />
  </ErrorBoundary>,
  document.getElementById('root')
);
