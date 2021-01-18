/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(3),
  },
  menuButton: {
    marginRight: theme.spacing(4),
  },
  title: {
    flexGrow: 1,
  },
}));

const NavBar = () => {
  const classes = useStyles();

  const handleLogout = () => {
    localStorage.removeItem('token');
  };

  return (
    <div className={classes.root} style={{ margin: 0 }}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Trainee Portal
          </Typography>
          <Button component={Link} to="/Trainee" color="inherit">TRAINEE</Button>
          <Button component={Link} to="/TextFieldDemo" color="inherit">TEXTFIELD DEMO</Button>
          <Button component={Link} to="/InputDemo" color="inherit">INPUT DEMO</Button>
          <Button component={Link} to="/ChildrenDemo" color="inherit">CHILDREN DEMO</Button>
          <Button
            color="inherit"
            component={Link}
            to="/login"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default NavBar;
