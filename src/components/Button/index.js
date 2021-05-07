import React from 'react';

import './style.css';

const Button = ( props ) => {
  return (
    <button
      className= {"button " + props.className} 
      type={props.type}
      onClick={props.handleClick}
    >
    { props.text }
    </button>
  );
}

export default Button;