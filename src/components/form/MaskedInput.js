import React from 'react';

import InputMask from 'react-input-mask';

import { 
  TextField,
  Typography, 
} from '@material-ui/core';


const MaskedInput = (props) => {
  const { 
    mask,
    maskChar,
    variant, 
    id, 
    label, 
    type, 
    value, 
    error, 
    onChange, 
    onBlur, 
    validate,
    ...rest
  } = props;
  
  return (
    <>
      <InputMask 
        mask={mask}
        maskChar={maskChar}
        value={value} 
        onChange={onChange}
        onBlur={onBlur}
      >
      {(inputProps) => (
        <TextField 
          {...inputProps}
          id={id} 
          type={type}
          label={label}
          variant={variant}
          error={error? true : false}
          helperText={error}
          {...rest}
        />)}
      </InputMask>
    </>
  )
}

export default MaskedInput;