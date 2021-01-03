/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import {
  Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, InputAdornment,
} from '@material-ui/core';
import { func, bool } from 'prop-types';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import * as yup from 'yup';

const AddDialog = (props) => {
  const { onClose, open, onSubmit } = props;

  const [state, setstate] = useState({
    Name: '', Email: '', Password: '', Confirm: '',
  });
  const [blur, setblur] = useState({
    Name: false, Email: false, Password: false, Confirm: false,
  });
  const schema = yup.object().shape({
    Name: yup.string().required().min(3),
    Email: yup.string().email().required(),
    Password: yup.string().required().min(8).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/, 'Must contain 8 characters, at least one uppercase letter, one lowercase letter and one number'),
    Confirm: yup.string().oneOf([yup.ref('Password'), null], 'Password must match'),
  });

  const handleNameChange = (event) => {
    setstate({ ...state, Name: event.target.value });
  };

  const handlePasswordChange = (event) => {
    setstate({ ...state, Password: event.target.value });
  };

  const handleConfirmChange = (event) => {
    setstate({ ...state, Confirm: event.target.value });
  };

  const handleEmailChange = (event) => {
    setstate({ ...state, Email: event.target.value });
  };

  const hasError = () => {
    try {
      return !schema.validateSync(state);
    } catch (err) {
      return true;
    }
  };

  const handleBlur = (field) => {
    setblur({ ...blur, [field]: true });
  };

  const isTouched = () => (blur.Name || blur.Password || blur.Confirm || blur.Email);

  const getError = (field) => {
    if (blur[field] && hasError()) {
      try {
        schema.validateSyncAt(field, state);
      } catch (err) {
        return err.message;
      }
    }
    return null;
  };
  return (
    <div>
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Trainee</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your trainee details
          </DialogContentText>
          <TextField
            required
            margin="dense"
            id="name"
            label="Name"
            type="name"
            variant="outlined"
            error={getError('Name')}
            helperText={getError('Name')}
            onChange={handleNameChange}
            onBlur={() => handleBlur('Name')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            error={getError('Email')}
            helperText={getError('Email')}
            onChange={handleEmailChange}
            onBlur={() => handleBlur('Email')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
          <form>
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="new-password"
              variant="outlined"
              error={getError('Password')}
              helperText={getError('Password')}
              onChange={handlePasswordChange}
              onBlur={() => handleBlur('Password')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VisibilityOffIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="dense"
              id="confirm"
              label="Confirm"
              type="new-password"
              variant="outlined"
              error={getError('Confirm')}
              helperText={getError('Confirm')}
              onChange={handleConfirmChange}
              onBlur={() => handleBlur('Confirm')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VisibilityOffIcon />
                  </InputAdornment>
                ),
              }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => { onSubmit(state); }} color="primary" disabled={hasError() && isTouched()}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AddDialog.defaultProps = {
  open: false,
  onSubmit: null,
};

AddDialog.propTypes = {
  open: bool,
  onClose: func.isRequired,
  onSubmit: func,
};

export default AddDialog;
