import React from 'react';
import { apiDataStates } from '../constants.js';

export default (endpoint) => {
  const [data, setData] = React.useState({
    state: apiDataStates.LOADING,
    error: '',
    data: [],
  });

  const setPartData = (partialData) => setData({ ...data, ...partialData });

  const fetchData = () => {
    setPartData({
      state: apiDataStates.LOADING,
      error: '',
      data: [],
    });
    fetch(endpoint)
      .then((resp) => resp.json())
      .then((data) => {
        setPartData({
          state: apiDataStates.SUCCESS,
          data: data,
        });
      })
      .catch((err) =>
        setPartData({
          state: apiDataStates.ERROR,
          error: 'Fetch failed',
        })
      );
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return data;
};
