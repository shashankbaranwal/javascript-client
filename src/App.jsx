import React from 'react';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { AuthRoute, PrivateRoute } from './routes';
import {
  ChildrenDemo, TextFieldDemo, InputDemo, LoginUi, NoMatch,
} from './pages';
import { TraineeDetails, TraineeList } from './pages/Trainee';
import theme from './theme';
import { SnackBarProvider } from './contexts';
import apolloClient from './libs/apollo-client';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackBarProvider>
        <ApolloProvider client={apolloClient}>
          <CssBaseline />
          <Router>
            <Switch>
              <Redirect exact path="/" to="/trainee" />
              <AuthRoute exact path="/login" component={LoginUi} />
              <PrivateRoute exact path="/trainee" component={TraineeList} />
              <PrivateRoute exact path="/trainee/:id" component={TraineeDetails} />
              <PrivateRoute exact path="/input-demo" component={InputDemo} />
              <PrivateRoute exact path="/text-field-demo" component={TextFieldDemo} />
              <PrivateRoute exact path="/children-demo" component={ChildrenDemo} />
              <PrivateRoute default component={NoMatch} />
            </Switch>
          </Router>
        </ApolloProvider>
      </SnackBarProvider>
    </ThemeProvider>
  );
}

export default App;
