import React, { useContext } from 'react';

import { Context } from 'context/PacienteContext';

import BuscarPacienteForm from '../forms/BuscarPacienteForm';


const BuscarPaciente = () => {
  const { paciente } = useContext(Context);

  return (
    <BuscarPacienteForm />
  );
}

export default BuscarPaciente;