import React from 'react';

import { TextField, MenuItem } from '@material-ui/core';

const Select = ({options, id, label, value, onChange, variant, ...rest}) => {
  return (
    <TextField
      id={id}
      label={label}
      value={value}
      onChange={onChange}
      variant={variant}
      select
      {...rest}
    >
      {
        options.map(option => (
          <MenuItem key={`${id}-${option}`} value={option}>{option}</MenuItem>
        ))
      }

    </TextField>
  )
}

export default Select;