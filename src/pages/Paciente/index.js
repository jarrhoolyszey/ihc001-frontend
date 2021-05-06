import React, { useContext } from 'react'

import { Context } from '../../context/AuthContext';

const Paciente = () => {
  const { authenticated, handleLogout } = useContext(Context);

  return (
    <>
      <h1>Paciente</h1>
      <button onClick={ handleLogout }>Logout</button>
    </>
  );
}

export default Paciente;