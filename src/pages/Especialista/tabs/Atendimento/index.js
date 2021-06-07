import React from 'react';

import AtendimentoCard from './components/AtendimentoCard';
import SemPaciente from '../../components/SemPaciente';

import { PacienteContext } from 'context/PacienteCtx';


const Atendimento = () => {
  const { pacienteState } = React.useContext(PacienteContext);

  if( pacienteState.nome !== '' ) {
    return (
      <AtendimentoCard />
    )
  } else {
    return (
      <SemPaciente />
    )
  }
  
}

export default Atendimento;