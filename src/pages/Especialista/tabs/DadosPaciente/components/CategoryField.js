import React from 'react';

import { makeStyles } from '@material-ui/styles';

import {
  Typography,
  IconButton,
  Button,
} from '@material-ui/core';

import {
  RemoveCircleOutline,
  AddCircleOutline,
} from '@material-ui/icons';

import { PacienteContext } from 'context/PacienteCtx'; 

import theme from 'themes/theme';


const useStyles = makeStyles({
  root: {
    width: '100%',
    boxShadow: theme.boxShadow,
    borderRadius: '5px',
    overflow: 'hidden',
    marginBottom: '20px',

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

const CategoryField = ({category, edit, id}) => {
  const { pacienteDispatch } = React.useContext(PacienteContext);
  const css = useStyles();

  const handleDeleteCategory = () => {
    pacienteDispatch({type: 'DEL_CATEGORIA', payload: { id }});
  }

  const handleAddColumn = () => {
    pacienteDispatch({type: 'ADD_COLUNA', payload: { id }});
  }

  const handleDeleteColumn = ({target}) => {
    pacienteDispatch({type: 'DEL_COLUNA', payload: {
      id, col: target.closest('th').getAttribute('col'),
    }});
  }

  const handleAddRow = () => {
    pacienteDispatch({type: 'ADD_LINHA', payload: { id }});
  }

  const handleDeleteRow = ({target}) => {
    pacienteDispatch({type: 'DEL_LINHA', payload: {
      id, row: target.closest('tr').getAttribute('row'),
    }});
  }

  const handleTitleChange = ({target}) => {
    pacienteDispatch({type: 'UPDATE_TITULO', payload: {
      id, value: target.value,
    }});
  }
  
  const handleHeaderChange = ({target}) => {
    pacienteDispatch({type: 'UPDATE_HEADER', payload: {
      id,
      col: target.closest('th').getAttribute('col'),
      value: target.value,
    }})
  }

  const handleChange = ({target}) => {
    pacienteDispatch({type: 'UPDATE_ITEM', payload: {
      id,
      col: target.getAttribute('col'),
      row: target.getAttribute('row'),
      value: target.value,
    }});
  }

  return ( 
    <div className={`${css.root} category-wrapper`}>
      <div className="header">
        <Typography>
          <input value={category.title} onChange={handleTitleChange} readOnly={!edit} />
        </Typography> 
        { 
          edit &&
          <Button
            variant="contained"
            size="small"
            startIcon={<RemoveCircleOutline />}
            color="secondary"
            onClick={handleDeleteCategory}
          >
            Deletar
          </Button>
        }
      </div>
      <div className={'itens-wrapper'}>
        <table className="category-table">
          <thead className="table-header-wrapper">
            <tr>
              {
                category.columns.map((header, index) => (
                  <th key={`th-${index}`} col={index}>
                    <div className={'th-content-wrapper'}>
                      <input 
                        value={category.columns[index]} 
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
            {category.rows.map((row, rowIndex) => (
              <tr key={`row-${rowIndex}`} row={rowIndex}>
                {
                  row.map((cell, cellIndex) => (
                    <td key={`cell-${rowIndex}-${cellIndex}`}>
                      <input
                        value={category.rows[rowIndex][cellIndex]} 
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