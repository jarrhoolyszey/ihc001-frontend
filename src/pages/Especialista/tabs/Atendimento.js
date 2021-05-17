import React from 'react';

import {

} from '@material-ui/core';

import { PacienteContext } from 'context/PacienteCtx';


const Atendimento = () => {
  const { pacienteState } = React.useContext(PacienteContext);

  if( pacienteState.nome !== '' ) {
    return (
      <>
        <h1>Atendimento de {pacienteState.nome}</h1>
      </>
    )
  } else {
    return (
      <h1>Sem paciente no momento</h1>
    )
  }
  
}

export default Atendimento;