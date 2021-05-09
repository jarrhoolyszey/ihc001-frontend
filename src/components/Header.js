import React from 'react';

import { makeStyles } from '@material-ui/styles';

import { Button } from '@material-ui/core';

import theme from 'themes/theme';


const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    minHeight: '56px',
    maxHeight: '56px',
    padding: '10px 20px',
    backgroundColor: theme.palette.primary,
    color: theme.palette.primaryText,

    '& button': {
      color: theme.palette.primaryText,
      borderColor: theme.palette.primaryText,
    }
  }
})

const Header = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button 
        variant="outlined" 
        onClick={props.onClick}
      >
      Sair
      </Button>
    </div>
  );
}

export default Header;