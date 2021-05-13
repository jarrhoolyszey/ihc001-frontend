import React from 'react';

import { makeStyles } from '@material-ui/styles';

import {
  Paper,
  Avatar,
  Grid,
  TextField
} from '@material-ui/core';

import DefaultImage from 'imgs/default-profile-picture.png';

import paciente from 'testes/paciente';


const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    padding: '30px',
  },
  avatarWrapper: {
    marginRight: '30px',

    '& .avatar': {
      width: '100px',
      height: '100px',
    }
  }
})

const PacienteCard = () => {
  const css = useStyles();

  return (
    <Paper elevation={3} className={css.root}>
      <Grid container>

        <Grid item className={css.avatarWrapper}>
          <Avatar className="avatar" src={DefaultImage}/>
        </Grid>
        
        <Grid item>
          <TextField
            fullWidth 
            label="Nome" 
            variant="outlined" 
            value={paciente.nome + ' ' + paciente.sobrenome}
            InputProps={{
              readOnly: true,
            }}
            
        />
        </Grid>
      </Grid>
    </Paper>
  )
}

export default PacienteCard;