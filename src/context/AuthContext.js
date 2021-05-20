import React from 'react';

import useAxios from 'hooks/useAxios';

import api from 'services/api';

import history from 'services/history';

import {
  LOGIN,
  VERIFICAR_TOKEN,
} from 'services/api';

const Context = React.createContext();


function AuthProvider({ children }) {
  const [ authenticated, setAuthenticated ] = React.useState(false);
  const [ loading, setLoading ] = React.useState(true);
  const [ error, setError ] = React.useState(null);
  const [ user, setUser ] = React.useState({});
  const { requesting, request } = useAxios();

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if(token && user) {
      
      (async () => {
        const response = await request(VERIFICAR_TOKEN(JSON.parse(token)));
        
        try {
          if(response.status !== 200) {
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

  const handleLogin = async (email, senha) => {
    try{
      setError(null);
      const response = await request(LOGIN(email, senha));

      if( response.status !== 200) {
        setError(response.data.error);
        return;
      }

      const { token, user } = response.data;
      const { permissao } = response.data.user;

      localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem('user', JSON.stringify(user));
    
      api.defaults.headers.Authorization = `Bearer ${token}`;

      setAuthenticated(true);
      setUser(response.data.user);

      redirectByRole(permissao);
      
      return response;

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
      requesting, 
      error,
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