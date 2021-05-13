import React, { useState } from 'react';


const types = {
  cep: {
    regex: /^\d{5}-?\d{3}$/,
    error: 'CEP inválido.',
  },
  email: {
    regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    error: 'Email inválido.',
  },
  cpf: {
    regex: /^\d{3}.?\d{3}.?\d{3}-?\d{2}$/,
    error: 'CPF inválido',
  },
  rg: {
    regex: /^\d{2}.?\d{3}.?\d{3}-?\d{1}$/,
    error: 'RG inválido',
  }
}

const useForm = (type) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(null);

  function validate(value) {
    if(!type === false) {
      if(value.length === 0) {
        setError('Insira um valor.');
        return false;
      } else if(types[type] && !types[type].regex.test(value)) {
        setError(types[type].error);
        return false;
      } else {
        setError(null);
        return true;
      }
    }
  }

  function onChange({target}) {
    if(error) validate(target.value);
    setValue(target.value)
  }

  return {
    value,
    error,
    onChange,
    onBlur: () => validate(value),
    validate: () => validate(value),
  }
}

export default useForm;