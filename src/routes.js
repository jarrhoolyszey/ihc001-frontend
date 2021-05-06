import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Context } from './context/AuthContext';

import Login from './pages/Login';
import Admin from './pages/Admin';
import Especialista from './pages/Especialista';
import Paciente from './pages/Paciente';


function CustomRoute({ isPrivate, role, ...rest }) {
  const { loading, authenticated } = useContext(Context);

  if(loading) {
    console.log('Routes: Loading?', loading);
    setTimeout(3000);
    return <h1>Loading...</h1>;
  }

  if(isPrivate && !authenticated) {
    return <Redirect to="/login" />
  }

  return <Route {...rest} />
}


export default function Routes() {
  return (
    <Switch>
      <CustomRoute exact path="/login" component={Login} />
      <CustomRoute isPrivate role="paciente" exact path="/paciente" component={ Paciente } />
      <CustomRoute isPrivate role="especialista" exact path="/especialista" component={ Especialista } />
      <CustomRoute isPrivate role="admin" exact path="/admin" component={ Admin } />
    </Switch>
  )
}