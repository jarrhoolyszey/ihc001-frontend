import React from 'react'

import { makeStyles } from '@material-ui/styles';

import Header from 'components/Header';
import Footer from 'components/Footer';
import VerticalTabs from './VerticalTabs';

import { Context } from 'context/AuthContext';
import { TabProvider } from 'context/TabContext';




const useStyles = makeStyles({
  pageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: 'inherit', // inherit from React 'root'
  }
});

const Paciente = () => {
  const classes = useStyles();
  const { user } = React.useContext(Context); 


  return (
    <div className={classes.pageWrapper}>
      <Header/>

      <TabProvider>
        <VerticalTabs user={user}/>
      </TabProvider>

      <Footer />
    </div>
  );
}

export default Paciente;