import React from 'react';
import { Router } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';

import Routes from './routes';
import history from './history';

import './global.css';


const App = () => {
  return (
    <AuthProvider>
      <Router history={history}>
        <Routes />
      </Router>
    </AuthProvider>
  );
}

export default App;