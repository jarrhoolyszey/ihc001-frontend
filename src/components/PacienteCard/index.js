import React from 'react';

import ProfilePicture from '../ProfilePicture';
import Button from '../Button';

import './style.css'


const PacienteCard = (props) => {
  return (
    <div className="paciente-card-wrapper">
      <ProfilePicture />
      <p id="pacient-card-name-field">{props.nome || "Nome"}</p>
      <Button 
        type="button"
        text="Sair"
        onClick={ props.handleClick }
      />
    </div>
  );
}


export default PacienteCard;