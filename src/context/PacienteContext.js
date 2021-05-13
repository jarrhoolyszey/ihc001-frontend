import React, { createContext, useState } from 'react';

const Context = createContext();

function PacienteProvider ({children}) {
  const [paciente, setPaciente] = useState(null);
  
  function selectPaciente(p) {
    setPaciente(p);
  }

  return (
    <Context.Provider value={{
      paciente,
      selectPaciente,
    }}>
      {children}
    </Context.Provider>
  )
}

export { Context, PacienteProvider }