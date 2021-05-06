import React, { useState, useContext, useEffect } from 'react';

import './style.css';

import { Context } from '../../context/AuthContext';


function Login() {

  
  const { authenticated, handleLogin } = useContext(Context);
  
  useEffect(() => {
    console.log('Login :');
    console.log('Authenticated?', authenticated);
  }, []);

  console.log('Login', authenticated);

  const [ email, setEmail ] = useState("");
  const [ senha, setSenha ] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleSenhaChange(e) {
    setSenha(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      email,
      senha,
    }
    
    await handleLogin(payload);
  }

  return (
    <div id="form-wrapper">
      <h3 id="login-header">Login</h3>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <input 
            type="text" 
            placeholder="E-mail" 
            onChange={handleEmailChange}
            value={email} 
          />
        </div>

        <div className="input-wrapper">
          <input
            type="password" 
            placeholder="Senha"
            onChange={handleSenhaChange}
            value={senha}
          />
        </div>
        <button type="submit">Entrar</button>
        <p id="forgot-password">Esqueceu sua senha?</p>
      </form>
      
    </div>
  );
}

export default Login;