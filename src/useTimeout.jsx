import React from 'react';

export default () => {
  const [done, setDone] = React.useState(false);
  setTimeout(() => setDone(true), 6000);
  return done;
};
