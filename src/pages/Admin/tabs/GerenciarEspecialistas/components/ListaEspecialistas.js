import React from 'react';

import { makeStyles } from '@material-ui/styles';

import useAxios from 'hooks/useAxios';

import { LISTAR_ESPECIALISTAS } from 'services/api';


const useStyles = makeStyles({
  root: {

  }
});

const ListaEspecialistas = (props) => {
  const { panel, index } = props;
  const [especialistas, setEspecialistas] = React.useState([]);
  const { requesting, request } = useAxios();
  const css = useStyles();

  React.useEffect(() => {
    ( async () => {
      const res = await request(LISTAR_ESPECIALISTAS());
      if(res.status === 200) {
        setEspecialistas(res.data);
      }  
    })()
  }, []);
  
  return (
    <div className={css.root} hidden={panel !== index}>
      <h1>Lista de Especialistas</h1>
      {
        especialistas.map( (especialista, idx) => (
          <p key={idx}>{especialista.nome}</p>
        ))
      }
    </div>
  )
}

export default ListaEspecialistas;