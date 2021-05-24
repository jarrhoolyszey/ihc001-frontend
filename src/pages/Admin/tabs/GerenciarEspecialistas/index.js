import React from 'react';

import { makeStyles } from '@material-ui/styles';

import {
  ButtonGroup,
  Button,
} from '@material-ui/core';

import ListaEspecialistas from './components/ListaEspecialistas';
import CadastrarEspecialista from './components/CadastrarEspecialista';

const useStyles = makeStyles({
  root: {

  }
});


const GerenciarEspecialistas = () => {
  const [panel, setPanel] = React.useState(0);
  const css = useStyles();

  // tabs
  const LISTAR_INDEX = 0;
  const CADASTRAR_INDEX = 1;
  
  const handleClick = (value) => {
    setPanel(value);
  }

  return (
    <div className={css.root}>
      <ButtonGroup>
        <Button 
          onClick={() => handleClick(LISTAR_INDEX)}
        >
          Listar
        </Button>
        <Button 
          onClick={() => handleClick(CADASTRAR_INDEX)}
        >
          Cadastrar
        </Button>
      </ButtonGroup>

      <ListaEspecialistas panel={panel} index={LISTAR_INDEX} />
      <CadastrarEspecialista panel={panel} index={CADASTRAR_INDEX} />
    </div>
  )
}

export default GerenciarEspecialistas;