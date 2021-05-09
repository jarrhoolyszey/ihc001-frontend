import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import {
  Tabs,
  Tab,
} from '@material-ui/core';

import Sidebar from 'components/Sidebar'; 

import Atendimento from './tabs/Atendimento';
import DadosPaciente from './tabs/DadosPaciente';
import HistoricoPaciente from './tabs/HistoricoPaciente';

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
    flexGrow: 1,
  },
  tabs: {
    width: '100%',
    borderTop: `1px solid ${theme.palette.primaryText}`,

    '& .tab': {
      borderBottom: `1px solid ${theme.palette.primaryText}`,
    }
  },
  tabPanel: {
    flexGrow: 1,
    overflowY: 'hidden',
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
  const [value, setValue] = React.useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>

      <Sidebar>
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          className={classes.tabs}
        > 
          
          <Tab className="tab" label="Atendimento" {...a11yProps(0)} />
          <Tab className="tab" label="Dados Paciente" {...a11yProps(1)} />
          <Tab className="tab" label="Histórico" {...a11yProps(2)} />
          
        </Tabs>
      </Sidebar>

      <TabPanel className={classes.tabPanel} value={value} index={0}>
        <Atendimento />
      </TabPanel>
      <TabPanel className={classes.tabPanel} value={value} index={1}>
        <DadosPaciente />
      </TabPanel>
      <TabPanel className={classes.tabPanel} value={value} index={2}>
        <HistoricoPaciente />
      </TabPanel>

    </div>
  );
}


export default VerticalTabs;