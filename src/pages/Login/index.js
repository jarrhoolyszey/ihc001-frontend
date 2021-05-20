import React from 'react';

import { makeStyles } from '@material-ui/styles';

import {
  Paper,
  TextField,
  Button,
  Typography
} from '@material-ui/core';

import { Context } from 'context/AuthContext';

import Logo from 'imgs/logo.png';
import BgImage from 'imgs/login-bg.png';

import theme from 'themes/theme';


const useStyles = makeStyles({
  root: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    
    backgroundImage: `url(${BgImage})`,
    backgroundPosition: 'center', 
    backgroundSize: 'cover', 
    backgroundRepeat: 'no-repeat',
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
          margin: '0px 0 10px 0',
          width: '100%',
          height: '50px',
          backgroundColor: theme.palette.tertiary,
        },

        '& button:disabled': {
          color: theme.palette.primaryText,
        },
        
        '& #message-div': {
          textAlign: 'center',
          width: '100%',
          padding: '10px 0 20px 0',
        }
      }
    }
    
  }
})

const Login = () => {
  const { error, requesting, handleLogin, redirectByRole } = React.useContext(Context);
  
  const [ form, setForm ] = React.useState({
    email: '',
    senha: '',
  });
  const css = useStyles();

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if(user) {
      const { permissao } = user;
      
      redirectByRole(permissao);
    }
  });


  const handleChange = ({target}) => {
    setForm({ ...form, [target.id]: target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();  
    
    handleLogin(form.email, form.senha);
  }

  return (
    <div className={css.root}>
    
      <Paper className={css.wrapper} elevation={10}>
        <div className="logo-wrapper">
          <img className="logo" src={Logo} alt="logo"/>
        </div>

        <div className="form-wrapper">
          <Typography variant={'h4'}>Login</Typography>
          
          <form className={css.loginForm} autoComplete="off" onSubmit={handleSubmit}>  
            <TextField 
              id="email" 
              className="input-field padded" 
              label="Email" 
              variant="filled" 
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
         
            <TextField
              id="senha"
              className="input-field padded" 
              label="Senha" 
              variant="filled" 
              type="password"
              value={form.senha}
              onChange={handleChange}
              required
            />
            
            { 
              error && (              
                <div id="message-div">
                  <Typography variant='caption'>{error}</Typography>
                </div>    
              )
            }

            <Button 
              variant="contained" 
              color="primary" 
              type="submit"
              disabled={requesting}
            >
              { requesting ? 'Entrando...' : 'Entrar' }
            </Button>
          </form>
          <Typography variant="body2">Esqueceu sua senha?</Typography>
        </div>
      </Paper>
    
    </div>
  )
}

export default Login;