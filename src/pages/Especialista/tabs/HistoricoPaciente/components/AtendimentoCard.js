import React from 'react';

import { makeStyles } from '@material-ui/styles';

import {
  Paper,
  Typography,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    border: '1px dashed blue',
  }
})

const AtendimentoCard = ({atendimento}) => {
  const css = useStyles();
  
  return (
    <Paper className={css.root}>
      <Typography>AtendimentoCard</Typography>
    </Paper>
  )
}

export default AtendimentoCard;