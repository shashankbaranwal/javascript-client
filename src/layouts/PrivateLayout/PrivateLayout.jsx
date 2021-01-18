/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { NavBar } from '../components/Navbar/index';

// eslint-disable-next-line no-unused-vars
const PrivateLayout = ({ children, ...rest }) => (
  <div>
    <NavBar />
    <div>{children}</div>
  </div>
);
PrivateLayout.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.object.isRequired,
};

export default PrivateLayout;
