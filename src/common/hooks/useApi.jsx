import React from 'react';
import axios from 'axios';
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
    axios
      .get(endpoint)
      .then((resp) => {
        setPartData({
          state: apiDataStates.SUCCESS,
          data: resp.data,
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
