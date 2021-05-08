import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Avatar,
  Divider,
} from '@material-ui/core';


import DefaultImage from '../../img/default-profile-picture.png'

import DadosPessoais from './tabs/DadosPessoais'; 


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
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
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
    //backgroundColor: 'orange',
    flexGrow: 1,
  },
  sidebar: {
    backgroundColor: 'pink',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '250px',
    
  },
  avatarWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginTop: '30px',
    marginBottom: '30px',

    '& .avatar' : {
      width: '100px',
      height: '100px',
      marginBottom: '20px', 
    },
    '& welcome-message' : {

    },
  },
  tabs: {
    width: '100%', 
  },
  tabPanel: {
    //backgroundColor: 'purple',
    flexGrow: 1,
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

      <Box className={classes.sidebar}>
        <div className={classes.avatarWrapper}>
          <Avatar className="avatar" src={DefaultImage} />
          <Typography className="welcome-message" variant="p">Bem vindo, mané</Typography>
        </div>
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          className={classes.tabs}
        > 
          
          <Tab label="Dados pessoais" {...a11yProps(0)} />
          <Tab label="Atendimentos" {...a11yProps(1)} />
          
        </Tabs>
      </Box>

      <TabPanel className={classes.tabPanel} value={value} index={0}>
        <DadosPessoais />
      </TabPanel>
      <TabPanel className={classes.tabPanel} value={value} index={1}>
        Atendimentos
      </TabPanel>

    </div>
  );
}


export default VerticalTabs;