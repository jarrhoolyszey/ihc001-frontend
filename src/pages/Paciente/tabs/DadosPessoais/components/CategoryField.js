import React from 'react';

import { makeStyles } from '@material-ui/styles';

import { Typography } from '@material-ui/core';

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
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.palette.primaryLight,
      color: theme.palette.primaryText,
      width: '100%',
      padding: '5px 5px',

      '& p': {
        color: theme.palette.primaryText,
        fontSize: '1rem',
        padding: '10px',
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

const CategoryField = ({category}) => {
  const css = useStyles();

  return ( 
    <div className={css.root}>
      <div className="header">
        <Typography>{category.title}</Typography> 
      </div>
      <div className={'itens-wrapper'}>
        <table className="category-table">
          <thead className="table-header-wrapper">
            <tr>
              {
                category.columns.map((header, index) => (
                  <th key={`th-${index}`} col={index}>
                    <div className={'th-content-wrapper'}>
                      <Typography>{category.columns[index]}</Typography>
                    </div>
                  </th>
                ))
              }
            </tr>
          </thead>
          <tbody className="table-body-wrapper">
            {category.rows.map((row, rowIndex) => (
              <tr key={`row-${rowIndex}`} row={rowIndex}>
                {
                  row.map((cell, cellIndex) => (
                    <td key={`cell-${rowIndex}-${cellIndex}`}>
                      <Typography>{category.rows[rowIndex][cellIndex]} </Typography>
                    </td>
                  ))
                }
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CategoryField;