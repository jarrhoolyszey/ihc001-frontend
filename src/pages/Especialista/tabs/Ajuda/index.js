import React from 'react';

import { makeStyles } from '@material-ui/styles';

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,  
} from '@material-ui/core'

import { ExpandMore } from '@material-ui/icons';

import help from './help/especialista.json';


const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1em',
    textAlign: 'justify',
  }
});

const Ajuda = () => {
  const css = useStyles();
  
  return (
    <div className={css.root}>
    { 
      help.map((item, idx) => (
        <Accordion key={`${item.titulo}-${idx}`}>
          <AccordionSummary className={css.header}
            expandIcon={<ExpandMore />}
            id={`panel${idx}-header`}
          >
            <Typography>{item.titulo}</Typography>
          </AccordionSummary>
          <AccordionDetails className={css.details}>
            {
              item.descricao.map((paragrafo, idx) => (
                <Typography key={`${item.titulo}-p${idx}`} variant="body2">{paragrafo}</Typography>
              ))
            }
          </AccordionDetails>
        </Accordion>
      ))
    }
    </div>
  )
}

export default Ajuda;