import React from 'react'

import { makeStyles } from '@material-ui/styles';

import Header from 'components/Header';
import Footer from 'components/Footer';
import VerticalTabs from './VerticalTabs';

import { TabProvider } from 'context/TabContext';


const useStyles = makeStyles({
  pageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: 'inherit', // inherit from React 'root'
  }
})

const Admin = () => {
  const css = useStyles();

  return (
    <div className={css.pageWrapper}>
      <Header />
      
      <TabProvider>
        <VerticalTabs />
      </TabProvider>

      <Footer />
    </div>
  );
}

export default Admin;