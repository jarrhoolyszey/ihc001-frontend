import React from 'react';


const initialState = {
  title: "Titulo",
  columns: ['Coluna 1', 'Coluna 2'],
  rows: [
    ['(1, 1)', '(1,2)'],
    ['(2, 1)', '(2,2)']
  ]
}


function reducer(state, action) {

  switch(action.type){
    case 'ADD_ROW':
      return {...state, rows: [...state.rows, action.payload]}
    default:
      console.log('acao default...')
  }

  
}



const TesteReducer = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const handleClick = () => {
    dispatch({type: 'ADD_ROW', payload: ['(3,1)', '(3,2)'] });
  }

  return (
    <>
      <h1>TesteReducer:</h1>

      <ul>
        {
          state.rows.map((row, index) => (
            <li key={`Row-${index}`}>{
              row.map((item, index) => (
                <span key={`item-${index}`}>{item}</span>
              ))
            }</li>
          ))
        }
      </ul>


      <button
        onClick={handleClick}
      >
        AddRow
      </button>
    </>
  )
}

export default TesteReducer;