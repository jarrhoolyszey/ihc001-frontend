import React from 'react'

import Header from 'components/Header';
import VerticalTabs from './VerticalTabs';

import { PacienteProvider } from 'context/PacienteContext';

const Especialista = () => {

  return (
    <div>
      <Header />
      
      <PacienteProvider>
        <VerticalTabs />
      </PacienteProvider>
    </div>
  );
}

export default Especialista;