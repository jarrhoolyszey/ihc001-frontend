import React, { createContext, useState, useEffect } from 'react';

import useAxios from 'hooks/useAxios';

import api from 'services/api';
import history from 'services/history';

import {
  VERIFICAR_TOKEN,
} from 'services/api';

const Context = createContext();


function AuthProvider({ children }) {
  const [ authenticated, setAuthenticated ] = useState(false);
  const [ loading, setLoading ] = useState(true);
  const [ user, setUser ] = useState({});
  const { request } = useAxios();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if(token && user) {
      
      (async () => {
        const response = await request(VERIFICAR_TOKEN(JSON.parse(token)));
        
        try {
          if(response.statusText !== "OK") {
            console.log('token invalido!')
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            history.push('/login');
          } else {
            console.log('configurando API ...')
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
            setUser(JSON.parse(user));
            setAuthenticated(true);
          }
        } catch (err) {
          console.log(err);
        }
      })()
    }
    setLoading(false);
  }, []);


  function redirectByRole(role) {
    if( authenticated ) {
      if( role === 'especialista') {
        history.push('/especialista')
      } else if( role === 'paciente') {
        history.push('/paciente');
      } else if( role === 'admin') {
        history.push('/admin');
      }
    }
  }

  async function handleLogin(payload) {
    try{
      const response = await api.post('/auth/login', payload);
      
      if( response.status === 200) {
        const { token, user } = response.data;
        const { permissao } = response.data.user;

        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('user', JSON.stringify(user));
      
        api.defaults.headers.Authorization = `Bearer ${token}`;

        setAuthenticated(true);
        setUser(response.data.user);

        redirectByRole(permissao);
      }

    } catch (err) {
      console.log('error', err.message);     
    }
  }


  function handleLogout() {
    setAuthenticated(false);
    setUser({});

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    api.defaults.headers.Authorization = undefined;
    
    history.push('/login');
  }


  return (
    <Context.Provider value={{ 
      loading, 
      authenticated, 
      user, 
      handleLogin, 
      handleLogout, 
      redirectByRole,
    }}>
      {children}
    </Context.Provider>
  )
}

export { Context, AuthProvider };