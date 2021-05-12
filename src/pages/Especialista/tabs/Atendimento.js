import React, { useContext } from 'react';

import {

} from '@material-ui/core';

import { Context } from 'context/PacienteContext';

import CadastroPaciente from '../forms/CadastroPaciente';


const Atendimento = () => {
  const { paciente } = useContext(Context);

  if( paciente ) {
    return (
      <>
        <h1>Atendimento</h1>
        <CadastroPaciente />
      </>
    )
  } else {
    return (
      <h1>Sem paciente no momento</h1>
    )
  }
  
}

export default Atendimento;