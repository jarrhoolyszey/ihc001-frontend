import React from 'react';

import {
  Button
} from '@material-ui/core';

import AtendimentoCard from './components/AtendimentoCard'; 
import SemAtendimentos from './components/SemAtendimentos';

import { PacienteContext } from 'context/PacienteCtx';
import { TabContext } from 'context/TabContext';

import useAxios from 'hooks/useAxios';

import {
  BUSCAR_ATENDIMENTOS_DO_PACIENTE,
} from 'services/api';


const HistoricoPaciente = () => {
  const { pacienteState } = React.useContext(PacienteContext);
  const { changeTab } = React.useContext(TabContext);
  const [ resultados, setResultados ] = React.useState([]);
  const { request } = useAxios();
  

  React.useEffect(() => {
    (async () => {
      try {
        const res = await request(BUSCAR_ATENDIMENTOS_DO_PACIENTE(pacienteState._id)); 

        if(res.status === 200) {
          setResultados(res.data);
        }

      } catch (err) {
        console.log(err);
      }  
    })()
  }, []);
  
  if(pacienteState.nome === '')
    return <h1>{'Sem paciente no momento =('}</h1>;
  else {
    if(resultados.length > 0) {
      return (
        <>
          <Button
            onClick={ () => changeTab(1) }
            variant="contained"
            color="primary"
            fullWidth
            style={{
              marginBottom: '20px',
            }}
          >
            Novo Atendimento
          </Button>

          {
            resultados.map( atendimento => (
              <AtendimentoCard key={atendimento._id} atendimento={atendimento}/>
            ))
          }
        </>
      )
    } else {
      return <SemAtendimentos nome={pacienteState.nome} />
    }
  }
  
     
  
   
  
}

export default HistoricoPaciente;