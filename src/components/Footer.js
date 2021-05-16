import React from 'react';

import { makeStyles } from '@material-ui/styles';

import theme from 'themes/theme';

const useStyles = makeStyles({
  root: {
    height: '30px',
    backgroundColor: theme.palette.primary,
  }
});


const Footer = () => {
  const css = useStyles();

  return (
    <div className={css.root}>
      Footer
    </div>
  )
}

export default Footer;