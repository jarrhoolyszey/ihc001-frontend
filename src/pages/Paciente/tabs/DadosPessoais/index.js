import React from 'react';
import dayjs from 'dayjs';

import { makeStyles } from '@material-ui/styles';

import {
  Paper,
  Typography,
} from '@material-ui/core';

import { Context } from 'context/AuthContext';

import CategoryField from './components/CategoryField';
import SearchBar from 'components/SearchBar';

import theme from 'themes/theme';


const useStyles = makeStyles({
  root: {
    height: '100vh',
    padding: '20px',
    
    '& .header': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.palette.primaryLight,
      color: theme.palette.primaryText,
      width: '100%',
      padding: '5px 5px',

      '& p': {
        color: theme.palette.primaryText,
        fontSize: '1rem',
        padding: '10px',
      },
    },

  
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
        },

        '& p': {
          padding: '0.25rem 0', 
        }
      },
    },
  },
  
});

const DadosPessoais = () => {
  const { user } = React.useContext(Context);
  const [ results, setResults ] = React.useState(user.categorias);
  const searchRef = React.useRef();
  const css = useStyles();

  function generateAddressString(endereco) {
    let str =  `${endereco.logradouro}, ${endereco.numero}`;
    
    if (endereco.complemento !== undefined) {
      str += ` - ${endereco.complemento}`;
    }

    str += ` - ${endereco.bairro}`;
    str += ` - ${endereco.cidade} - ${endereco.estado}`;
    str += ` - ${endereco.cep}`;
    
    return str;
  }

  const searchFilter = (key) => {
    let result = user.categorias.filter((category) => {
      return category.title.toLowerCase().includes(key.toLowerCase());
    })

    return result;
  }

  const handleSearchChange = () => {
    setResults(searchFilter(searchRef.current.value));
  }

  return (
    <div className={css.root}>
      <Paper className="category" elevation={3}>
        <Typography className="header" variant={'subtitle1'}>Informações Pessoais:</Typography>
        <div className="category-fields">
          <Typography variant={'body2'}><span className='field-title'>Nome:</span> {user.nome + ' ' + user.sobrenome}</Typography>
          <Typography variant={'body2'}><span className='field-title'>Sexo:</span> {user.sexo}</Typography>
          <Typography variant={'body2'}><span className='field-title'>CPF:</span> {user.CPF}</Typography>
          <Typography variant={'body2'}><span className='field-title'>RG:</span> {user.RG}</Typography>
          <Typography variant={'body2'}><span className='field-title'>Data de nascimento:</span> {dayjs(user.data_nascimento).format('DD/MM/YYYY')}</Typography>
          <Typography variant={'body2'}><span className='field-title'>Email:</span> {user.email}</Typography>
          <Typography variant={'body2'}>
            <span className='field-title'>Endereço: </span>
            { generateAddressString(user.endereco) }
          </Typography>
        </div>
      </Paper>

      <SearchBar 
        ref={searchRef}
        onChange={handleSearchChange}
        placeholder={'Buscar categoria...'}
        elevation={3} 
      />

      {        
        results.map((categoria) => (
          <CategoryField  
            category={categoria} 
            id={categoria.id}
            key={categoria.id}  
          />
        ))
      }
    </div>
  );
}

export default DadosPessoais;