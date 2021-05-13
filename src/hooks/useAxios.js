import React, { useState, useCallback } from 'react';

import api from 'services/api';


const useAxios = () => {
  //const [data, setData] = useState(null);
  //const [error, setError] = useState(null);
  const [requesting, setRequesting] = useState(false);
  
  const request = async (config) => {
    let response;

    try {
      //setData(null);
      //setError(null);
      setRequesting(true);
      response = await api.request(config);
      
      if (response.statusText !== 'OK') {
        throw new Error(response.data);
      }

    } catch (err) {
      //setError(err.message);
    } finally {
      //setData(response.data);
      setRequesting(false);
      return response;
    }
  }

  return {
    //data,
    //error,
    requesting,
    request,
  }
}

export default useAxios;