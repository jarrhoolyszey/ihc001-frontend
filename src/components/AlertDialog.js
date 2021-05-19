import React from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@material-ui/core';



const AlertDialog = ( props ) => {
  const { open, okText, cancelText, handleOk, handleCancel, children } = props;

  return (
    <Dialog
      open={open}
    >
      <DialogContent>
        <DialogContentText>
          {children}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOk} color="primary">{okText}</Button>
        <Button onClick={handleCancel} color="secondary">{cancelText}</Button>
      </DialogActions>
    </Dialog>
  )
}


export default AlertDialog;