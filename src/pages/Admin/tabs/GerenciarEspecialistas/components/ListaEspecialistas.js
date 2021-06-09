import React from 'react';

import { makeStyles } from '@material-ui/styles';

import {
  Paper,
  Typography,
  Button,
  IconButton,
  Avatar,
} from '@material-ui/core';

import { Refresh, EditOutlined, DeleteOutlined } from '@material-ui/icons';

import useAxios from 'hooks/useAxios';

import { LISTAR_ESPECIALISTAS } from 'services/api';

import theme from 'themes/theme';


const useStyles = makeStyles({
  root: {
    padding: '30px 20px',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid rgba(0, 0, 0, 0.125)',
    padding: '5px 0',
    marginBottom: '20px',
  },

  cardRoot: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '10px',
    marginBottom: '10px',
  },
  avatar: {
    height: '60px',
    width: '60px',
    marginRight: '10px',
  },
  dataWrapper: {
    paddingLeft: '10px',
    borderLeft: '1px solid rgba(0, 0, 0, 0.125)',
  },
  buttonsWrapper: {
    backgroundColor: 'blue',
    display: 'inline-block',
    height: '100%',
  }
});


const Card = ({ especialista: e }) => {
  const css = useStyles();
  
  return (
    <Paper className={css.cardRoot} elevation={2}>
      <Avatar className={css.avatar} />
      <div className={css.dataWrapper}>
        <Typography>{`${e.nome} ${e.sobrenome ? e.sobrenome : ''} `}</Typography>
        <Typography variant="caption" component={'p'}>{e.habilitacao && `Especialidade: ${e.habilitacao.especialidade}`}</Typography>
        { 
          e.habilitacao && 
          <Typography variant="caption" component={'p'}>
            {`${e.habilitacao.tipo} N°: ${e.habilitacao.numero}/${e.habilitacao.uf.toUpperCase()}`}
          </Typography> 
        }
        <Typography variant="caption" component={'p'}>Email: {e.email}</Typography>
        <Typography variant="caption" component={'p'}>Tel: {e.telefone}</Typography>
      </div>
      <div className={css.buttonsWrapper}>
        <IconButton  
          size="small"
        >
          <EditOutlined fontSize="small" />
        </IconButton>
        <IconButton 
          size="small"
        >
          <DeleteOutlined fontSize="small" />
        </IconButton>
      </div>
    </Paper>
  )
}


const ListaEspecialistas = ({ hidden }) => {
  const [especialistas, setEspecialistas] = React.useState([]);
  const { requesting, request } = useAxios();
  const css = useStyles();

  const buscarEspecialistas = async () => {
    const res = await request(LISTAR_ESPECIALISTAS());
    if(res.status === 200) {
      setEspecialistas(res.data);
    }
  }

  React.useEffect(() => {
    buscarEspecialistas();
  }, []);
  
  return (
    <Paper className={css.root} elevation={2} square hidden={hidden}>
      <div className={css.header}>
        <Typography variant="body2" style={{ color: theme.palette.primary }}>ESPECIALISTAS:</Typography>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          startIcon={ <Refresh /> }
          disabled={ requesting }
          onClick={ () => buscarEspecialistas() }
        >
          { !requesting ? 'Atualizar' : 'Atualizando...' }
        </Button>
      </div>
      {
        especialistas.map( (especialista, idx) => (
          <Card especialista={especialista} key={especialista._id}/>
        ))
      }
    </Paper>
  )
}

export default ListaEspecialistas;