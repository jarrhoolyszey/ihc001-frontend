import React from 'react';

import { makeStyles } from '@material-ui/styles';

import { 
  Button, 
  Paper, 
  Typography 
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: '20px',
  }
})

const SemAtendimentos = ({nome}) => {
  const { changeTab } = React.useContext(TabContext);
  const css = useStyles();

  return (
    <Paper className={css.root}>
      <Typography>{nome} ainda não possui atendimentos.</Typography>
      <Button
        className={css.button}
        endIcon={ <NavigateNext /> }
        onClick={ () => { changeTab(1) } }
        variant="outlined"
      >
        Iniciar um novo atendimento
      </Button>
    </Paper>
  )
}

export default SemAtendimentos;