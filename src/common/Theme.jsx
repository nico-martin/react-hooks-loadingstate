import React from 'react';

export const Error = ({ error }) => (
  <p>
    <b style={{ color: 'red' }}>ERROR</b>
    <br />
    {error}
  </p>
);

export const Loading = () => <p>loading..</p>;
