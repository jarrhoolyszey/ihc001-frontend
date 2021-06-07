import React from 'react';

import { makeStyles } from '@material-ui/styles';

import {
  Typography, 
} from '@material-ui/core';


import BuscarPacienteForm from './components/BuscarPacienteForm';
import AlertDialog from 'components/AlertDialog';
import CadastroPaciente from './components/CadastroPaciente';


const useStyles = makeStyles({
  root: {
    height: '100%',
    width: '100%',
    flex: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

const BuscarPaciente = () => {
  const [open, setOpen] = React.useState(false);          // dialog box display
  const [showForm, setShowForm] = React.useState(false);  // CadastroPaciente form display control
  const css = useStyles();

  const toggleDialog = () => {
    setOpen(true);
  }

  const toggleCadastrarForm = () => {
    setShowForm(true);
  }

  const closeCadastrarForm = () => {
    setShowForm(false);
  }


  // Alert Modal actions
  const handleOk = () => {
    setShowForm(true);
  }

  const handleCancel = () => {
    setOpen(false);
  }


  if(!showForm) {
    return (
      <div className={css.root}>
        <BuscarPacienteForm toggleDialog={toggleDialog} showForm={toggleCadastrarForm} />

        <AlertDialog
            open={open}
            okText={'Cadastrar'}
            cancelText={'Fechar'}
            handleOk={handleOk}
            handleCancel={handleCancel}
          >
            <Typography component={'span'}>{ 'O paciente não foi encontrado no banco de dados =(' }</Typography>
            <Typography component={'span'}>{ 'Deseja cadastrar agora?' }</Typography>
        </AlertDialog>
      </div>
    );
  } else {
    return (
      <CadastroPaciente close={closeCadastrarForm} />
    )
  }
}

export default BuscarPaciente;