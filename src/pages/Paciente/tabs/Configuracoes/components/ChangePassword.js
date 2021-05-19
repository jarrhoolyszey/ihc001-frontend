import React from 'react';

import { makeStyles } from '@material-ui/styles';

import {
  Paper,
  TextField,
  Button,
  Typography,
} from '@material-ui/core';

import { Context } from 'context/AuthContext';

import useAxios from 'hooks/useAxios';

import {
  MUDAR_SENHA,
} from 'services/api';

import theme from 'themes/theme';


const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    
    '& .header': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      padding: '0.5rem',
      backgroundColor: theme.palette.primaryLight,
      color: theme.palette.primaryText,
    },

    '& form': {
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      gap: '1rem',
      width: '400px',

      '& .message': {
        textAlign: 'center',
      },
    }
  }
})

const ChangePassword = () => {
  const { user } = React.useContext(Context);
  const [ message, setMessage ] = React.useState(null);
  const [ error, setError ] = React.useState(null);
  const [ form, setForm ] = React.useState({
    atual: '',
    nova: '',
    confirmar: '',
  });
  const { requesting, request } = useAxios();
  const css = useStyles();

  
  const validate = () => {
    setError(null);

    if( form.nova !== form.confirmar ) {
      setError("Confirmação da nova senha não confere");
      return false;
    }

    return true;
  }

  const handleChange = ({target}) => {
    if(error) {
      setError('');
      validate();
    }

    setForm({ ...form, [target.name]: target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if( !validate() ) return;

    const body = MUDAR_SENHA(user._id, form.atual, form.nova);
    console.log(body);
    const res = await request(body);
    console.log(res);
  
    // if(res.status === 200) {
    //   setMessage('Senha alterada com sucesso!');
    // } else {
    //   setError('Falha na alteração de senha!');
    // }

    setTimeout(() => { 
      setError(null);
      setMessage(null);
    }, 5000);
  }
  

  return (
    <Paper className={css.root} elevation={3}>
      <div className="header">
        <Typography>Alteração de Senha</Typography>
      </div>

      <form onSubmit={handleSubmit} autoComplete="off">
        <TextField
          name="atual"
          label="Senha atual"
          type="password"
          variant="filled"
          color="primary"
          value={form.atual}
          onChange={handleChange}
          required
        />
        <TextField
          name="nova"
          label="Nova senha"
          type="password"
          variant="filled"
          color="primary"
          value={form.nova}
          onChange={handleChange}
          required
        />
        <TextField
          name="confirmar"
          label="Confirmar nova senha"
          type="password"
          variant="filled"
          color="primary"
          value={form.confirmar}
          onChange={handleChange}
          onBlur={validate}
          required
        />

        { message && <Typography variant="caption" color="primary" className="message">{message}</Typography>}
        { error && <Typography variant="caption" color="secondary" className="message">{error}</Typography> }
        
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={ requesting }
        >
          {
            requesting ?
            'Mudando senha ...' :
            'Mudar Senha'
          }
        </Button>
      </form>
    </Paper>
  )
}

export default ChangePassword;