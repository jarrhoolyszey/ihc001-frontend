import React from 'react';
import { v4 as uuid } from 'uuid';

const PacienteContext = React.createContext();


const initialState = {
  _id: '',
  nome: '',
  sobrenome: '',
  sexo: '',
  email: '',
  CPF: '',
  RG: '',
  data_nascimento: '',
  telefone: '',
  endereco: {
    logradouro: '',
    numero: '',
    complemento: '',
    cep: '',
    estado: '',
    cidade: '',
    bairro: '', 
  },
  categorias: [],
}



const reducer = (state, action) => {
  const { type, payload } = action;

  /********** HELPER FUNCTIONS  **********/
  const getCategoryById = (id) => {
    let ret = null;
    let len = state.categorias.length;
    let i = 0;

    for(i=0; i < len; i++) {
      if(state.categorias[i].id === id){
        ret = state.categorias[i];
        break;
      }
    }

    return { category: ret, index: i };
  }


  if(type === 'SELECIONAR_PACIENTE') {
    return payload.paciente;
  }

  /******************** CRUD CATEGORIAS ********************/
  if(type === 'ADD_CATEGORIA') {
    let newCategorias = state.categorias.slice();
    newCategorias.push({
      id: uuid(),
      title: 'Nova Categoria',
      columns: ['Nova Coluna'],
      rows: [['Nova Linha']],
    })
    return { ...state, categorias: newCategorias };
  }
  if(type === 'DEL_CATEGORIA') {
    let { category, index } = getCategoryById(payload.id);

    let newCategorias = state.categorias.slice();
    newCategorias.splice(index, 1);

    return { ...state, categorias: newCategorias };
  }

  /**************** CRUD ITENS DA CATEGORIA ****************/
  if(type === 'ADD_COLUNA') {
    let { category, index } = getCategoryById(payload.id);

    category.columns.push('');
    category.rows.forEach(row => {
      row.push('');
    })

    let newCategorias = state.categorias.slice();
    newCategorias.splice(index, 1, category);

    return { ...state, categorias: newCategorias };
  }
  if(type === 'DEL_COLUNA') {
    let { category, index } = getCategoryById(payload.id);
    
    category.columns.splice(payload.col, 1);
    category.rows.forEach(row => {
      row.splice(payload.col, 1);

      if(row.length === 0)
        row = null;
    })

    if(category.columns.length === 0)
      category.rows = [];

    let newCategorias = state.categorias.slice();
    newCategorias.splice(index, 1, category);

    return { ...state, categorias: newCategorias };
  }
  if(type === 'ADD_LINHA') { 
    let { category, index } = getCategoryById(payload.id);
    
    let newLine = []
    for(let i=0; i<category.columns.length; i++)
      newLine[i] = '';

    category.rows.push(newLine);
    
    let newCategorias = state.categorias.slice();
    newCategorias.splice(index, 1, category);

    return { ...state, categorias: newCategorias };
  }
  if(type === 'DEL_LINHA') {
    let { category, index } = getCategoryById(payload.id);

    category.rows.splice(payload.row, 1);

    let newCategorias = state.categorias.slice();
    newCategorias.splice(index, 1, category);
    
    return { ...state, categorias: newCategorias };
  }
  if(type === 'UPDATE_TITULO') {
    let { category, index } = getCategoryById(payload.id);

    category.title = payload.value;

    let newCategorias = state.categorias.slice();
    newCategorias.splice(index, 1, category);
    
    return { ...state, categorias: newCategorias };
  }
  if(type === 'UPDATE_HEADER') {
    let { category, index } = getCategoryById(payload.id);

    category.columns.splice(payload.col, 1, payload.value);

    let newCategorias = state.categorias.slice();
    newCategorias.splice(index, 1, category);

    return { ...state, categorias: newCategorias };
  }
  if(type === 'UPDATE_ITEM') {
    let { category, index } = getCategoryById(payload.id);
    const row = payload.row;
    const col = payload.col;
    const value = payload.value;

    category.rows[row].splice(col, 1, value);

    let newCategorias = state.categorias.slice();
    newCategorias.splice(index, 1, category);

    return { ...state, categorias: newCategorias };
  }
}


function PacienteProvider ({children}) {
  const [state, dispatch] = React.useReducer(reducer, initialState);  
  

  return (
    <PacienteContext.Provider value={{
      pacienteState: state,
      pacienteDispatch: dispatch
    }}>
      {children}
    </PacienteContext.Provider>
  )
}

export { PacienteContext, PacienteProvider }