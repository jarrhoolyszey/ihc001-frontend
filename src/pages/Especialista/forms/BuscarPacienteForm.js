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

import DefaultImage from 'imgs/default-profile-picture.png';
import Input from 'components/form/Input';
import MaskedInput from 'components/form/MaskedInput';


//import { Context } from 'context/PacienteContext';
import { PacienteContext } from 'context/PacienteCtx';
import { TabContext } from 'context/TabContext';

import useForm from 'hooks/useForm';
import useAxios from 'hooks/useAxios';

import {
  BUSCAR_PACIENTE,
} from 'services/api';


const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '380px',
    border: '1px dashed green',

    '& form': {
      display: 'flex',
      flexDirection: 'column',

      '& button': {
        marginTop: '20px',
      }
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
      marginRight: '10px',
    },

    '& .avatar': {
      width: '80px',
      height: '80px',
      marginBottom: '10px',
    }
  }
})


const BuscarPacienteForm = ({ toggleDialog }) => {
  const { pacienteDispatch } = React.useContext(PacienteContext);
  const { changeTab } = React.useContext(TabContext);
  const [resultado, setResultado] = React.useState([]);
  const { requesting, request } = useAxios();
  const CPF = useForm();
  const email = useForm();
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

  const handleSelectClick = (paciente) => {
    pacienteDispatch({type: 'SELECIONAR_PACIENTE', payload: { paciente } })
    changeTab(1); // tab de atendimento
  }


  return (
    <div className={css.root}>
      <Typography>Buscar paciente por:</Typography>
      <form onSubmit={handleSubmit}>
        <MaskedInput 
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
        {
          requesting ?
          <Button type="submit" variant="contained" color="primary" disabled>Buscando...</Button> :
          <Button type="submit" variant="contained" color="primary">Buscar</Button>
        }
      </form>
    
      <List className={css.listRoot}>
        { resultado.length > 0 && <Typography>Resultados:</Typography> }
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
                primary={`${paciente.nome} ${paciente.sobrenome}`}
                secondary={
                  <>
                    <Typography component={'span'}>CPF: {paciente.CPF}</Typography>
                    <Typography component={'span'}>RG: {paciente.RG}</Typography>
                    <Typography component={'span'}>Email: {paciente.email}</Typography>
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