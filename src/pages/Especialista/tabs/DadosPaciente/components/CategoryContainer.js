import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { 
  Paper,
  Typography,
  Button,
} from '@material-ui/core';

import { AddCircleOutline } from '@material-ui/icons';

import { PacienteContext } from 'context/PacienteCtx';

import SearchBar from 'components/SearchBar';
import CategoryField from './CategoryField';

import theme from 'themes/theme';


const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    maxWidth: '100%',
    marginBottom: '20px',

    '& .cc-header': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '5px 10px',
      backgroundColor: theme.palette.primaryLight,
      color: theme.palette.primaryText,
    },

    '& .cc-body': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      padding: '20px',

      '& div.category-wrapper': {
        width: '49%',
      },

      '@media(max-width: 800px)': {
        flexDirection: 'column',
        flexWrap: 'wrap',

        '& div.category-wrapper': {
          width: '100%',
        },
      }
    },

    '& .cc-footer': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '20px',
    },
  }
})

const CategoryContainer = (props) => {
  const { readOnly } = props;
  const { pacienteState: paciente, pacienteDispatch } = React.useContext(PacienteContext);
  const searchRef = React.useRef();
  const [results, setResults] = React.useState(paciente.categorias);
  const css = useStyles();

  React.useEffect(() => {
    setResults(paciente.categorias);
    searchRef.current.value = '';
  }, [paciente.categorias]);


  const searchFilter = (key) => {
    let result = paciente.categorias.filter((category) => {
      return category.title.toLowerCase().includes(key.toLowerCase());
    })

    return result;
  }

  const handleSearchChange = () => {
    setResults(searchFilter(searchRef.current.value));
  }

  const handleAddCategory = () => {
    pacienteDispatch({type: 'ADD_CATEGORIA'});
  }

  return (
    <Paper className={css.root}>
      <div className="cc-header">
        <Typography>Categorias</Typography>
        <SearchBar 
          ref={searchRef}
          onChange={handleSearchChange}
          placeholder={'Buscar categoria...'}
          elevation={0}  
        />
      </div>
      
      <div className="cc-body">
        {
          results.length === 0 ?
          ('Sem nenhuma categoria até o momento =(') :
        
          ( results.map((categoria) => (
            <CategoryField
              category={categoria} 
              id={categoria.id}
              edit={!readOnly}
              key={categoria.id}  
            />
          )))
        }
      </div>

      <div className="cc-footer">
        {
          !readOnly &&
          <Button 
            color="primary" 
            variant="outlined"
            onClick={handleAddCategory}
            startIcon={ <AddCircleOutline /> }
          >
            Nova Categoria
          </Button>
        }
      </div>
      
    </Paper>
  )
}

export default CategoryContainer;