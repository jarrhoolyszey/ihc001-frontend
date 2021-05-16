import React from 'react';

import { makeStyles } from '@material-ui/styles';

import {
  Typography,
  IconButton,
  Button,
} from '@material-ui/core';

import {
  EditOutlined,
  RemoveCircleOutline,
  AddCircleOutline,
} from '@material-ui/icons';


import theme from 'themes/theme';



// useReducer ... 
const initialState = {
  title: "Titulo",
  columns: ['Coluna 1', 'Coluna 2'],
  rows: [
    ['(1, 1)', '(1,2)'],
    ['(2, 1)', '(2,2)']
  ]
}

function reducer(state, action) {
  const { type, payload } = action;
  
  if(type === 'UPDATE_TITLE') {
    return { ...state, title: payload.value };
  }
  if(type === 'UPDATE_HEADER') {
    let newColumns = state.columns.slice();
    newColumns.splice(payload.col, 1, payload.value);

    return { ...state, columns: newColumns };
  }
  if(type === 'ADD_ROW') { 
    let newRows = state.rows.slice();
    let newLine = [];

    for(let i=0; i<state.columns.length; i++)
      newLine[i] = '';

    newRows.push(newLine);

    return { ...state, rows: newRows };
  }
  if(type === 'DELETE_ROW') {
    let newRows = state.rows.slice();
    newRows.splice(payload.row, 1);

    return { ...state, rows: newRows };
  }
  if(type === 'UPDATE_ROW') {
    const row = action.payload.row;
    const col = action.payload.col;
    const value = action.payload.value;

    let newRows = state.rows.slice();
    newRows[row].splice(col, 1, value);

    return { ...state, rows: newRows };
  }
  if(type === 'DELETE_COLUMN') {
    let newColumns = state.columns.slice();
    newColumns.splice(payload.col, 1);

    let newRows = state.rows.slice();
    newRows.forEach(arr => {
      arr.splice(payload.col, 1);
      
      if(arr.length === 0)
        arr = null;
      
    })

    if(newColumns.length === 0) {
      newRows = [];
    }

    return { ...state, columns: newColumns, rows: newRows };
  } 
  if(type === 'ADD_COLUMN') {
    let newColumns = state.columns.slice();
    newColumns.push('');

    let newRows = state.rows.slice();
    newRows.forEach(arr => {
      arr.push('');
    })
    
    return { ...state, columns: newColumns, rows: newRows };
  }
}



const useStyles = makeStyles({
  root: {
    width: '100%',
    boxShadow: theme.boxShadow,
    borderRadius: '5px',
    overflow: 'hidden',

    '& .header': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.palette.primaryLight,
      color: theme.palette.primaryText,
      width: '100%',
      padding: '5px 5px',

      '& input': {
        backgroundColor: 'transparent',
        color:'white',
        fontWeight: 'bold',
        fontSize: '1rem',
        padding: '10px',
        border: 'none',
        outline: 'none',
      },

      '& button': {
        color: 'white',
        borderColor: 'white',
      }
    },

    '& .itens-wrapper': {
      overflowX: 'scroll',
      padding: '5px',

      '& table': {
        width: '100%',
        borderCollapse: 'collapse',
        borderRadius: '5px',
        textAlign: 'center',
        overflow: 'hidden',

        '& input': {
          height: '100%',
          width: '100%',
          backgroundColor: 'transparent',
          border: 'none',
          outline: 'none',
          padding: '10px',
        },

        '& input:focus': {
          border: `2px solid ${theme.palette.primary}`,
        },

        '& td:not(last-child), th:not(last-child)': {
          borderRight: '1px solid rgba(0, 0, 0, 0.15)',
        },

        '& thead': {
          backgroundColor: theme.palette.primaryLight,
            
          padding: '10px',
          '& th': {
            height: '40px',

            '& .th-content-wrapper': {
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              padding: '0px 10px',
            
              '& input': {
                color: theme.palette.primaryText,
                fontWeight: 'bold',
                textAlign: 'center',
              },
              
              '& button': {
                color: theme.palette.primaryText,
              },
            },
          },
        }, //fim thead
        '& tbody': {
          '& tr:nth-child(odd)': {
            backgroundColor: 'rgba(0, 0, 0, 0.10)',
          },

          '& tr:nth-child(even)': {
            backgroundColor: 'rgba(0, 0, 0, 0.03)',
          },
        }, // fim tbody

        '& tfoot': {
          '& tr': {
            height: '50px',
          }
        }, // fim tfoot
      }, // fim table
    }, // fim .itens-wrapper
  }
})

