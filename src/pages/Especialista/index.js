import React, { useContext } from 'react'

import { Context } from '../../context/AuthContext';

import { makeStyles } from '@material-ui/styles';

import {

} from '@material-ui/core';

import Header from 'components/Header';
import VerticalTabs from './VerticalTabs';

import theme from 'themes/theme';

const useStyles = makeStyles({
  root: {

  }
})


const Especialista = () => {
  const css = useStyles();
  
  const { authenticated, handleLogout } = useContext(Context);

  return (
    <div className={css.root}>
      <Header />
      <VerticalTabs />
    </div>
  );
}

export default Especialista;