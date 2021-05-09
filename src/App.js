import React from 'react';
import { Router } from 'react-router-dom';

import { CssBaseline } from '@material-ui/core';

import { AuthProvider } from './context/AuthContext';

import Routes from './routes';
import history from './history';


const App = () => {
  return (
    <AuthProvider>
      <CssBaseline>
        <Router history={history}>
          <Routes />
        </Router>
      </CssBaseline>
    </AuthProvider>
  );
}

export default App;