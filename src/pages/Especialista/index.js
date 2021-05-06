import React, { useContext } from 'react'

import { Context } from '../../context/AuthContext';

const Especialista = () => {
  const { authenticated, handleLogout } = useContext(Context);

  return (
    <>
      <h1>Especialista</h1>
      <button onClick={ handleLogout }>Logout</button>
    </>
  );
}

export default Especialista;