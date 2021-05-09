import React from 'react';
import { Router } from 'react-router-dom';

import { CssBaseline } from '@material-ui/core';

import { AuthProvider } from './context/AuthContext';

import history from "services/history";
import Routes from "./routes";


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