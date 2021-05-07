import React, { useContext } from 'react'

import { makeStyles } from '@material-ui/styles';

import {
  Container,
  Paper,
  Button,
  Avatar,
  Tabs,
  Tab,
} from '@material-ui/core';


import { Context } from '../../context/AuthContext';


const useStyles = makeStyles({
  wrapper: {
    width: '100%',
    height: '100px',
    display: 'block',
    backgroundColor: 'red',
  }
});

const Paciente = () => {
  const classes = useStyles();
  const { authenticated, handleLogout } = useContext(Context);

  return (
    <Container className={classes.wrapper} fixed disableGutters>
      <h1>Alo</h1>
    </Container>
  );
}

export default Paciente;