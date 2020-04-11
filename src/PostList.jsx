import React from 'react';
import useApi from './common/hooks/useApi.jsx';
import { apiDataStates } from './common/constants.js';
import { Error, Loading } from './common/Theme.jsx';

const PostList = ({ title }) => {
  const { state, error, data, reload } = useApi(
    'https://api.nico.dev/2PACX-1vSNjZItcRIaqBeN8xIBQNjphBUqgBEOo149_bUjFMLOGsByT0LXqaBF3C-zN44ThrDeEdB5Q_bJsW5B/?row=true&table=532894058&reverse=true'
  );
  const Content = () => {
    switch (state) {
      case apiDataStates.ERROR:
        return <Error error={error || 'General error'} />;
      case apiDataStates.SUCCESS:
        return (
          <ul>
            {data.map((item) => (
              <li key={item.link}>
                <b>{item.title}</b>
                <br />
                <a href={item.link} target="_blank">
                  {item.link}
                </a>
              </li>
            ))}
          </ul>
        );
      default:
        return <Loading />;
    }
  };

  return (
    <main>
      <h1>{title}</h1>
      <Content />
      <button onClick={() => reload()}>reload</button>
    </main>
  );
};

export default PostList;
