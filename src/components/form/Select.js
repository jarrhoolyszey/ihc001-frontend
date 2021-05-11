import React from 'react';

import { TextField, MenuItem } from '@material-ui/core';

const Select = ({options, id, label, value, setValue, variant, ...rest}) => {
  return (
    <TextField
      id={id}
      label={label}
      value={value}
      setValue={setValue}
      onChange={({target}) => setValue(target.value)}
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