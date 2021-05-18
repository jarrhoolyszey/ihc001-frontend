import React from 'react';

import { makeStyles } from '@material-ui/styles';

import AtendimentoCard from './components/AtendimentoCard'; 

import { PacienteContext } from 'context/PacienteCtx';

import useAxios from 'hooks/useAxios';

import {
  BUSCAR_ATENDIMENTOS_DO_PACIENTE,
} from 'services/api';

const useStyles = makeStyles({
  root: {
    border: 'dashed 1px black',
    height: '100%',
  }
});

const HistoricoPaciente = () => {
  const { pacienteState } = React.useContext(PacienteContext);
  const [ resultados, setResultados ] = React.useState([]);
  const { requesting, request } = useAxios();
  const css = useStyles();
  
  React.useEffect(() => {
    (async () => {
      try {
        const res = await request(BUSCAR_ATENDIMENTOS_DO_PACIENTE(pacienteState._id)); 

        if(res.status === 200) {
          setResultados(res.data);
          console.log(res.data);
        }

      } catch (err) {
        console.log(err);
      }  
    })()
  }, [pacienteState]);
  
  if(pacienteState.nome === '')
    return <h1>{'Sem paciente no momento =('}</h1>;
  else {
    if(resultados.length > 0) {
      return (
        resultados.map( atendimento => (
          <AtendimentoCard key={atendimento._id} atendimento={atendimento}/>
        ))
      )
    } else {
      return <h1>{`Sem nenhum atendimento para ${pacienteState.nome}`}</h1>
    }
  }
  
     
  
   
  
}

export default HistoricoPaciente;