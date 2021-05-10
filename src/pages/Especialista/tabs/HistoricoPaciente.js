import React from 'react';

import { makeStyles } from '@material-ui/styles';

import {

} from '@material-ui/core';


const useStyles = makeStyles({
  root: {
    border: 'dashed 1px black',
    height: '100%',
  }
});

const HistoricoPaciente = (props) => {
  const css = useStyles();

  return (
    <div className={css.root}>

    </div>
  )
}

export default HistoricoPaciente;