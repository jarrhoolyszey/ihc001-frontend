import React, { useContext, useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/styles';

import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';

import { Context } from 'context/AuthContext';

import theme from 'themes/theme';


const useStyles = makeStyles({
  root: {
    padding: '20px',
    height: '100vh',
    overflowY: 'scroll',
  
    '& th': {
      backgroundColor: theme.palette.primaryLight,
      color: theme.palette.primaryText,
      fontWeight: 'bold',
    },

    '& tr:nth-child(even)': {
      backgroundColor: '#EEE',
    }
  }
});


const Atendimentos = (props) => {
  const css = useStyles();
  const { user } = useContext(Context);
  const [ atendimentos, setAtendimentos ] = useState([]);

  useEffect(() => {
    /* Requisitar os atendimentos do usuario pelo ID */
    console.log('Requisitando dados de atendimentos ...');
  }, []);

  const rows = [
    { 
      id: '1',
      data: '01/01/2020',
      diagnostico: 'Bla bla bla',
      prescricao: 'Prescricao alho com jaca',
    },
    { 
      id: '2',
      data: '01/02/2020',
      diagnostico: 'Subiu na bananeira',
      prescricao: 'Morreu de caganeira',
    },
    {
      id: '3',
      data: '05/02/2020',
      diagnostico: 'Subiu na bananeira',
      prescricao: 'Morreu de caganeira',
    },
    {
      id: '4',
      data: '10/02/2020',
      diagnostico: 'Subiu na bananeira',
      prescricao: 'Morreu de caganeira',
    },
    {
      id: '5',
      data: '30/03/2020',
      diagnostico: 'Subiu na bananeira',
      prescricao: 'Morreu de caganeira',
    },
  ];

  return (
  <div className={css.root}>

    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Data</TableCell>
            <TableCell align="center">Diagnóstico</TableCell>
            <TableCell align="center">Prescrição</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {
            rows.map((atendimento, index) => (
              <TableRow key={index}>
                <TableCell align="center">{atendimento.data}</TableCell>
                <TableCell align="center">{atendimento.diagnostico}</TableCell>
                <TableCell align="center">{atendimento.prescricao}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  </div>
  )
}


export default Atendimentos;