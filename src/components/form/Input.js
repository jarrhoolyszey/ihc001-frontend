import React from 'react';

import { TextField } from '@material-ui/core';


const Input = (props) => {
  const { variant, id, label, type, value, error, onChange, onBlur, validate, ...rest} = props;
  
  return (
    <>
      <TextField 
        variant={variant}
        id={id}
        label={label}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={error? true : false}
        helperText={error}
        {...rest}
      />
    </>
  )
}

export default Input;