import React, { createContext, useState, useEffect } from 'react';

import api from '../api';
import history from '../history';


const Context = createContext();


function AuthProvider({ children }) {
  const [ authenticated, setAuthenticated] = useState(false);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if(token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }

    // ignora a autenticação para testes
    setAuthenticated(true);

    setLoading(false);
  }, []);


  async function handleLogin(payload) {
    try{
      const response = await api.post('/login', payload);
      
      if( response.status === 200) {
        const { token } = response.data;
        const { permissao, id } = response.data.user;

        localStorage.setItem('token', JSON.stringify(token));
      
        api.defaults.headers.Authorization = `Bearer ${token}`;

        setAuthenticated(true);

        // redirecionar para a pagina adequada
        if(permissao === 'especialista') {
          history.push('/especialista');
        } else if (permissao === 'paciente') {
          history.push('/paciente');
        } else if (permissao === 'admin') {
          history.push('/admin');
        }
      }

    } catch (err) {
      console.log('error', err.message);     
    }
  }


  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem('token');
    api.defaults.headers.Authorization = undefined;
    // redirecionar para a pagina adequada
    history.push('/login');
  }


  // if(loading) {
  //   return <h1>Loading...</h1>
  // }

  return (
    <Context.Provider value={{ loading, authenticated, handleLogin, handleLogout }}>
      {children}
    </Context.Provider>
  )
}

export { Context, AuthProvider };