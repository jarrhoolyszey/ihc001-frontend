import React, { useState, useCallback } from 'react';

import api from 'services/api';


const useAxios = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const request = useCallback(async (config) => {
    let response;

    try {
      setError(null);
      setLoading(true);
      response = await api.request(config);
      
      if (response.statusText !== 'OK') throw new Error(response.data);

    } catch (err) {
      setError(err.message);

    } finally {
      //setData(response.data);
      setLoading(false);
      return response;
    }
  }, [])

  return {
    data,
    error,
    loading,
    request,
  }
}

export default useAxios;