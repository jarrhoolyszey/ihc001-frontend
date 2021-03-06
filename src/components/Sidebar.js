import React  from 'react';

import { makeStyles } from '@material-ui/styles';

import {
  Avatar,
  Typography,
} from '@material-ui/core';

import DefaultImage from 'imgs/default-profile-picture.png';

import { Context } from 'context/AuthContext';

import theme from 'themes/theme';


const useStyles = makeStyles({
  root: {
    backgroundColor: theme.palette.primaryDark,
    color: theme.palette.primaryText,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '250px',
    maxWidth: '250px',
    overflowY: 'auto',
    flexGrow: '1',
    
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

      '& .avatar-message': {
        textAlign: 'center',
      }
    },
  }
});

const Sidebar = ({ children }) => {
  const { nome } = React.useContext(Context).user;
  const css = useStyles();

  return (
    <div className={css.root}>
      <div className="avatar-wrapper">
        <Avatar className="avatar" src={DefaultImage} />
        <Typography className="avatar-message">Bem vindo, {nome}</Typography>
      </div>
      {children}
    </div>
  )
}

export default Sidebar;