/* eslint-disable react/sort-comp */
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import * as yup from 'yup';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Div, P } from './style';
import { SnackBarContext } from '../../../../contexts';
import callApi from '../../../../libs/utils/api';

class AddDialog extends React.Component {
  constructor() {
    super();
    this.state = {
      open: '',
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      touched: {
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
      },
    };
    this.baseState = this.state;
  }

  schema = yup.object().shape({
    name: yup.string()
      .required()
      .min(3),
    email: yup.string()
      .email()
      .required(),
    password: yup.string()
      .required('password is missing')
      .matches(/(?=.*[a-z])/, 'should have atleast one lowercase')
      .matches(/(?=.*[A-Z])/, 'should have atleast one uppercase')
      .matches(/(?=.*[0-9])/, 'should have atleast one number')
      .matches(/(?=.*[@#$%^&+=])/, 'should have atleast one special character')
      .min(8, 'minimum 8 characters'),
    confirmPassword: yup.string().required('confirm password required').oneOf([yup.ref('password')], 'passwords do not match'),
  });

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  }

  handleClosed = () => {
    this.setState(this.baseState);
  }

  loadingHandler = () => {
    const { loading } = this.state;
    if (!loading) {
      this.setState({ loading: true });
    }
  }

  onSubmit = async (e, openSnackBar) => {
    e.preventDefault();
    const {
      name, email, password, confirmPassword,
    } = this.state;
    await callApi('/user', 'POST', {
      name, email, password, confirmPassword,
    })
      .then(() => {
        openSnackBar('Add successfully', 'Success');
      })
      .catch(() => {
        openSnackBar('Invalid User', 'error');
      });
    this.setState(this.baseState);
  }

  getError(field) {
    const { touched } = this.state;
    if (touched[field] && this.hasErrors()) {
      try {
        this.schema.validateSyncAt(field, this.state);
      } catch (err) {
        return err.message;
      }
    }
    return null;
  }

  hasErrors() {
    try {
      this.schema.validateSync(this.state);
    } catch (err) {
      return true;
    }
    return false;
  }

  isTouched(field) {
    const { touched } = this.state;
    this.setState({
      touched: {
        ...touched,
        [field]: true,
      },
    });
  }

  loadingHandler = () => {
    const { loading } = this.state;
    if (!loading) {
      this.setState({ loading: true });
    }
  }

  render() {
    const {
      name, email, password, open, confirmPassword, loading,
    } = this.state;

    const handleNameChange = (event) => {
      this.setState({ name: event.target.value }, () => {
        // console.log(this.state);
      });
    };
    const handleEmailChange = (event) => {
      this.setState({ email: event.target.value }, () => {
        // console.log(this.state);
      });
    };
    const handlePasswordChange = (event) => {
      this.setState({ password: event.target.value }, () => {
        // console.log(this.state);
      });
    };
    const handleConfirmPassword = (event) => {
      this.setState({ confirmPassword: event.target.value });
    };

    return (
      <SnackBarContext.Consumer>
        {(value) => (
          <div>
            <Button variant="outlined" color="primary" onClick={this.handleClickOpen} style={{ marginTop: '20px', marginBottom: '20px' }}>
              Add TraineeList
            </Button>
            <Dialog
              open={open}
              onClose={this.handleClosed}
              aria-labelledby="form-dialog-title"
              autoFocus={false}
            >
              <DialogTitle id="form-dialog-title">Add Trainee</DialogTitle>
              <DialogContent>
                <DialogContentText>Enter Trainee Details</DialogContentText>
                <TextField
                  margin="dense"
                  id="name"
                  label="Name*"
                  type="name"
                  value={name}
                  variant="outlined"
                  error={this.getError('name')}
                  onBlur={() => { this.isTouched('name'); }}
                  onChange={handleNameChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                />
                <Div><P>{this.getError('name')}</P></Div>
                <TextField
                  margin="dense"
                  label="Email Address"
                  id="email"
                  type="email"
                  value={email}
                  variant="outlined"
                  error={this.getError('email')}
                  onBlur={() => { this.isTouched('email'); }}
                  onChange={handleEmailChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailIcon />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                />
                <Div><P>{this.getError('email')}</P></Div>
                <Box display="flex">
                  <div>
                    <div>
                      <TextField
                        margin="dense"
                        value={password}
                        id="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        error={this.getError('password')}
                        onBlur={() => { this.isTouched('password'); }}
                        onChange={handlePasswordChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <VisibilityOffIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </div>
                    <Div><P>{this.getError('password')}</P></Div>
                  </div>
                  <div>
                    <div>
                      <TextField
                        margin="dense"
                        value={confirmPassword}
                        id="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        style={{ marginLeft: '10px' }}
                        error={this.getError('confirmPassword')}
                        onBlur={() => { this.isTouched('confirmPassword'); }}
                        onChange={handleConfirmPassword}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <VisibilityOffIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </div>
                    <Div><P>{this.getError('confirmPassword')}</P></Div>
                  </div>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClosed} color="primary">
                  Cancel
                </Button>
                <Button onClick={(event) => this.onSubmit(event, value)} variant="contained" color="primary" disabled={this.hasErrors()}>
                  Submit
                  {loading && (<CircularProgress size={20} color="secondary" />)}
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        )}
      </SnackBarContext.Consumer>
    );
  }
}
// AddDialog.propTypes = {
//   history: PropTypes.objectOf(PropTypes.any).isRequired,
// };

export default AddDialog;
