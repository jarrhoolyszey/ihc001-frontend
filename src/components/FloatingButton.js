import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { IconButton } from '@material-ui/core';
import { EditOutlined } from '@material-ui/icons';

import theme from 'themes/theme';

const useStyles = makeStyles({
  root: {
    opacity: '75%',
    backgroundColor: theme.palette.tertiary,
    color: 'white',
    position: 'fixed',
    bottom: '45px',
    right: '25px',
    padding: '0px',
    margin: '0px',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    boxShadow: theme.boxShadow,
    
    '& :hover': {
      backgroundColor: theme.palette.tertiary,
      opacity: '100%',
    }
  }
})

const FloatingButton = () => {
  const css = useStyles();

  return (
    <IconButton 
      className={css.root}
      variant="contained"
    >
      <EditOutlined />
    </IconButton>
  )
}

export default FloatingButton;