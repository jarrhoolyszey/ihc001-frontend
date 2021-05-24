import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { 
  Paper,
  Typography,
} from '@material-ui/core';

import SearchBar from './SearchBar';
import CategoryField from './CategoryField';

import theme from 'themes/theme';


const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
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
  }
})

const CategoryContainer = (props) => {
  const { categories } = props;
  const searchRef = React.useRef();
  const [results, setResults] = React.useState(categories);
  const css = useStyles();

  const searchFilter = (key) => {
    let result = categories.filter((category) => {
      return category.title.toLowerCase().includes(key.toLowerCase());
    })

    return result;
  }

  const handleSearchChange = () => {
    setResults(searchFilter(searchRef.current.value));
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
        results.map((categoria) => (
          <CategoryField  
            category={categoria} 
            id={categoria.id}
            key={categoria.id}  
          />
        ))
      }
      </div>
    </Paper>
  )
}

export default CategoryContainer;