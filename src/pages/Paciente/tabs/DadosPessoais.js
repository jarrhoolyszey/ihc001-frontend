import React from 'react';

import { makeStyles } from '@material-ui/styles';

import {
  Paper,
  Typography,
} from '@material-ui/core';

import CategoryCard from 'components/CategoryCard';

import theme from 'themes/theme';

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
  const classes = useStyles();

  const categories = [
    {
      title: 'alergias',
      items: [
        'proteina do leite',
        'iodo',
      ]
    },
    {
      title: 'Outras Alergias',
      items: [
        'Proteiina do Leite 2',
        'Iodo 2',
        'Outra qualquer ai'
      ]
    }
  ]

  return (
    <div className={classes.root}>
      <Paper className="category" elevation={3} square>
        <Typography className="category-title" variant={'subtitle1'}>Informações Pessoais:</Typography>
        <div className="category-fields">
          <Typography variant={'body2'}><span className='field-title'>Nome:</span></Typography>
          <Typography variant={'body2'}><span className='field-title'>CPF:</span></Typography>
          <Typography variant={'body2'}><span className='field-title'>RG:</span></Typography>
          <Typography variant={'body2'}><span className='field-title'>Data de nascimento:</span></Typography>
          <Typography variant={'body2'}><span className='field-title'>Sexo:</span></Typography>
          <Typography variant={'body2'}><span className='field-title'>Email:</span></Typography>
        </div>

        <Typography className="category-title" variant={'subtitle1'}>Endereço:</Typography>
        <div className="category-fields">
          <Typography variant={'body2'}>Logradouro, 10 - Complemento - CEP - Bairro - Cidade - Estado</Typography>
        </div>
      </Paper>

      {
        categories.map((categoria, index) => (
          <CategoryCard key={`${categoria}-${index}`}category={categoria} />
        ))
      }

    </div>
  );
}

export default DadosPessoais;