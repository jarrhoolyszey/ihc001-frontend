import React from 'react';

import { makeStyles } from '@material-ui/styles';

import {
  Avatar,
  Typography,
} from '@material-ui/core';

import DefaultImage from '../img/default-profile-picture.png';

import theme from '../theme';


const useStyles = makeStyles({
  root: {
    backgroundColor: theme.palette.primaryDark,
    color: theme.palette.primaryText,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '250px',
    height: '100vh',
    
    '& .avatar-wrapper': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      padding: '30px 0',
      
      '& .avatar': {
        height: '100px',
        width: '100px',
        marginBottom: '20px',
      },
    },
  }
});


const Sidebar = (props) => {
  const css = useStyles();
  const { children } = props;
  
  return (
    <div className={css.root}>
      <div className="avatar-wrapper">
        <Avatar className="avatar" src={DefaultImage} />
        <Typography className="avatar-message">Bem vindo, mané</Typography>
      </div>
      {children}
    </div>
  )
}

export default Sidebar;