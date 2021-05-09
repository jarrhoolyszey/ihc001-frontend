import React from 'react';

import { makeStyles } from '@material-ui/styles';

import {
  Paper,
  Avatar,
  Grid,
} from '@material-ui/core';

import DefaultImage from 'imgs/default-profile-picture.png';
import theme from 'themes/theme';


const useStyles = makeStyles({
  root: {
    backgroundColor: theme.palette.primaryLight,
    width: '100%',
    height: '100px',
  }
})

const PacienteCard = (props) => {
  const css = useStyles();
  
  return (
    <Paper elevation={3} className={css.root}>
      <Grid container>
        <Grid item>
          <Avatar src={DefaultImage}/>
        </Grid>
        <Grid item fullWidth>Linha</Grid>
      </Grid>
      <Grid container>

      </Grid>
    </Paper>
  )
}

export default PacienteCard;