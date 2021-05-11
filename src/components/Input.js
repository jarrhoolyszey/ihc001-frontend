import React from 'react';

import { 
  TextField,
  Typography, 
} from '@material-ui/core';


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
        {...rest}
      />
      {error && <Typography>{error}</Typography>}
    </>
  )
}

export default Input;