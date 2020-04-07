import React from 'react';

export const dataStates = {
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

export const useData = () => {
  const [data, setData] = React.useState({
    state: dataStates.LOADING,
    error: '',
    data: [],
  });

  React.useEffect(() => {
    fetch(
      'https://api.nico.dev/2PACX-1vSNjZItcRIaqBeN8xIBQNjphBUqgBEOo149_bUjFMLOGsByT0LXqaBF3C-zN44ThrDeEdB5Q_bJsW5B/?row=true&table=532894058&reverse=true'
    )
      .then((resp) => resp.json())
      .then((posts) =>
        setData({
          ...data,
          state: dataStates.SUCCESS,
          data: posts,
        })
      )
      .catch((err) =>
        setData({
          ...data,
          state: dataStates.ERROR,
          error: 'Fetch failed',
        })
      );
  }, []);

  return data;
};
