import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import {
  TextFieldDemo,
  InputDemo,
  Trainee,
  ChildrenDemo,
  Login,
  NotFound,
} from './pages/index';
import { AuthRoute, PrivateRoute } from './routes/index';
import { SnackBarProvider } from './contexts/index';
import themeStyle from './theme';

const App = () => (
  <>
    <SnackBarProvider>
      <ThemeProvider theme={themeStyle}>
        <Router>
          <Switch>
            <Route exact path="/" component={Trainee}>
              <Redirect to="/login" />
            </Route>
            <AuthRoute path="/login" component={Login} />
            <PrivateRoute path="/ChildrenDemo" component={ChildrenDemo} />
            <PrivateRoute path="/TextFieldDemo" component={TextFieldDemo} />
            <PrivateRoute path="/InputDemo" component={InputDemo} />
            <PrivateRoute path="/Trainee" component={Trainee} />
            <PrivateRoute component={NotFound} />
          </Switch>
        </Router>
      </ThemeProvider>
    </SnackBarProvider>
  </>
);
export default App;
