import React, { useContext } from 'react';

import { Context } from 'context/PacienteContext';

const BuscarPaciente = () => {
  const { paciente } = useContext(Context);
  
  if(paciente) {
    return <h1>{paciente}</h1>
  } else {
    return <h1>Sem paciente</h1>
  }
}

export default BuscarPaciente;