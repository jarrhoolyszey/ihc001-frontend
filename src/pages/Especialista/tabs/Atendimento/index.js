import React from 'react';

import {
  Paper,
} from '@material-ui/core';

import AtendimentoCard from './components/AtendimentoCard';

import { PacienteContext } from 'context/PacienteCtx';
import { AtendimentoCtx } from 'context/AtendimentoCtx';


const Atendimento = () => {
  const { pacienteState } = React.useContext(PacienteContext);
  const { atendimentoState } = React.useContext(AtendimentoCtx);

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