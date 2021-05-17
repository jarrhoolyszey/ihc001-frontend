import React from 'react';

import { makeStyles } from '@material-ui/styles';

import theme from 'themes/theme';

const useStyles = makeStyles({
  root: {
    height: '30px',
    backgroundColor: theme.palette.primary,
    color: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});


const Footer = () => {
  const css = useStyles();

  return (
    <div className={css.root}>
      <p>{'Prontuário Eletrônico do Paciente - PEP Medic'}</p>
    </div>
  )
}

export default Footer;