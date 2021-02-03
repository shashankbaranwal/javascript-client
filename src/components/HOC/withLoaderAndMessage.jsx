/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';

export default function withLoaderAndMessage(WrappedComponent) {
  function WithLoaderAndMessage(props) {
    const { loader, dataCount } = props;
    if (loader) {
      return (
        <CircularProgress size={120} color="secondary" style={{ marginLeft: '43%', marginTop: '20%' }} />
      );
    }
    if (dataCount === 0) {
      return (
        <div style={{ textAlign: 'center', margin: '10%' }}><h1>No more data</h1></div>
      );
    }
    return (
      <WrappedComponent {...props} />
    );
  }
  WithLoaderAndMessage.propTypes = {
    loader: PropTypes.bool.isRequired,
    dataCount: PropTypes.number.isRequired,
  };
  return WithLoaderAndMessage;
}
