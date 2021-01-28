import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { ApolloProvider } from '@apollo/react-components';
import ApolloClient from './libs/apollo-client';
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
      <ApolloProvider client={ApolloClient}>
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
      </ApolloProvider>
    </SnackBarProvider>
  </>
);
export default App;
