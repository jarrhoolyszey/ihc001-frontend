import React from 'react';
import useForm from 'hooks/useForm';

import {

} from '@material-ui/core';

import Input from 'components/Input';

const Atendimento = () => {
  const cep = useForm('cep');
  const email = useForm('email');
  const nome = useForm(false);

  function handleSubmit(e) {
    e.preventDefault();
    
    if(cep.validate() && email.validate() && nome.validate()) {
      console.log('Enviou');
    } else {
      console.log('Não enviou');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        id="cep"
        label="CEP"
        type="text"
        variant="outlined"
        placeholder={'00000-000'}
        {...cep}
      />

      <Input
        id="email"
        label="Email"
        type="email"
        variant="outlined"
        placeholder={'exemplo@email.com'}
        {...email}
      />

      <Input
        id="nome"
        label="Nome"
        type="text"
        variant="outlined"
        {...nome}
      />
    
      <button>Enviar</button>
    </form>
  )
}

export default Atendimento;