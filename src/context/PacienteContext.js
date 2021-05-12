import React, { createContext, useState } from 'react';

const Context = createContext();

function PacienteProvider ({children}) {
  const [paciente, setPaciente] = useState('José');
  const [loading, setLoading] = useState(false);

  return (
    <Context.Provider value={{
      paciente,
      loading,
    }}>
      {children}
    </Context.Provider>
  )
}

export { Context, PacienteProvider }