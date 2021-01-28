/* eslint-disable react/sort-comp */
import React, { PureComponent } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { Container, InputAdornment } from '@material-ui/core/';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { Email } from '@material-ui/icons';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import * as yup from 'yup';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';
import { SnackBarContext } from '../../contexts';
// import callApi from '../../lib/utils/api';

class Login extends PureComponent {
  constructor() {
    super();
    this.state = {
      loading: false,
      touched: {
        email: false,
        password: false,
      },
    };
  }

  schema = yup.object().shape({
    email: yup.string()
      .required()
      .email(),
    password: yup.string()
      .required('password is missing')
      .min(8, 'minimum 8 characters'),
  })

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

  submit = async (e, openSnackBar) => {
    e.preventDefault();
    const { history, loginUser } = this.props;
    const { email, password } = this.state;
    // await callApi('/user/login', 'POST', { email, password })
    await loginUser({ variables: { email, password } })
      .then((response) => {
        localStorage.setItem('token', response.data.loginUser);
        openSnackBar('Login successfully', 'Success');
        history.push('/trainee');
      })
      .catch(() => {
        this.setState({
          email: '',
          password: '',
          loading: false,
          touched: {
            email: false,
            password: false,
          },
        });
        openSnackBar('Invalid User', 'error');
      });
  }

  loadingHandler = () => {
    const { loading } = this.state;
    if (!loading) {
      this.setState({ loading: true });
    }
  }

  render() {
    const { email, password, loading } = this.state;

    const handleEmailChange = (event) => {
      this.setState({ email: event.target.value }, () => {
        console.log(this.state);
      });
    };

    const handlePasswordChange = (event) => {
      this.setState({ password: event.target.value }, () => {
        console.log(this.state);
      });
    };

    return (
      <SnackBarContext.Consumer>
        {(value) => (
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box boxShadow={3} maxWidth="lg" p={2} mt={15}>
              <Avatar style={{ backgroundColor: 'red', margin: 'auto' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" align="center" style={{ marginBottom: '30px' }}>
                Login
              </Typography>
              <form onSubmit={(event) => this.submit(event, value)}>
                <TextField
                  value={email}
                  error={this.getError('email')}
                  onBlur={() => { this.isTouched('email'); }}
                  onChange={handleEmailChange}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                />
                <div><p style={{ color: 'red', marginTop: '0px' }}>{ this.getError('email')}</p></div>
                <TextField
                  value={password}
                  error={this.getError('password')}
                  onBlur={() => { this.isTouched('password'); }}
                  onChange={handlePasswordChange}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VisibilityOffIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <div><p style={{ color: 'red', marginTop: '0px' }}>{ this.getError('password')}</p></div>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={this.hasErrors()}
                  style={{ marginTop: '20px' }}
                  type="submit"
                  onClick={this.loadingHandler}
                >
                  Sign In
                  {loading && (<CircularProgress size={21} color="secondary" />)}
                </Button>
              </form>
            </Box>
          </Container>
        )}
      </SnackBarContext.Consumer>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  loginUser: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(Login);
