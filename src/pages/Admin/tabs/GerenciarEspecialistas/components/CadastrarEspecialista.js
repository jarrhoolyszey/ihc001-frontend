import CadastroPaciente from 'pages/Especialista/forms/CadastroPaciente';
import React from 'react';

const CadastrarEspecialista = (props) => {
  const { panel, index } = props;

  return (
    <h1 hidden={panel !== index}>Cadastrar Especialista</h1>
  )
}

export default CadastrarEspecialista;