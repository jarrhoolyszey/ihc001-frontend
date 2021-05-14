import React from 'react'

import Header from 'components/Header';
import VerticalTabs from './VerticalTabs';

import { PacienteProvider } from 'context/PacienteContext';
import { TabProvider } from 'context/TabContext';

const Especialista = () => {

  return (
    <div>
      <Header />
      
      <PacienteProvider>
        <TabProvider>
          <VerticalTabs />
        </TabProvider>
      </PacienteProvider>
    </div>
  );
}

export default Especialista;