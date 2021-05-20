import React from 'react';

import api from 'services/api';


const useAxios = () => {
  const [ requesting, setRequesting ] = React.useState(false);
  
  /* tem que ser usado em uma função async */
  const request = async (config) => {
    let response;

    try {
      setRequesting(true);
      response = await api.request(config)
    } catch (error) {
      if(error.response) {
        response = error.response
      }
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