import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import {
  Tabs,
  Tab,
} from '@material-ui/core';

import Sidebar from 'components/Sidebar'; 

import BuscarPaciente from './tabs/BuscarPaciente';
import Atendimento from './tabs/Atendimento';
import DadosPaciente from './tabs/DadosPaciente';
import HistoricoPaciente from './tabs/HistoricoPaciente';
import Configuracoes from './tabs/Configuracoes';

import { TabContext } from 'context/TabContext';

import theme from 'themes/theme';


const TabPanel = (props) => {
  const { children, value, index, ...rest } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...rest}
    >
      {value === index && (
        <>{children}</>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}


const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
    flex: '1',

    '& .tabpanel-wrapper': {
      display: 'flex',
      flexDirection: 'column',
      flex: '1',
      overflowY: 'scroll',
      minHeight: '100%',
      padding: '20px 0',
    }
    
  },
  tabs: {
    overflowY: 'auto',
    width: '100%',
    borderTop: `1px solid ${theme.palette.primaryText}`,

    '& .tab': {
      borderBottom: `1px solid ${theme.palette.primaryText}`,
    }
  },
  tabPanel: {
    padding: '20px',
  }
});


const a11yProps = (index) => {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
}


const VerticalTabs = () => {
  const classes = useStyles();
  const { tab, changeTab } = React.useContext(TabContext);
  
  const handleChange = (e, newValue) => {
    changeTab(newValue);
  };

  return (
    <div className={classes.root}>
      
      <Sidebar>
        <Tabs
          orientation="vertical"
          value={tab}
          onChange={handleChange}
          className={classes.tabs}
        > 
          
          <Tab className="tab" label="Buscar Paciente" {...a11yProps(0)} />
          <Tab className="tab" label="Atendimento" {...a11yProps(1)} />
          <Tab className="tab" label="Dados Paciente" {...a11yProps(2)} />
          <Tab className="tab" label="Histórico" {...a11yProps(3)} />
          <Tab className="tab" label="Configurações" {...a11yProps(4)} />
          
        </Tabs>
      </Sidebar>

      <div className="tabpanel-wrapper">
        <TabPanel className={classes.tabPanel} value={tab} index={0}>
          <BuscarPaciente />
        </TabPanel>
        <TabPanel className={classes.tabPanel} value={tab} index={1}>
          <Atendimento />
        </TabPanel>
        <TabPanel className={classes.tabPanel} value={tab} index={2}>
          <DadosPaciente />
        </TabPanel>
        <TabPanel className={classes.tabPanel} value={tab} index={3}>
          <HistoricoPaciente />
        </TabPanel>
        <TabPanel className={classes.tabPanel} value={tab} index={4}>
          <Configuracoes />
        </TabPanel>
      </div>
    </div>
  );
}


export default VerticalTabs;