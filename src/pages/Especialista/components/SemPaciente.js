import React from 'react';

import { makeStyles } from '@material-ui/styles';

import {
  Button,
  Typography,
  Paper,
} from '@material-ui/core';

import { NavigateNext } from '@material-ui/icons';

import { TabContext } from 'context/TabContext';


const useStyles = makeStyles({
  root: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '40px 20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin: '0 auto',
    marginTop: '20px',
      
  }
});

const SemPaciente = () => {
  const { changeTab } = React.useContext(TabContext);
  const css = useStyles();

  return (
    <Paper className={css.root}>
      <Typography>Sem nenhum paciente sendo atendido no momento.</Typography>
      <Button
        className={css.button}
        variant="outlined"
        endIcon={ <NavigateNext /> }
        onClick={ () => { changeTab(0) } }
      >
        Ir Para Busca de Paciente
      </Button>
    </Paper> 
  )
}

export default SemPaciente;