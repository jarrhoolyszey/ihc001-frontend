import React, { useContext, useEffect } from 'react';

import { makeStyles } from '@material-ui/styles';

import {
  Paper,
  TextField,
  Button,
  Typography
} from '@material-ui/core';

import { Context } from 'context/AuthContext';

import history from 'services/history';

import Logo from 'imgs/logo.png';

import theme from 'themes/theme';



const useStyles = makeStyles({
  root: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',

    '& .logo-wrapper': {
      paddingLeft: '30px',
      marginRight: '30px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',

      '& .logo': {
        width: '200px',
      }
    },

    '& .form-wrapper': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '30px',
      backgroundColor: theme.palette.primaryLight,
      color: theme.palette.primaryText,

      '& form': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '30px',

        '& input': {
          backgroundColor: theme.palette.primaryText,
          borderRadius: 'inherit',
        },

        '& .padded': {
          marginBottom: '10px',
        },

        '& button': {
          margin: '30px 0 10px 0',
          width: '100%',
          height: '50px',
          backgroundColor: theme.palette.tertiary,
        }
      }
    }
    
  }
})

const Login = () => {
  const { handleLogin, redirectByRole } = useContext(Context);
  const css = useStyles();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if(user) {
      const { permissao } = user;
      
      redirectByRole(permissao);
    }
  });

  function handleSubmit(e) {
    e.preventDefault();

    const emailEl = document.getElementById('email');
    const senhaEl = document.getElementById('senha');  

    const payload = {
      email: emailEl.value,
      senha: senhaEl.value,
    }

    emailEl.value = '';
    senhaEl.value = '';

    handleLogin(payload);
  }

  return (
    <div className={css.root}>
    
      <Paper className={css.wrapper} elevation={3}>
        <div className="logo-wrapper">
          <img className="logo" src={Logo} />
        </div>

        <div className="form-wrapper">
          <Typography variant={'h4'}>Login</Typography>
          <form className={css.loginForm} autoComplete="off" onSubmit={handleSubmit}>  
            <TextField id="email" className="input-field padded" label="Email" variant="filled" type="email" />        
            <TextField id="senha" className="input-field" label="Senha" variant="filled" type="password" />
            <Button variant="contained" color="primary" type="submit">Entrar</Button>
          </form>
          <Typography variant="body2">Esqueceu sua senha?</Typography>
        </div>
      </Paper>
    
    </div>
  )
}

export default Login;