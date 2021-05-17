import React from 'react';

import { makeStyles } from '@material-ui/styles';

import { PacienteContext } from 'context/PacienteCtx';


const useStyles = makeStyles({
  root: {
    border: 'dashed 1px black',
    height: '100%',
  }
});

const HistoricoPaciente = () => {
  const { pacienteState } = React.useContext(PacienteContext);
  const css = useStyles();
  
  if(pacienteState.name !== '') {
    return (
      <div className={css.root}>
        <h1>Historico do Paciente: {pacienteState.nome}</h1>
      </div>
    )
  } else {
    return (
      <h1>Sem paciente no momento</h1>
    )
  }
}

export default HistoricoPaciente;