const CategoryField = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [edit, setEdit] = React.useState(false);
  const css = useStyles();


  const handleEditButton = () => {    
    if(!edit) {
      setEdit(true);
    } else {
      setEdit(false);
      console.log(state);
    }
  }

  const handleAddColumn = () => {
    dispatch({type: 'ADD_COLUMN'});
  }

  const handleDeleteColumn = ({target}) => {
    dispatch({type: 'DELETE_COLUMN', payload: {
      col: target.closest('th').getAttribute('col'),
    }});
  }

  const handleAddRow = () => {
    dispatch({type: 'ADD_ROW'});
  }

  const handleDeleteRow = ({target}) => {
    dispatch({type: 'DELETE_ROW', payload: {
      row: target.closest('tr').getAttribute('row'),
    }});
  }

  
  const handleTitleChange = ({target}) => {
    dispatch({type: 'UPDATE_TITLE', payload: {
      value: target.value,
    }});
  }
  
  const handleHeaderChange = ({target}) => {
    dispatch({type: 'UPDATE_HEADER', payload: {
      col: target.closest('th').getAttribute('col'),
      value: target.value,
    }})
  }

  const handleChange = ({target}) => {
    dispatch({type: 'UPDATE_ROW', payload: {
      col: target.getAttribute('col'),
      row: target.getAttribute('row'),
      value: target.value,
    }});
  }

  return ( 
    <div className={css.root}>
      <div className="header">
        <Typography>
          <input value={state.title} onChange={handleTitleChange} readOnly={!edit} />
        </Typography> 
        <Button 
          className="edit-button" 
          onClick={handleEditButton}
          startIcon={<EditOutlined />}
          variant="outlined"
          size="small"
        >
          Editar
        </Button>
      </div>
      <div className={'itens-wrapper'}>
        <table className="category-table">
          <thead className="table-header-wrapper">
            <tr>
              {
                state.columns.map((header, index) => (
                  <th key={`th-${index}`} col={index}>
                    <div className={'th-content-wrapper'}>
                      <input 
                        value={state.columns[index]} 
                        onChange={handleHeaderChange} 
                        readOnly={!edit}
                        autoComplete="off" 
                      />
                      { edit && <IconButton onClick={handleDeleteColumn} size="small"><RemoveCircleOutline /></IconButton> }
                    </div>
                  </th>
                ))
              }
              { edit && <th><IconButton onClick={handleAddColumn} size="small"><AddCircleOutline/></IconButton></th> }
            </tr>
          </thead>
          <tbody className="table-body-wrapper">
            {state.rows.map((row, rowIndex) => (
              <tr key={`row-${rowIndex}`} row={rowIndex}>
                {
                  row.map((cell, cellIndex) => (
                    <td key={`cell-${rowIndex}-${cellIndex}`}>
                      <input
                        id={`input-${rowIndex}-${cellIndex}`}
                        value={state.rows[rowIndex][cellIndex]} 
                        onChange={handleChange}
                        readOnly={!edit}
                        autoComplete="off"
                        row={rowIndex}
                        col={cellIndex}
                      />
                    </td>
                  ))
                }
                { edit && <td><IconButton onClick={handleDeleteRow} size="small"><RemoveCircleOutline /></IconButton></td> }
              </tr>
            ))}
          </tbody>
          {
            edit && (
            <tfoot>
              <tr>
                <td colSpan={'100%'} align={'center'}>
                  <Button
                    variant="outlined" 
                    onClick={handleAddRow} 
                    startIcon={<AddCircleOutline />}
                    size="small"
                  >
                    Add linha
                  </Button>
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  )
}

export default CategoryField;