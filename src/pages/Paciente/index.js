import React, { useContext } from 'react'

import { makeStyles } from '@material-ui/styles';

import Header from '../../components/Header';
import VerticalTabs from './VerticalTabs';

import { Context } from '../../context/AuthContext';


const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  logoutButton: {
    height: '40px',
  }
});

const Paciente = () => {
  const classes = useStyles();
  const { authenticated, handleLogout } = useContext(Context);

  return (
    <div className={classes.wrapper}>
      <Header />
      <VerticalTabs />
    </div>
  );
}

export default Paciente;