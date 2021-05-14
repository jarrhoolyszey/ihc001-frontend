import React, { useContext } from 'react';

import {

} from '@material-ui/core';

import PacienteCard from './components/PacienteCard';

import { Context } from 'context/PacienteContext';

const DadosPaciente = () => {
  const { paciente } = useContext(Context);
  
  if( paciente ) {
    return (
      <>
        <PacienteCard paciente={paciente} />
      </>
    )
  } else {
    return <h1>{'Sem paciente no momento =('}</h1>
  }
}

export default DadosPaciente;