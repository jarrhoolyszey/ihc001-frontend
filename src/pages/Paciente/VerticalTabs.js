import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import {
  Tabs,
  Tab,
} from '@material-ui/core';

import Sidebar from 'components/Sidebar';

import Configuracoes from './tabs/Configuracoes';
import DadosPessoais from './tabs/DadosPessoais';
import Atendimentos from './tabs/Atendimentos';
import Ajuda from './tabs/Ajuda';

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
          
          <Tab className="tab" label="Dados pessoais" {...a11yProps(0)} />
          <Tab className="tab" label="Atendimentos" {...a11yProps(1)} />
          <Tab className="tab" label="Configura????es" {...a11yProps(2)} />
          <Tab className="tab" label="Ajuda" {...a11yProps(3)} />
          
        </Tabs>
      </Sidebar>

      <div className="tabpanel-wrapper">
        <TabPanel className={classes.tabPanel} value={tab} index={0}>
          <DadosPessoais />
        </TabPanel>
        <TabPanel className={classes.tabPanel} value={tab} index={1}>
          <Atendimentos />
        </TabPanel>
        <TabPanel className={classes.tabPanel} value={tab} index={2}>
          <Configuracoes />
        </TabPanel>
        <TabPanel className={classes.tabPanel} value={tab} index={3}>
          <Ajuda />
        </TabPanel>
      </div>
    </div>
  );
}


export default VerticalTabs;