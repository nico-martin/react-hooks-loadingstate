import React from 'react';
import useApi from './common/hooks/useApi.jsx';
import { apiDataStates } from './common/constants.js';

const PostList = ({ title }) => {
  const { state, error, data, reload } = useApi(
    'https://api.nico.dev/2PACX-1vSNjZItcRIaqBeN8xIBQNjphBUqgBEOo149_bUjFMLOGsByT0LXqaBF3C-zN44ThrDeEdB5Q_bJsW5B/?row=true&table=532894058&reverse=true'
  );
  return (
    <div>
      <h1>{title}</h1>
      {state === apiDataStates.LOADING && (
        <div>
          <p>loading..</p>
        </div>
      )}
      {state === apiDataStates.ERROR && (
        <div>
          <p>
            <b>ERROR:</b>
            <br />
            {error || 'General error'}
          </p>
        </div>
      )}
      {state === apiDataStates.SUCCESS && (
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
      )}
      <button onClick={() => reload()}>reload</button>
    </div>
  );
};

export default PostList;
