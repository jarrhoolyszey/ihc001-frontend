import React from 'react';

import { makeStyles } from '@material-ui/styles';

import {
  Paper,
  InputBase,
} from '@material-ui/core';

import {
  SearchRounded,
} from '@material-ui/icons';


const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '1rem',
    padding: '0px 10px',
    
    '& .search-input': {
      flexGrow: '1',
    }
  }
})


/*
 * Precisa de uma ref criada com creatRef() ou useRef() no componente pai.
 */
const SearchBar = React.forwardRef((props, ref) => {
  const { onChange, elevation, placeholder } = props;
  const css = useStyles();

  return (
    <Paper className={css.root} elevation={elevation}>
      <SearchRounded />
      <InputBase 
        className="search-input" 
        placeholder={placeholder || "Buscar..."}
        inputRef={ref}
        onChange={onChange}
      />
    </Paper>
  )
});

export default SearchBar;