import React, { useContext } from 'react';

import { makeStyles } from '@material-ui/styles';

import {

} from '@material-ui/core';

import { Context } from 'context/PacienteContext';


const useStyles = makeStyles({
  root: {
    border: 'dashed 1px black',
    height: '100%',
  }
});

const HistoricoPaciente = (props) => {
  const css = useStyles();
  const { paciente } = useContext(Context);

  if(paciente) {
    return (
      <div className={css.root}>
        <h1>Historico do Paciente: {paciente}</h1>
      </div>
    )
  } else {
    return (
      <h1>Sem paciente no momento</h1>
    )
  }
}

export default HistoricoPaciente;