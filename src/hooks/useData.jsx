import React from 'react';
import axios from 'axios';

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

  const fetchData = () => {
    setData({
      ...data,
      state: dataStates.LOADING,
      error: '',
      data: [],
    });
    axios
      .get(
        'https://api.nico.dev/2PACX-1vSNjZItcRIaqBeN8xIBQNjphBUqgBEOo149_bUjFMLOGsByT0LXqaBF3C-zN44ThrDeEdB5Q_bJsW5B/?row=true&table=532894058&reverse=true'
      )
      .then((resp) => {
        setData({
          ...data,
          state: dataStates.SUCCESS,
          data: resp.data,
        });
      })
      .catch((err) =>
        setData({
          ...data,
          state: dataStates.ERROR,
          error: 'Fetch failed',
        })
      );
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return { ...data, reload: () => fetchData() };
};
