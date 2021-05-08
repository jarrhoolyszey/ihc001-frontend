import React from 'react';

import MaskedInput from 'react-text-mask';

import { makeStyles } from '@material-ui/styles';

import {
  Grid,
  Paper,
  Typography,
  TextField,
} from '@material-ui/core';


const useStyles = makeStyles({
  root: {
    height: '100%',
    border: '1px solid black',
  
    '& .category': {
      minHeight: '100px',
    }
  }
});


const DadosPessoais = () => {
  const classes = useStyles();

  return (
    <div className={classes.root} >
      <Paper className="category" elevation={3}>
        <Typography variant="h6">Informações Pessoais:</Typography>
        <TextField label="Teste"/>
      </Paper>

      <Paper className="category" elevation={3}>
        <Typography variant="h6">Endereço:</Typography>
      </Paper>
    </div>
  );
}

export default DadosPessoais;