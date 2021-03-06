import React from 'react';
import dayjs from 'dayjs';

import { makeStyles } from '@material-ui/styles';

import {
  Paper,
  Typography,
} from '@material-ui/core';

import { Context } from 'context/AuthContext';

import theme from 'themes/theme';


const useStyles = makeStyles({
  root: {
    marginBottom: '10px',
    overflow: 'hidden',
    
    '& .at-card-id-wrapper': {
      backgroundColor: theme.palette.primaryLight,
      padding: '0.25rem 20px',
      textAlign: 'end',
    },

    '& .at-card-header': {
      '& span': {
        fontWeight: 'bold',
      },

      display: 'flex',
      flexDirection: 'row',
      gap: '5rem',
      padding: '10px 0px',
      margin: '0 20px',
      borderBottom: '1px solid rgba(0,0,0,0.1)',
    },

    '& .at-card-diag': {
      margin: '0px 20px',
      padding: '20px 0px',
      borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
      
      '& span': {
        fontWeight: 'bold',
      }
    },

    '& .at-card-body': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      gap: '1rem',
      margin: '0px 20px',
      padding: '20px 0px',
      
      '& .at-card-list-wrapper': {
        overflow: 'hidden',
        flex: '1',

        '& .at-card-list-header': {
          backgroundColor: theme.palette.primaryLight,
          color: theme.palette.primaryText,
          textAlign: 'center',
          padding: '0.25rem 0px',
        },
        
        '& .at-card-list-body': {
          '& ul': {
            listStyle: 'none',
            padding: '0',
            margin: '0',
            
            '& li': {
              padding: '5px 10px',
            },
            '& li:nth-child(odd)': {
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
            },
            '& li:nth-child(even)': {
              backgroundColor: 'rgba(0, 0, 0, 0.01)',
            },
          },
        }
      }
    },
  }
})

const AtendimentoCard = ({atendimento}) => {
  const { user } = React.useContext(Context);
  const css = useStyles();
  
  return (
    <Paper className={css.root} elevation={3}>
      <div className="at-card-id-wrapper">
        <Typography variant="caption">ID: {atendimento._id}</Typography>
      </div>
      <div className="at-card-header">
        <Typography><span>Data In??cio: </span>{dayjs(atendimento.createdAt).format('DD/MM/YYYY')}</Typography>
        <Typography>
          <span>Especialista: </span>
          {
            (atendimento.especialistaId._id !== user._id) ?
            (atendimento.especialistaId.nome) :
            (`${atendimento.especialistaId.nome} (Eu)`)
          }</Typography>
      </div>
      <div className="at-card-diag">
        <Typography><span>Diagnostico: </span>{atendimento.diagnostico}</Typography>
      </div>
      <div className="at-card-body">
        <Paper className="at-card-list-wrapper">
          <div className="at-card-list-header">
            <Typography>Sintomas:</Typography>
          </div>
          <div className="at-card-list-body">
            <ul>
              {
                atendimento.sintomas.map((sintoma, idx) => (
                  <li key={`${sintoma}-${idx}`}>
                    {sintoma}
                  </li>
                ))
              }
            </ul>
          </div>
        </Paper>
        <Paper className="at-card-list-wrapper">
          <div className="at-card-list-header">
            <Typography>Prescri????es:</Typography>
          </div>
          <div className="at-card-list-body">
          <ul>
              {
                atendimento.prescricoes.map((prescricao, idx) => (
                  <li key={`${prescricao}-${idx}`}>
                    {prescricao}
                  </li>
                ))
              }
            </ul>
          </div>
        </Paper>
      </div>
    </Paper>

    
  )
}

export default AtendimentoCard;