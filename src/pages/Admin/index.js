import React, { useContext } from 'react'

import { Context } from '../../context/AuthContext';

const Admin = () => {
  const { authenticated, handleLogout } = useContext(Context);

  return (
    <>
      <h1>Admin</h1>
      <button onClick={ handleLogout }>Logout</button>
    </>
  );
}

export default Admin;