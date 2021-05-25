import React from 'react';

import PacienteCard from './components/PacienteCard';

import { PacienteContext } from 'context/PacienteCtx';



const DadosPaciente = () => {
  const { pacienteState } = React.useContext(PacienteContext);

  if( pacienteState.nome !== '' ) {
    return (
      <>
        <PacienteCard />
      </>
    )
  } else {
    return <h1>{'Sem paciente no momento =('}</h1>
  }
}

export default DadosPaciente;