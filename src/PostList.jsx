import React from 'react';
import { useData, dataStates } from './hooks/useData.jsx';

const PostList = ({ title }) => {
  const { state, error, data } = useData();
  return (
    <div>
      <h1>{title}</h1>
      {state === dataStates.LOADING && (
        <div>
          <p>loading..</p>
        </div>
      )}
      {state === dataStates.ERROR && (
        <div>
          <p>
            <b>ERROR:</b>
            <br />
            {error || 'General error'}
          </p>
        </div>
      )}
      {state === dataStates.SUCCESS && (
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
    </div>
  );
};

export default PostList;
