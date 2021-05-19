import React from 'react';

import api from 'services/api';


const useAxios = () => {
  const [requesting, setRequesting] = React.useState(false);
  
  const request = async (config) => {
    let response;

    try {
      setRequesting(true);
      response = await api.request(config);
      
      if (response.status !== 200) {
        throw new Error(response.data);
      }

    } catch (err) {
      console.log(err);
      
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