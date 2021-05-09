import React from 'react';

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


const useStyles = makeStyles({
  root: {
    border: '1px dashed black',
    padding: '20px',
    height: '100vh',
    overflowY: 'scroll',
  }
});


const Atendimentos = (props) => {
  const css = useStyles();
  
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 }, 
    { field: 'data', headerName: 'Data', width: 150 },
    { field: 'diagnostico', headerName: 'Diagnóstico', sortable: false, width: 150},
    { field: 'prescricao', headerName: 'Prescrição', sortable: false, width: 150},
  ];
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