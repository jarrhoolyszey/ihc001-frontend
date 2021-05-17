import React from 'react';

import { PacienteContext } from 'context/PacienteCtx';
import { Context } from 'context/AuthContext'; 


const AtendimentoCtx = React.createContext();

const reducer = (state, action) => {
  const { type, payload } = action;

  /******************** CRUD SINTOMAS ********************/
  if(type === 'ADD_SINTOMA') {
    let newSintomas = state.sintomas.slice();
    newSintomas.push(payload.sintoma);

    return { ...state, sintomas: newSintomas };
  }
  if(type === 'DEL_SINTOMA') {
    let newSintomas = state.sintomas.slice();
    newSintomas.splice(payload.index, 1);

    return { ...state, sintomas: newSintomas };
  }

  /********************* CRUD EXAMES *********************/
  if(type === 'ADD_EXAME') {
    let newExames = state.exames.slice();
    newExames.push({
      tipo: '',
      estado: 'Em aberto',
      resultado: '',
    });

    return { ...state, exames: newExames };
  }
  if(type === 'DEL_EXAME') {
    let newExames = state.exames.slice();
    newExames.splice(payload.row, 1);

    return { ...state, exames: newExames };
  }
  if(type === 'UPDATE_ITEM') {
    let newExames = state.exames.slice();
    
    newExames[payload.row][payload.key] = payload.value;

    return { ...state, exames: newExames };
  }

  /****************** CRUD DIAGNOSTICO *******************/
  if(type === 'UPDATE_DIAGNOSTICO') {
    return { ...state, diagnostico: payload.value };
  }

  /****************** CRUD PRESCRIÇÕES *******************/
  if(type === 'ADD_PRESC') {
    let newPrescricoes = state.prescricoes.slice();
    newPrescricoes.push(payload.value);

    return { ...state, prescricoes: newPrescricoes };
  }
  if(type === 'DEL_PRESC') {
    let newPrescricoes = state.prescricoes.slice();
    newPrescricoes.splice(payload.index, 1);

    return { ...state, prescricoes: newPrescricoes };
  }
} 



function AtendimentoProvider({children}) {
  const { pacienteState } =  React.useContext(PacienteContext);
  const { user } = React.useContext(Context);
  const initialState = {
    sintomas: [],
    exames:[],
    prescricoes: [],
    // Exemplo: item do exames
    // exames: {
    //   tipo: 'Raio-X',
    //   estado: 'Concluido',
    //   resultado: 'Osso do dedinho do pé quebrado',
    // },
  };

  const [ state, dispatch ] = React.useReducer(reducer, initialState);

  return (
    <AtendimentoCtx.Provider value={{
      atendimentoState: state,
      atendimentoDispatch: dispatch,
    }}>
      {children}
    </AtendimentoCtx.Provider>
  )
}

export { AtendimentoCtx, AtendimentoProvider };