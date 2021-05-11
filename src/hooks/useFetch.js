import React, { useState, useCallback } from 'react';

import api from 'services/api';

const useFetch = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const request = useCallback(async (url, options) => {
    let response;
    let json;

    try {
      setError(null);
      setLoading(true);
      
    } catch (err) {

    } finally {
      setLoading(false);
    }
  }, [])

  return {
    data,
    error,
    loading,
    request,
  }
}

export default useFetch;