import React, { useContext } from 'react'

import { makeStyles } from '@material-ui/styles';

import {
  Box,
  Typography,
  Button,
  TextField,
} from '@material-ui/core';

import VerticalTabs from './VerticalTabs';

import { Context } from '../../context/AuthContext';


const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: '60px',
    padding: '0px 20px',
    backgroundColor: 'lightblue',
  },
  logoutButton: {
    height: '40px',
  }
});

const Paciente = () => {
  const classes = useStyles();
  const { authenticated, handleLogout } = useContext(Context);

  return (
    <div className={classes.wrapper}>
      <Box className={classes.header}>
        <Button className={classes.logoutButton} variant="outlined" color="primary">
          <Typography variant="button">Sair</Typography>
        </Button>
      </Box>

      <VerticalTabs />
      
    </div>
  );
}

export default Paciente;