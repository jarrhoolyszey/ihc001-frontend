import React from 'react';

import { makeStyles } from '@material-ui/styles';

import {

} from '@material-ui/core';

import PacienteCard from './components/PacienteCard';


const useStyles = makeStyles({

});

const DadosPaciente = (props) => {
  return (
    <>
      <PacienteCard />
    </>
  )
}

export default DadosPaciente;