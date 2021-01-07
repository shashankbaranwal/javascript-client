/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthLayout } from '../layouts';

class AuthRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { component: Page, ...rest } = this.props;
    if (!localStorage.getItem('token')) {
      return (
        <Route
          {...rest}
          render={(matchProps) => (
            <AuthLayout>
              <Page {...matchProps} />
            </AuthLayout>
          )}
        />
      );
    }
    return <Redirect to="/trainee" />;
  }
}
AuthRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
};

export default AuthRoute;
