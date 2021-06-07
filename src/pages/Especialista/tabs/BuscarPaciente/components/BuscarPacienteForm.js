import React from 'react';

import { makeStyles } from '@material-ui/styles';

import {
  List,
  ListItem,
  ListItemText,
  Avatar,
  Typography, 
  Button,
} from '@material-ui/core';

import {
  Add,
  Search,
} from '@material-ui/icons';

import DefaultImage from 'imgs/default-profile-picture.png';
import Input from 'components/form/Input';
import MaskedInput from 'components/form/MaskedInput';

import { PacienteContext } from 'context/PacienteCtx';
import { TabContext } from 'context/TabContext';

import useForm from 'hooks/useForm';
import useAxios from 'hooks/useAxios';

import {
  BUSCAR_PACIENTE,
} from 'services/api';

import theme from 'themes/theme';


const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '420px',
    padding: '40px 20px',
    margin: '0 auto',
    boxShadow: theme.boxShadow,

    '& form': {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',

      '& .bp-cpf': {
        marginBottom: '20px',
        marginTop: '20px',
      },
    }
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '20px 0',
    borderBottom: '1px solid rgba(0, 0, 0, 0.125)',

    '& button': {
      width: '49%',
    }
  },

  listRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',

    '& .result-title': {
      padding: '20px 0',
    }
  },
  listItem: {
    boxShadow: '0px 2px 5px 2px rgba(0,0,0,.25)',
    padding: '10px',

    '& .avatar-wrapper': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      paddingRight: '10px',
      marginRight: '20px',
      borderRight: '1px solid rgba(0, 0, 0, 0.125)',
    },

    '& .avatar': {
      width: '80px',
      height: '80px',
      marginBottom: '10px',
    }
  }
})


const BuscarPacienteForm = ({ toggleDialog, showForm }) => {
  const { pacienteDispatch } = React.useContext(PacienteContext);
  const { changeTab } = React.useContext(TabContext);
  const [ resultado, setResultado ] = React.useState([]);
  const { requesting, request } = useAxios();
  const CPF = useForm('cpf');
  const email = useForm('email');
  const css = useStyles();


  const handleSubmit = async (e) => {
    e.preventDefault();

    const query = {
      CPF: CPF.value,
      email: email.value,
    }

    const {data} = await request(BUSCAR_PACIENTE(query));
    
    if(data.length > 0) {
      setResultado(data);
    } else {
      toggleDialog(true);
    }
  }

  const handleCadastrar = (e) => {
    e.preventDefault();

    showForm();
  }

  const handleSelectClick = (paciente) => {
    pacienteDispatch({type: 'SELECIONAR_PACIENTE', payload: { paciente } })
    changeTab(3); // tab Historico
  }


  return (
    <div className={css.root}>
      <Typography>Buscar paciente por:</Typography>
      <form onSubmit={handleSubmit}>
        <MaskedInput
          className="bp-cpf"
          id="buscar-cpf"
          type="text"
          mask="999.999.999-99"
          maskChar=""
          label="CPF"
          variant="filled"
          {...CPF}
        />
        <Input 
          id="buscar-email"
          type="email"
          label="Email"
          variant="filled"
          {...email}
        />
        
        <div className={css.buttons}>
          {
            requesting ?
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              startIcon={ <Search /> } 
              disabled
            >
              Buscando...
            </Button> :
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              startIcon={ <Search /> }
            >
              Buscar
            </Button>
          }
          <Button 
            id="cadastro-btn"
            variant="outlined"
            color="primary"
            startIcon={ <Add /> }
            onClick={ handleCadastrar }
          >
            Cadastrar
          </Button>
        </div>
      </form>
    
      <List className={css.listRoot}>
        { resultado.length > 0 && <Typography className="result-title">Resultados:</Typography> }
        {
          resultado.map((paciente) => (
            
            <ListItem key={paciente._id} className={css.listItem}>
              <div className={"avatar-wrapper"}>
                <Avatar
                  className="avatar" 
                  alt={paciente.nome}
                  src={DefaultImage}
                />
                <Button 
                  variant="outlined" 
                  color="primary"
                  onClick={ () => handleSelectClick(paciente) }
                >
                  Selecionar
                </Button>
              </div>
              <ListItemText 
                primary={
                  <Typography style={{marginBottom: '10px', fontWeight: 'bold'}}>
                    {`${paciente.nome} ${paciente.sobrenome}`}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography component={'span'} variant="body2">CPF: {paciente.CPF}</Typography><br/>
                    <Typography component={'span'} variant="body2">RG: {paciente.RG}</Typography><br/>
                    <Typography component={'span'} variant="body2">Email: {paciente.email}</Typography>
                  </>
                }
              />
            </ListItem>
            
          ))
        }
      </List>
    </div>
  )
}

export default BuscarPacienteForm;