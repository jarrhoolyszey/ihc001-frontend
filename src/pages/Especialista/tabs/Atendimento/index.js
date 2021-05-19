import React from 'react';

import AtendimentoCard from './components/AtendimentoCard';

import { PacienteContext } from 'context/PacienteCtx';


const Atendimento = () => {
  const { pacienteState } = React.useContext(PacienteContext);

  if( pacienteState.nome !== '' ) {
    return (
      <AtendimentoCard />
    )
  } else {
    return (
      <h1>Sem paciente no momento</h1>
    )
  }
  
}

export default Atendimento;