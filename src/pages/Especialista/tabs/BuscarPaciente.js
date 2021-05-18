import React from 'react';

import {
  Typography, 
} from '@material-ui/core';


import BuscarPacienteForm from '../forms/BuscarPacienteForm';
import AlertDialog from 'components/AlertDialog';
import CadastroPaciente from '../forms/CadastroPaciente';


const BuscarPaciente = () => {
  const [open, setOpen] = React.useState(false);          // dialog box display
  const [showForm, setShowForm] = React.useState(false);  // CadastroPaciente form display control


  const toggleDialog = () => {
    setOpen(true);
  }


  // Alert Modal actions
  const handleOk = () => {
    console.log('handleOK!');
    setShowForm(true);
  }

  const handleCancel = () => {
    console.log('handleCancel!');
    setOpen(false);
  }


  if(!showForm) {
    return (
      <>
        <BuscarPacienteForm toggleDialog={toggleDialog} />

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
      </>
    );
  } else {
    return (
      <CadastroPaciente />
    )
  }
}

export default BuscarPaciente;