import React from 'react';


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
    validation: (cpf) => {
      const regex = /\.|-|,|\\|\//g;
      cpf = cpf.replaceAll(regex, '');

      const invalid = [
        '11111111111', '22222222222', 
        '33333333333', '44444444444',
        '55555555555', '66666666666',
        '77777777777', '88888888888',
        '99999999999'].includes(cpf);
      
      if(invalid)
        throw new Error('CPF inválido.');  
      
      /* Verificação do primeiro DV */
      let sum;

      sum = 0;
      for (let i=0; i<9; i++)
        sum += parseInt(cpf[i]) * (10 - i);
      
      let stDigit = sum * 10 % 11;
      stDigit = (stDigit === 10) ? 0 : stDigit;

      if( parseInt(cpf[9]) !== stDigit )
        throw new Error('DV inválido');  
      
      /* Verificação do segundo DV */
      sum = 0;
      for (let i=0; i<10; i++)
        sum += parseInt(cpf[i]) * (11 - i);
      let ndDigit = sum * 10 % 11;
      ndDigit = ( ndDigit === 10) ? 0 : ndDigit;
      
      if( parseInt(cpf[10]) !== ndDigit )
        throw new Error('DV inválido');
      
      return true;
    } 
  },
  rg: {
    regex: /^\d{2}.?\d{3}.?\d{3}-?\d{1}$/,
    error: 'RG inválido',
    validation: (rg) => {
      const regex = /\.|-|,|\\|\//g;
      rg = rg.replaceAll(regex, '');
      
      let sum = 0;
      for(let i=0; i<8; i++)
        sum += parseInt(rg[i]) * (9 - i);
      
      let expected_dv = sum % 11;
      expected_dv = (expected_dv === 10) ? 0 : expected_dv;

      if(parseInt(rg[8]) !== expected_dv)
        throw new Error('DV inválido');
      
      return true;
    }
  }
}

const useForm = (type) => {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(null);

  function validate(value) {
    if(!type === false) {
      if(value.length > 0) {
        setError(null);

        if(types[type] && !types[type].regex.test(value)) {
          setError(types[type].error);
          return false;
        } else if(types[type].hasOwnProperty('validation')) {
          try {
            types[type].validation(value);
          } catch (err) {
            setError(err.message);
            return false;
          }
        } else {
          setError(null);
          return true;
        }
      }
    }
  }

  function onChange({target}) {
    if(error) validate(target.value);
    setValue(target.value)
  }

  return {
    value,
    setValue,
    error,
    onChange,
    onBlur: () => validate(value),
    validate: () => validate(value),
  }
}

export default useForm;