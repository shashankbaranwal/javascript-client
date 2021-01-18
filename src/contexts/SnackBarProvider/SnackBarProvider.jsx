import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';

export const SnackBarContext = createContext(() => { });

const CustomizedSnackbars = (props) => {
  const {
    onClose, open, message, status,
  } = props;

  return (
    <div>
      <Snackbar open={open} onClose={onClose} autoHideDuration={4000}>
        <MuiAlert
          elevation={6}
          variant="filled"
          severity={status}
          onClose={onClose}
        >
          {message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

CustomizedSnackbars.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  status: PropTypes.oneOf(['success', 'warning', 'error', 'info'])
    .isRequired,
  open: PropTypes.bool.isRequired,
};

CustomizedSnackbars.defaultProps = {
  onClose: () => { },
};

export default class SnackBarProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      status: '',
      message: '',
    };
  }

  openSnackBar = (message, status) => {
    this.setState({
      open: true,
      status,
      message,
    });
  };

  closeSnackBar = () => {
    this.setState({ open: false });
  };

  render() {
    const { children } = this.props;
    const { message, status, open } = this.state;

    return (
      <>
        <SnackBarContext.Provider value={this.openSnackBar}>
          {children}
        </SnackBarContext.Provider>
        <CustomizedSnackbars
          message={message}
          status={status}
          onClose={this.closeSnackBar}
          open={open}
        />
      </>
    );
  }
}
SnackBarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
