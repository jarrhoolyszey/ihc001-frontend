import React from 'react'

import { makeStyles } from '@material-ui/styles';

import {

} from '@material-ui/core';

import Header from 'components/Header';
import VerticalTabs from './VerticalTabs';


const useStyles = makeStyles({
  root: {

  }
})


const Especialista = () => {
  const css = useStyles();

  return (
    <div className={css.root}>
      <Header />
      <VerticalTabs />
    </div>
  );
}

export default Especialista;