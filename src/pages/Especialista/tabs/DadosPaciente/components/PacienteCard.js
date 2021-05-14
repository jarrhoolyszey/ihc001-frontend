import React, { useState, useContext } from 'react';
import dayjs from 'dayjs';

import { makeStyles } from '@material-ui/styles';

import {
  Paper,
  Avatar,
  Button
} from '@material-ui/core';

import DefaultImage from 'imgs/default-profile-picture.png';

import Select from 'components/form/Select';
import Input from 'components/form/Input';
import MaskedInput from 'components/form/MaskedInput';

import { Context } from 'context/PacienteContext';

import useAxios from 'hooks/useAxios';
import {
  ATUALIZAR_PACIENTE,
} from 'services/api';


const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    maxWidth: '800px',
    padding: '30px 30px 20px 30px',
  },
  avatarWrapper: {
    marginRight: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    '& .avatar': {
      width: '100px',
      height: '100px',
      marginBottom: '20px',
    },

    '& button': {
      width: '100%',
    }
  },
  formFields: {
    '& .form-row': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: '20px',
      marginBottom: '10px',
    },

    '& .grow': {
      flexGrow: 1,
    },

    '& #numero, #estado': {
      maxWidth: '80px'
    }
  }
})

const formatDate = (date) => {
  return dayjs( new Date(date) ).format('YYYY-MM-DD');
}

const PacienteCard = () => {
  const { paciente, selectPaciente } = useContext(Context);
  const { requesting, request } = useAxios();
  const css = useStyles();

  // form controls
  const [readOnly, setReadOnly] = useState(true);
  const variant = 'filled';

  // form fields
  const [sexo, setSexo] = useState(paciente.sexo);
  const [form, setForm] = useState({
    nome: paciente.nome,
    sobrenome: paciente.sobrenome,
    email: paciente.email,
    CPF: paciente.CPF,
    RG: paciente.RG,
    data_nascimento: formatDate(paciente.data_nascimento),
    telefone: paciente.telefone,
    
    logradouro: paciente.endereco.logradouro,
    numero: paciente.endereco.numero,
    complemento: paciente.endereco.complemento,
    cep: paciente.endereco.cep,
    estado: paciente.endereco.estado,
    cidade: paciente.endereco.cidade,
    bairro: paciente.endereco.bairro, 
  })

  const handleChange = ({target}) => {
    if(target.id === 'data_nascimento') {
      console.log('formatou data')
      setForm({ ...form, [target.id]: formatDate(target.value)});
    } else {
      setForm({ ...form, [target.id]: target.value });
    }
  }

  const handleEditar = ({target}) => {
    setReadOnly(false);
  }

  const handleSalvar = ({target}) => {
    setReadOnly(true);
    handleSubmit();
  }

  const handleSubmit = async () => {
    const body = {
      nome: form.nome,
      sobrenome: form.sobrenome,
      sexo: sexo,
      email: form.email,
      CPF: form.CPF,
      RG: form.RG,
      data_nascimento: form.data_nascimento,
      telefone: form.telefone,
      endereco: {
        logradouro: form.logradouro,
        numero: form.numero,
        complemento: form.complemento,
        cep: form.cep,
        estado: form.estado,
        cidade: form.cidade,
        bairro: form.bairro, 
      },
    }

    const res = await request( ATUALIZAR_PACIENTE(paciente._id, body) );
    
    if(res.statusText === 'OK') {
      selectPaciente(res.data)
    }
  }


  return (
    <Paper elevation={3} className={css.root}>
      <div className={css.avatarWrapper}>
        <Avatar className="avatar" src={DefaultImage}/> 
        {
          readOnly ?
            <Button 
              color="primary" 
              variant="outlined"
              onClick={handleEditar}
              content="Editar"
            >
              Editar
            </Button>
            :
            <Button
              type="submit"
              color="primary"
              variant="outlined"
              onClick={handleSalvar}
            >
              { requesting ? 'Salvando...' : 'Salvar' }
            </Button>
          
        }      
      </div>

      <form className={css.formFields}>
        <div className={'form-row'}>
          <Input 
            id="nome"
            label='Nome'
            value={form.nome}
            onChange={handleChange}
            variant={variant}
            InputProps={{ readOnly, }}
          />
          <Input
            className="grow"
            id="sobrenome"
            label='Sobrenome'
            value={form.sobrenome}
            onChange={handleChange}
            variant={variant}
            InputProps={{ readOnly, }}
          />
        </div>
        <div className={'form-row'}>
          {/*TODO: Concertar handleChange*/}
          <Select 
            id="sexo"
            label="Sexo"
            options={['Masculino', 'Feminino']}
            value={sexo}
            onChange={({target}) => setSexo(target.value)}
            variant={variant}
            InputProps={{ readOnly }}
          />
          <MaskedInput
            id="CPF"
            label="CPF"
            value={form.CPF}
            mask="999.999.999-99"
            variant={variant}
            InputProps={{readOnly}}
            required
          />
          <MaskedInput
            id="RG"
            label="RG"
            value={form.RG}
            mask="99.999.999-9"
            variant={variant}
            InputProps={{readOnly}}
          />
        </div>
        <div className={'form-row'}>
          <Input
            className="grow"
            id="data_nascimento"
            label='Nascimento'
            type="date"
            value={form.data_nascimento}
            onChange={handleChange}
            InputProps={{ readOnly }}
            variant={variant}
          />
          <MaskedInput 
            id="telefone"
            label="Telefone"
            value={form.telefone}
            onChange={handleChange}
            placeholder="(00) 0000-0000"
            mask="(99) 9999-9999"
            maskChar=""
            InputProps={{ readOnly }}
            variant={variant}
          />
          <Input 
            id="email"
            label="Email"
            value={form.email}
            onChange={handleChange}
            placeholder="exemplo@email.com"
            InputProps={{ readOnly }}
            variant={variant}
            required
          />
        </div>
        <div className={'form-row'}>
          <Input 
            id="logradouro"
            label="Logradouro"
            value={form.logradouro}
            onChange={handleChange}
            variant={variant}
            InputProps={{ readOnly }}
          />
          <Input 
            id="numero"
            label="Número"
            type="number"
            value={form.numero}
            onChange={handleChange}
            variant={variant}
            InputProps={{ readOnly }}
          />
          <Input 
            id="complemento"
            label="Complemento"
            value={form.complemento}
            onChange={handleChange}
            InputProps={{ readOnly }}
            variant={variant}
          />
        </div>
        <div className={'form-row'}>
          <Input 
            id="bairro"
            label="Bairro"
            value={form.bairro}
            onChange={handleChange}
            InputProps={{ readOnly }}
            variant={variant}
          />
          <MaskedInput 
            id="cep"
            label="CEP"
            placeholder="00000-000"
            mask="99999-999"
            maskChar=""
            value={form.cep}
            onChange={handleChange}
            InputProps={{ readOnly }}
            variant={variant}
          />
          <Input 
            id="cidade"
            label="Cidade"
            value={form.cidade}
            onChange={handleChange}
            InputProps={{ readOnly }}
            variant={variant}
          />
          <Input 
            id="estado"
            label="Estado"
            value={form.estado}
            onChange={handleChange}
            InputProps={{ readOnly }}
            variant={variant}
          />
        </div>
      </form>      
      
    </Paper>
  )
}

export default PacienteCard;