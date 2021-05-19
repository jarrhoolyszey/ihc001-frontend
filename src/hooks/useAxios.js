import React from 'react';

import api from 'services/api';


const useAxios = () => {
  const [requesting, setRequesting] = React.useState(false);
  
  const request = async (config) => {
    let response;

    try {
      setRequesting(true);
      response = await api.request(config);
      
      if (response.statusText !== 'OK') {
        throw new Error(response.data);
      }

    } catch (err) {
      //setError(err.message);
    } finally {
      setRequesting(false);
      return response;
    }
  }

  return {
    requesting,
    request,
  }
}

export default useAxios;