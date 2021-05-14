import React from 'react';

import { makeStyles } from '@material-ui/styles';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';


const useStyles = makeStyles({
  root: {

  }
})

const AlertDialog = ( props ) => {
  const css = useStyles();
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