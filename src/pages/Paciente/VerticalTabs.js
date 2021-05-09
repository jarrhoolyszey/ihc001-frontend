import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import {
  Tabs,
  Tab,
} from '@material-ui/core';

import Sidebar from 'components/Sidebar';

import DadosPessoais from './tabs/DadosPessoais';
import Atendimentos from './tabs/Atendimentos';

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
          
          <Tab className="tab" label="Dados pessoais" {...a11yProps(0)} />
          <Tab className="tab" label="Atendimentos" {...a11yProps(1)} />
          
        </Tabs>
      </Sidebar>

      <TabPanel className={classes.tabPanel} value={value} index={0}>
        <DadosPessoais />
      </TabPanel>
      <TabPanel className={classes.tabPanel} value={value} index={1}>
        <Atendimentos />
      </TabPanel>

    </div>
  );
}


export default VerticalTabs;