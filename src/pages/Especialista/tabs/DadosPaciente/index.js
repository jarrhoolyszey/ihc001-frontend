import React from 'react';

import PacienteCard from './components/PacienteCard';
import SemPaciente from '../../components/SemPaciente';

import { PacienteContext } from 'context/PacienteCtx';



const DadosPaciente = () => {
  const { pacienteState } = React.useContext(PacienteContext);

  if( pacienteState.nome !== '' ) {
    return <PacienteCard />
  } else {
    return <SemPaciente />
  }
}

export default DadosPaciente;