import React from 'react'

import { makeStyles } from '@material-ui/styles';

import Header from 'components/Header';
import VerticalTabs from './VerticalTabs';
import Footer from 'components/Footer';

import { PacienteProvider } from 'context/PacienteContext';
import { TabProvider } from 'context/TabContext';


const useStyles = makeStyles({
  pageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: 'inherit', // inherit from React 'root'
  }
})

const Especialista = () => {
  const css = useStyles();

  return (
    <div className={css.pageWrapper}>
      <Header />
      
      <PacienteProvider>
        <TabProvider>
          <VerticalTabs />
        </TabProvider>
      </PacienteProvider>
    
      <Footer />
    </div>
  );
}

export default Especialista;