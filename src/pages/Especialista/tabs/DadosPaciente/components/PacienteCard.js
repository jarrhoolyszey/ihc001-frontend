import React from 'react';
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

import { PacienteContext } from 'context/PacienteCtx';

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
  const { pacienteState, pacienteDispatch } = React.useContext(PacienteContext);
  const { requesting, request } = useAxios();
  const css = useStyles();

  // form controls
  const [readOnly, setReadOnly] = React.useState(true);
  const variant = 'filled';

  // form fields
  const [sexo, setSexo] = React.useState(pacienteState.sexo);
  const [form, setForm] = React.useState({
    nome: pacienteState.nome,
    sobrenome: pacienteState.sobrenome,
    email: pacienteState.email,
    CPF: pacienteState.CPF,
    RG: pacienteState.RG,
    data_nascimento: formatDate(pacienteState.data_nascimento),
    telefone: pacienteState.telefone,
    
    logradouro: pacienteState.endereco.logradouro,
    numero: pacienteState.endereco.numero,
    complemento: pacienteState.endereco.complemento,
    cep: pacienteState.endereco.cep,
    estado: pacienteState.endereco.estado,
    cidade: pacienteState.endereco.cidade,
    bairro: pacienteState.endereco.bairro, 
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

  const handleAddCategory = () => {
    pacienteDispatch({type: 'ADD_CATEGORIA'});
  }

  const handleSubmit = async () => {
    let body = pacienteState;
    
    body.nome = form.nome;
    body.sobrenome = form.sobrenome;
    body.sexo = sexo;
    body.email = form.email;
    body.CPF = form.CPF;
    body.RG = form.RG;
    body.data_nascimento = form.data_nascimento;
    body.telefone = form.telefone;
    body.endereco.logradouro = form.logradouro;
    body.endereco.numero = form.numero;
    body.endereco.complemento = form.complemento;
    body.endereco.cep = form.cep;
    body.endereco.estado = form.estado;
    body.endereco.cidade = form.cidade;
    body.endereco.bairro = form.bairro; 

    const res = await request( ATUALIZAR_PACIENTE(pacienteState._id, body) );
    
    if(res.statusText === 'OK') {
      console.log(res.data);
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
        <Typography className="titulo" variant="subtitle2">CATEGORIAS DE {String(pacienteState.nome).toUpperCase()}:</Typography>   
      
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
        
        { 
          (pacienteState.categorias.length === 0) ?
          
          (<p>{'Sem nenhuma nota cadastrada =('}</p>) :
          
          pacienteState.categorias.map((categoria) => (
            <CategoryField  
              category={categoria} 
              edit={!readOnly}  
              id={categoria.id}
              key={categoria.id}
            />
          ))
        }
        
        <div className="notas-footer">
          <Button 
            color="primary" 
            variant="outlined"
            onClick={handleAddCategory}
          >
            Nova Categoria
          </Button>
        </div>
      </div>
            
    </Paper>
  )
}

export default PacienteCard;