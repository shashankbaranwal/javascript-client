import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { SnackBarContext } from '../../contexts';
// import callApi from '../../libs/utils/api';

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  spinner: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
});

class Login extends Component {
  schema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required(),
  });

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      spinner: false,
      touched: {
        touchedEmail: false,
        touchedPassword: false,
      },
    };
    this.baseState = this.state;
  }

  handleButtonDisbale = () => {
    const { state } = this;
    try {
      this.schema.validateSync(state);
    } catch (err) {
      return true;
    }
    return false;
  }

  onSubmit = async (e, value) => {
    e.preventDefault();
    const { history, loginUser } = this.props;
    const { email, password } = this.state;
    this.setState({ spinner: true });
    await loginUser({ variables: { email, password } })
      .then((res) => {
        localStorage.setItem('token', res.data.loginUser);
        value('Successfully logged', 'success');
        this.setState({ spinner: false });
        history.push('/trainee');
      })
      .catch(() => {
        value('Invalid credentials', 'error');
        this.setState(this.baseState);
      });
  };

  handleNameChange = async (e, field, touchField) => {
    const { touched } = this.state;
    await this.setState({ [field]: e.target.value, touched: { ...touched, [touchField]: false } });
    if (field === 'email') {
      this.validateEmail();
    }
  }

  validateEmail = () => {
    const { email, touched } = this.state;
    if (!new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i).test(email)) {
      this.setState({
        touched: {
          ...touched,
          touchedEmail: true,
        },
      });
    }
  }

  isTouched = (field, touchedField) => {
    const { touched } = this.state;
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state[field] === '') {
      this.setState({
        touched: {
          ...touched,
          [touchedField]: true,
        },
      });
    }
  }

  render() {
    const { classes } = this.props;
    const {
      email, password, spinner,
    } = this.state;
    const {
      touchedEmail, touchedPassword,
    // eslint-disable-next-line react/destructuring-assignment
    } = this.state.touched;
    return (
      <SnackBarContext.Consumer>
        {(value) => (
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  value={email}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={(e) => this.handleNameChange(e, 'email', 'touchedEmail')}
                  onBlur={() => this.isTouched('email', 'touchedEmail')}
                  error={touchedEmail}
                  // eslint-disable-next-line no-nested-ternary
                  helperText={touchedEmail ? (email === '' ? 'Email is Required' : 'Enter the valid Email') : ' '}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  autoComplete="current-password"
                  onChange={(e) => this.handleNameChange(e, 'password', 'touchedPassword')}
                  onBlur={() => this.isTouched('password', 'touchedPassword')}
                  error={touchedPassword}
                  helperText={touchedPassword ? 'Password is Required' : ' '}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={this.handleButtonDisbale()}
                  onClick={(event) => this.onSubmit(event, value)}
                >
                  {!spinner && ('Sign In')}
                  {
                    spinner && (
                      <div className={classes.root}>
                        <CircularProgress color="secondary" />
                      </div>
                    )
                  }
                </Button>
              </form>
            </div>
          </Container>
        )}
      </SnackBarContext.Consumer>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  loginUser: PropTypes.func.isRequired,
};

export default withRouter(withStyles(styles)(Login));
