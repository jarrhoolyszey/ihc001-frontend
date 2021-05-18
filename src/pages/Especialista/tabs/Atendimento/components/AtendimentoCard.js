import React from 'react';

import { makeStyles } from '@material-ui/styles';
import {
  Paper,
  Typography,
  Button,
  IconButton,
} from '@material-ui/core';
import {
  AddCircleOutline,
  RemoveCircleOutline,
  AssignmentTurnedIn,
} from '@material-ui/icons';

import Input from 'components/form/Input';

import useAxios from 'hooks/useAxios';

import {
  CADASTRAR_ATENDIMENTO,
} from 'services/api';

import { PacienteContext } from 'context/PacienteCtx';
import { AtendimentoCtx } from 'context/AtendimentoCtx';
import { TabContext } from 'context/TabContext';

import theme from 'themes/theme';


const useStyles = makeStyles({
  paper: {
    marginBottom: '20px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },

  header : {
    width: '100%',
    backgroundColor: theme.palette.primaryLight,
    height: '2.5rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.primaryText,
  },
  
  sintomas: {
    '& .at-sintomas-body': {
      flex: '1',

      '& .at-sintomas-list': {
        margin: '0',
        padding: '0',
        listStyle: 'none',

        '& li:nth-child(odd)': {
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
        },
        
        '& li:nth-child(even)': {
          backgroundColor: 'rgba(0, 0, 0, 0.01)',
        },

        '& .at-sintomas-item': {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 20px',
        },
      },
    },
    '& .at-sintomas-footer' : {
      display: 'flex',
      flexDirection: 'row',
      padding: '10px',
      borderTop: '1px solid rgba(0, 0, 0, 0.2)'
    }
  },

  exames: {
    '& .at-exames-body': {
      padding: '10px',
      overflowX: 'auto',

      '& table': {
        width: '100%',
        borderCollapse: 'collapse',

        '& input, select': {
          outline: 'none',
          border: 'none',
          height: '100%',
          width: '100%',
          padding: '5px 10px',
          backgroundColor: 'transparent',
        },
        
        '& tbody tr:nth-child(odd)': {
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
        },
        '& tbody tr:nth-child(even)': {
          backgroundColor: 'rgba(0, 0, 0, 0.01)',
        },

        '& th': {
          backgroundColor: theme.palette.primaryLight,
          color: theme.palette.primaryText,
          height: '2rem',
        },

        '& td': {
          height: '2rem',
          borderRight: '1px solid rgba(0, 0, 0, 0.1)',
          borderLeft: '1px solid rgba(0, 0, 0, 0.1)',
        }
      }
    },

    '& .at-exames-footer': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '10px',
      borderTop: '1px solid rgba(0, 0, 0, 0.2)',
    },
  },

  diagnostico: {
    '& .at-diag-body': {
      padding: '10px',
    }
  },

  prescricoes: {
    '& .at-presc-body': {
      flex: '1',

      '& .at-prescs-list': {
        margin: '0',
        padding: '0',
        listStyle: 'none',

        '& li:nth-child(odd)': {
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
        },
        
        '& li:nth-child(even)': {
          backgroundColor: 'rgba(0, 0, 0, 0.01)',
        },

        '& .at-presc-item': {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 20px',
        },
      },
    },
    '& .at-presc-footer' : {
      display: 'flex',
      flexDirection: 'row',
      padding: '10px',
      borderTop: '1px solid rgba(0, 0, 0, 0.2)'
    }
  },

  bottomButtons: {
    display: 'flex',
    felxDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

const AtendimentoCard = () => {
  const { atendimentoState, atendimentoDispatch, getAtendimentoData } = React.useContext(AtendimentoCtx);
  const { changeTab } = React.useContext(TabContext);
  const { pacienteDispatch } = React.useContext(PacienteContext);
  const [ sintoma, setSintoma ] = React.useState(''); // input field
  const [ prescricao, setPrescricao ] = React.useState('');
  const { requesting, request } = useAxios();
  const css = useStyles();


  const handleEncerrarAtendimento = async () => {
    const res = await request(CADASTRAR_ATENDIMENTO(getAtendimentoData()));
    
    if(res.status === 200) {
      atendimentoDispatch({type: 'UNSELECT_ATENDIMENTO'});
      pacienteDispatch({type: 'UNSELECT_PACIENTE'});
      changeTab(0); // Buscar Paciente
    }
  }

  const handleAddSintoma = () => {
    if( sintoma.length === 0 ) return;

    atendimentoDispatch({
      type: 'ADD_SINTOMA',
      payload: { sintoma },
    });

    setSintoma('');
  }

  const handleDelSintoma = ({target}) => {
    atendimentoDispatch({
      type: 'DEL_SINTOMA',
      payload: { 
        index: target.closest('li').getAttribute('index'),
      }
    })
  }

  const handleAddExame = () => {
    atendimentoDispatch({type: 'ADD_EXAME'});
  }

  const handleDelExame = ({target}) => {
    atendimentoDispatch({
      type: 'DEL_EXAME',
      payload: {
        row: target.closest('tr').getAttribute('row'),
      }
    })
  }

  const handleTableChange = ({target}) => {
    atendimentoDispatch({
      type: 'UPDATE_ITEM',
      payload: {
        row: target.getAttribute('row'),
        key: target.name,
        value: target.value,
      }
    });
  }

  const handleEditDiagnostico = ({target}) => {
    atendimentoDispatch({
      type: 'UPDATE_DIAGNOSTICO',
      payload: { value: target.value }
    });
  }

  const handleAddPresc = () => {
    if( prescricao === '') return;

    atendimentoDispatch({
      type: 'ADD_PRESC',
      payload: {
        value: prescricao,
      }
    });

    setPrescricao('');
  }

  const handleDelPresc = ({target}) => {
    atendimentoDispatch({
      type: 'DEL_PRESC',
      payload: {
        index: target.closest('li').getAttribute('index'),
      }
    })
  }

  return (
    <>
      <Paper className={`${css.sintomas} ${css.paper}`} elevation={3}>
        <div className={css.header}>
          <Typography>{'Sintomas:'}</Typography>
        </div> {/* Fim .sintomas-header */}
        <div className="at-sintomas-body">  
          <ul className="at-sintomas-list">
          {
            atendimentoState.sintomas.map((sintoma, idx) => (
              <li key={`sint-${idx}`} index={idx}>
                <div className="at-sintomas-item">
                  {sintoma}
                  <IconButton 
                    size='small'
                    onClick={handleDelSintoma}
                  >
                    <RemoveCircleOutline />
                  </IconButton>  
                </div>
              </li>
            ))
          }
          </ul>
        </div> {/* Fim .sintomas-body */}
        <div className="at-sintomas-footer">
          <Input 
            placeholder="Descrever sintoma..."
            variant="outlined"
            size="small"
            value={sintoma}
            onChange={ ({target}) => setSintoma(target.value) }
            fullWidth
          />
          <Button 
            startIcon={<AddCircleOutline />} 
            variant="outlined"
            color="primary"
            onClick={handleAddSintoma}
          >
            Add
          </Button>
        </div> {/* Fim .sintomas-footer */} 
      </Paper>

      <Paper className={`${css.exames} ${css.paper}`} elevation={3}>
        <div className={css.header}>
          <Typography>Exames:</Typography>
        </div>
        <div className="at-exames-body">
          <table>
            <thead>
              <tr>
                <th>Exame</th>
                <th>Situação</th>
                <th>Resultado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                atendimentoState.exames.map( (exame, row) => (
                  <tr key={`exames-table-row-${row}`} row={row}>
                    <td>
                      <input 
                        type="text" 
                        value={atendimentoState.exames[row].tipo}
                        onChange={handleTableChange}
                        name="tipo"
                        col={0}
                        row={row}
                      />    
                    </td>
                    <td>
                      <select
                        value={atendimentoState.exames[row].estado}
                        onChange={handleTableChange}
                        name="estado"
                        col={1}
                        row={row}
                      >
                        <option value="Em aberto">Em aberto</option>
                        <option value="Concluido">Concluido</option>
                        <option value="Cancelado">Cancelado</option>
                      </select>
                    </td>
                    <td>
                      <input 
                        type="text" 
                        value={atendimentoState.exames[row].resultado}
                        onChange={handleTableChange}
                        name="resultado"
                        col={2}
                        row={row}
                      />
                    </td>
                    <td>
                      <IconButton 
                        size="small"
                        onClick={handleDelExame}
                      >
                        <RemoveCircleOutline />
                      </IconButton>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        <div className="at-exames-footer">
          <Button 
            startIcon={ <AddCircleOutline/>}
            variant="outlined"
            color="primary"
            onClick={handleAddExame}
          >
            Add Exame
          </Button>
        </div>
      </Paper>
    
      <Paper className={`${css.diagnostico} ${css.paper}`} elevation={3}>
        <div className={css.header}>
          <Typography>Diagnóstico:</Typography>
        </div>
        <div className="at-diag-body">
          <Input 
            variant="outlined"
            value={atendimentoState.diagnostico}
            onChange={handleEditDiagnostico}
            fullWidth
            multiline
          />
        </div>
      </Paper>
    
      <Paper className={`${css.prescricoes} ${css.paper}`} elevation={3}>
        <div className={css.header}>
          <Typography>Prescrições:</Typography>
        </div>
        <div className="at-presc-body">
          <ul className="at-prescs-list">
            {
              atendimentoState.prescricoes.map((presc, idx) => (
                <li key={`presc-${idx}`} index={idx}>
                  <div className="at-presc-item">
                    {presc}
                    <IconButton
                      size="small"
                      onClick={handleDelPresc}
                    >
                      <RemoveCircleOutline />
                    </IconButton>
                  </div>
                </li>
              ))
            }
          </ul>
        </div>
        <div className="at-presc-footer">
          <Input 
            placeholder="Descrever prescrição..."
            variant="outlined"
            size="small"
            value={prescricao}
            onChange={ ({target}) => setPrescricao(target.value) }
            fullWidth
          />
          <Button 
            startIcon={<AddCircleOutline />} 
            variant="outlined"
            color="primary"
            onClick={handleAddPresc}
          >
            Add
          </Button>
        </div>
      </Paper>
    
      <div className={css.bottomButtons}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AssignmentTurnedIn />}
          size="large"
          onClick={handleEncerrarAtendimento}
          disabled={requesting}
        >
          {
            requesting?
            'Salvando atendimento...' :
            'Encerrar Atendimento'
          }
        </Button>
      </div>
    </>
  )
}

export default AtendimentoCard;