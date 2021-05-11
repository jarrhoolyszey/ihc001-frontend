import React, { useContext } from 'react';

import { makeStyles } from '@material-ui/styles';

import {
  Paper,
  Typography,
} from '@material-ui/core';

import { Context } from 'context/AuthContext';

import CategoryCard from 'components/CategoryCard';

import theme from 'themes/theme';

import paciente from 'testes/paciente';


const useStyles = makeStyles({
  root: {
    height: '100vh',
    padding: '20px',
    overflowY: 'scroll',
  
    '& .category': {
      marginBottom: '20px',
      overflow: 'hidden',
    
      '& .category-title': {
        textAlign: 'center',
        width: '100%',
        color: theme.palette.primaryText,
        backgroundColor: theme.palette.primaryLight,
      },

      '& .category-fields': {
        padding: "10px 20px",
        
        '& .field-title': {
          fontWeight: 'bold',
        }
      }
    },
  },
  
});


const DadosPessoais = () => {
  const css = useStyles();
  let { user } = useContext(Context);

  user = paciente;

  function generateAddressString(endereco) {
    let str =  `${endereco.logradouro}, ${endereco.numero}`;
    
    if (endereco.complemento) {
      str += ` - ${endereco.complemento}`;
    }

    str += ` - ${endereco.CEP} - ${endereco.bairro}`;
    str += ` - ${endereco.cidade} - ${endereco.estado}`;
    
    return str;
  }

  return (
    <div className={css.root}>
      <Paper className="category" elevation={3} square>
        <Typography className="category-title" variant={'subtitle1'}>Informações Pessoais:</Typography>
        <div className="category-fields">
          <Typography variant={'body2'}><span className='field-title'>Nome:</span> {user.nome + ' ' + user.sobrenome}</Typography>
          <Typography variant={'body2'}><span className='field-title'>Sexo:</span> {user.sexo}</Typography>
          <Typography variant={'body2'}><span className='field-title'>CPF:</span> {user.CPF}</Typography>
          <Typography variant={'body2'}><span className='field-title'>RG:</span> {user.RG}</Typography>
          <Typography variant={'body2'}><span className='field-title'>Data de nascimento:</span> {user.data_nascimento}</Typography>
          <Typography variant={'body2'}><span className='field-title'>Email:</span> {user.email}</Typography>
        </div>

        <Typography className="category-title" variant={'subtitle1'}>Endereço:</Typography>
        <div className="category-fields">
          <Typography variant={'body2'}>
            { generateAddressString(user.endereco) }
          </Typography>
        </div>
      </Paper>

      {
        /* Lista as categorias do 'user' e seus itens */
        user.categorias.map((categoria, index) => (
          <CategoryCard key={`${categoria}-${index}`}category={categoria} />
        ))
      }

    </div>
  );
}

export default DadosPessoais;