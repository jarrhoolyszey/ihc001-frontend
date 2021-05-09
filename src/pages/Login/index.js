import React from 'react';


import {
  Paper,
  TextField,
  Button,
} from '@material-ui/core';


import useStyles from './style';


const Login2 = () => {
  const styles = useStyles();

  return (
    <Paper className={styles.wrapper} elevation={3}>
      <h1 className={styles.header}>Login</h1>
      <form className={styles.loginForm} noValidate autoComplete="off" fullWidth>  
        <TextField className={styles.inputField} id="email-field" label="Email" type="email" color="primary" />        
        <TextField className={styles.inputField} id="password-field" label="Senha" type="password" />
        <Button className={styles.loginButton} variant="contained" color="primary">Entrar</Button>
        <p className={styles.forgotPassword}>Esqueceu sua senha?</p>
      </form>
    </Paper>
  )
}

export default Login2;