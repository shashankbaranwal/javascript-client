import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@material-ui/core';

import { SnackBarContext } from '../../../../contexts';
import callApi from '../../../../libs/utils/api';

class DeleteDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleDeleteClose = async (event, message) => {
    event.preventDefault();
    const { details, onClose, renderTrainee } = this.props;
    const originalDate = new Date(details.createdAt);
    const dateCheck = new Date('2019-02-14');
    const { originalId } = details;
    await callApi('/trainee', 'DELETE', { originalId })
      .then(() => {
        if (originalDate > dateCheck) {
          console.log('Deleted Item', details);
          message('Successfully Deleted!', 'success');
          renderTrainee();
        } else {
          message("Can't Delete!", 'error');
        }
      })
      .catch(() => {
        message('Error, Can not Delete!', 'error');
      });
    onClose();
  };

  render() {
    const { deleteOpen, onClose } = this.props;
    return (
      <SnackBarContext.Consumer>
        {(message) => (
          <Dialog open={deleteOpen} onClose={onClose}>
            <DialogTitle>Remove Trainee</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Do you really want to remove trainee?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose} color="primary">
                Cancel
              </Button>
              <Button
                onClick={(event) => this.handleDeleteClose(event, message)}
                color="primary"
                variant="contained"
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </SnackBarContext.Consumer>
    );
  }
}

DeleteDialog.propTypes = {
  details: PropTypes.objectOf(PropTypes.any).isRequired,
  onClose: PropTypes.func,
  deleteOpen: PropTypes.bool,
  renderTrainee: PropTypes.func.isRequired,
};

DeleteDialog.defaultProps = {
  onClose: () => { },
  deleteOpen: false,
};

export default DeleteDialog;
