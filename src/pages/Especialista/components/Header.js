import React from 'react';

import { makeStyles } from '@material-ui/styles';

import { Button, Typography } from '@material-ui/core';

import { Context } from 'context/AuthContext';
import { PacienteContext } from 'context/PacienteCtx';

import Logo from 'imgs/logo-bw.png';

import theme from 'themes/theme';


const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    minHeight: '56px',
    maxHeight: '56px',
    padding: '10px 20px',
    backgroundColor: theme.palette.primary,
    
    color: theme.palette.primaryText,

    '& #logo': {
      width: '50px',
    },

    '& button': {
      color: theme.palette.primaryText,
      borderColor: theme.palette.primaryText,
    }
  }
})

const Header = () => {
  const { handleLogout } = React.useContext(Context);
  const { pacienteState: paciente } = React.useContext(PacienteContext);  
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img id="logo" src={Logo} alt="logo" />

      {
        <Typography>{paciente.nome !== '' && `--- Atendimento de ${paciente.nome} em andamento ---` }</Typography>
      }

      <Button 
        variant="outlined" 
        onClick={handleLogout}
      >
      Sair
      </Button>
    </div>
  );
}

export default Header;