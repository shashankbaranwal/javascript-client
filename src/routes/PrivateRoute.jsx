/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { PrivateLayout } from '../layouts';

class PrivateRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { component: Page, ...rest } = this.props;
    if (localStorage.getItem('token')) {
      return (
        <Route
          {...rest}
          render={(matchProps) => (
            <PrivateLayout>
              <Page {...matchProps} />
            </PrivateLayout>
          )}
        />
      );
    }
    return <Redirect to="/login" />;
  }
}

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
};

export default PrivateRoute;
