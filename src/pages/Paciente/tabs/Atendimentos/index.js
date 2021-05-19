import React from 'react';

import { Typography } from '@material-ui/core';

import AtendimentoCard from './components/AtendimentoCard';

import { Context } from 'context/AuthContext';

import useAxios from 'hooks/useAxios';

import {
  BUSCAR_ATENDIMENTOS_DO_PACIENTE,
} from 'services/api';


const Atendimentos = () => {
  const { user } = React.useContext(Context);
  const [ atendimentos, setAtendimentos ] = React.useState([]);
  const { requesting, request } = useAxios();

  React.useEffect(() => {
    // Função anonima para executar tarefas que retornam Promises
    ( async () => {
      const res = await request(BUSCAR_ATENDIMENTOS_DO_PACIENTE(user._id));
      
      if(res.status === 200)
        setAtendimentos(res.data);
    })()
  }, []);

  if (requesting) {
    return <Typography>{'Buscando atendimentos ...'}</Typography>
  }

  if( atendimentos.length === 0 ) {
    return <Typography>{'Nenhum atendimento ainda =)'}</Typography>
  }
  
  return (
    <>{
      atendimentos.map((atendimento, idx) => (
        <AtendimentoCard atendimento={atendimento} key={idx} />
      ))
    }</>
  )
}


export default Atendimentos;