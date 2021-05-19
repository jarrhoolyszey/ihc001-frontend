import React, { useContext } from 'react';

import { makeStyles } from '@material-ui/styles';

import { Button } from '@material-ui/core';

import { Context } from 'context/AuthContext';

import Logo from 'imgs/logo-bw.png';

import theme from 'themes/theme';


const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    minHeight: '56px',
    maxHeight: '56px',
    padding: '10px 20px',
    backgroundColor: theme.palette.primary,
    color: theme.palette.primaryText,

    '& #logo': {
      width: '50px',
    },

    '& button': {
      color: theme.palette.primaryText,
      borderColor: theme.palette.primaryText,
    }
  }
})

const Header = (props) => {
  const { handleLogout } = useContext(Context);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img id="logo" src={Logo} alt="logo" />
      
      <Button 
        variant="outlined" 
        onClick={handleLogout}
      >
      Sair
      </Button>
    </div>
  );
}

export default Header;