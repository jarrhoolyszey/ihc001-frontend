import React, { useState, useContext } from 'react';
import dayjs from 'dayjs';

import { makeStyles } from '@material-ui/styles';

import {
  Paper,
  Avatar,
  Button,
  Typography,
} from '@material-ui/core';

import {
  EditOutlined,
  Save,
} from '@material-ui/icons';

import DefaultImage from 'imgs/default-profile-picture.png';

import Select from 'components/form/Select';
import Input from 'components/form/Input';
import MaskedInput from 'components/form/MaskedInput';
import CategoryField from './CategoryField';

import theme from 'themes/theme';

import { Context } from 'context/PacienteContext';

import useAxios from 'hooks/useAxios';
import {
  ATUALIZAR_PACIENTE,
} from 'services/api';


const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',

    '& .titulo-wrapper': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      backgroundColor: theme.palette.primaryLight,
      color: theme.palette.primaryText,
      padding: '10px',
      marginBottom: '20px',

      '& button': {
        color: 'inherit',
        borderColor: 'inherit',
      }
    }
  },

  dadosPessoaisWrapper: {
    display: 'flex',
    flexDireciton: 'row',
    padding: '0px 20px',
    marginBottom: '20px',
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
  },

  notasWrapper: {
    padding: '0px 20px',
    overflow: 'scroll',

    '& .notas-footer': {
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '10px 0px',
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
      <div  className="titulo-wrapper" >
        <Typography className="titulo" variant="subtitle2">DADOS PESSOAIS:</Typography>
        {
          readOnly ?
            <Button 
              color="primary" 
              variant="outlined"
              onClick={handleEditar}
              startIcon={<EditOutlined />}
            >
              Editar
            </Button>
            :
            <Button
              type="submit"
              color="primary"
              variant="outlined"
              onClick={handleSalvar}
              startIcon={<Save />}
            >
              { requesting ? 'Salvando...' : 'Salvar' }
            </Button>  
          }
      </div>
      
      <div className={css.dadosPessoaisWrapper}>
        <div className={css.avatarWrapper}>
          <Avatar className="avatar" src={DefaultImage}/> 
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
      </div>
      
      <div className="titulo-wrapper">
        <Typography className="titulo" variant="subtitle2">NOTAS SOBRE {String(paciente.nome).toUpperCase()}:</Typography>   
      
        {
          readOnly ?
            <Button 
              variant="outlined"
              onClick={handleEditar}
              startIcon={<EditOutlined />}
            >
              Editar
            </Button>
            :
            <Button
              variant="outlined"
              onClick={handleSalvar}
              startIcon={<Save />}
            >
              { requesting ? 'Salvando...' : 'Salvar' }
            </Button>  
          }
      </div>

      <div className={css.notasWrapper}>
        
        <CategoryField edit={!readOnly}/>
        
        <div className="notas-footer">
          <Button color="primary" variant="outlined">Nova Nota</Button>
        </div>
      </div>
            
    </Paper>
  )
}

export default PacienteCard;