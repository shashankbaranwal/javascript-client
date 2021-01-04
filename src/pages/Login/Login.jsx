/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Typography, InputAdornment, Container } from '@material-ui/core';
import LockRoundedIcon from '@material-ui/icons/LockRounded';
import MailIcon from '@material-ui/icons/Mail';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import * as yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    border: '1px solid silver',
    boxShadow: '1px 2px 3px silver',
    marginTop: '100px',
    width: '400px',
    display: 'flex',
    flexDirection: 'column',
  },
  icon: {
    backgroundColor: 'red',
    color: 'white',
    borderRadius: '50%',
    alignSelf: 'center',
    padding: '5px',
    marginTop: '20px',
    marginBottom: '10px',
  },
  components: {
    marginRight: theme.spacing(4),
  },
  login: {
    alignSelf: 'center',
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: '25px',
  },
  input: {
    alignSelf: 'center',
    margin: '15px 0px',
  },
  signin: {
    margin: '20px',
    alignSelf: 'center',
    padding: '10px',
    boxSizing: 'border-box',
  },
}));

const Login = () => {
  const classes = useStyles();
  const [open, setopen] = useState({
    openDialog: true,
  });

  const [state, setstate] = useState({
    Email: '', Password: '',
  });

  const [blur, setblur] = useState({
    Email: false, Password: false,
  });

  const schema = yup.object().shape({
    Email: yup.string().email().required(),
    Password: yup.string().required().min(8).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/, 'Must contain 8 characters, at least one uppercase letter, one lowercase letter and one number'),
  });

  const handleEmailChange = (event) => {
    setstate({ ...state, Email: event.target.value });
  };

  const handlePasswordChange = (event) => {
    setstate({ ...state, Password: event.target.value });
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

  const isTouched = () => (blur.Password || blur.Email);

  const handleClose = () => {
    setopen({ ...open, openDialog: false });
    console.log(state);
  };

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
    <Container className={classes.container} fullWidth aria-labelledby="form-dialog-title">
      <LockRoundedIcon className={classes.icon} />
      <Typography id="form-dialog-title" className={classes.login}>Login</Typography>
      <TextField
        className={classes.input}
        size="medium"
        id="Email"
        label="Email"
        type="email"
        variant="outlined"
        error={getError('Email')}
        helperText={getError('Email')}
        onChange={handleEmailChange}
        onBlur={() => handleBlur('Email')}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MailIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        className={classes.input}
        size="medium"
        id="Password"
        label="Password"
        type="password"
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
        fullWidth
      />
      <Button fullWidth onClick={handleClose} className={classes.signin} color="primary" variant="contained" disabled={hasError() || !isTouched()}>
        SIGN IN
      </Button>
    </Container>
  );
};

export default Login;
