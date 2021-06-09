import React from 'react';

import { makeStyles } from '@material-ui/styles';

import {
  ButtonGroup,
  Button,
} from '@material-ui/core';

import ListaEspecialistas from './components/ListaEspecialistas';
import CadastrarEspecialista from './components/CadastrarEspecialista';

import theme from 'themes/theme';


const useStyles = makeStyles({
  root: {
    padding: '20px 5%',
  },
  buttons: {
    boxShadow: theme.boxShadow,
    
    '& button': {
      borderRadius: '0',
    }
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
      <ButtonGroup className={css.buttons} variant="contained" color="primary" disableElevation>
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

      <ListaEspecialistas hidden={panel !== LISTAR_INDEX} />
      <CadastrarEspecialista hidden={panel !== CADASTRAR_INDEX} />
    </div>
  )
}

export default GerenciarEspecialistas;