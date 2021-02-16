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
// import callApi from '../../../../lib/utils/api';

class DeleteDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleDeleteClose = async (event, value) => {
    const {
      deleteTrainee, details, onClose, refetchQueries,
    } = this.props;
    const originalDate = new Date(details.createdAt);
    const dateCheck = new Date('2019-02-14');
    const { originalId } = details;
    console.log('Delete', deleteTrainee);
    // await callApi('/trainee', 'DELETE', {originalId})
    await deleteTrainee({ variables: { originalId } })
      .then(() => {
        refetchQueries();
        if (originalDate > dateCheck) {
          console.log('Deleted Item', details);
          value('Successfully Deleted!', 'success');
        } else {
          value("Can't Delete!", 'error');
        }
      })
      .catch(() => {
        value('Error, Can not Delete!', 'error');
      });
    onClose();
  };

  render() {
    const { deleteOpen, onClose } = this.props;
    return (
      <SnackBarContext.Consumer>
        {(value) => (
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
                onClick={(event) => this.handleDeleteClose(event, value)}
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
  refetchQueries: PropTypes.isRequired,
  deleteTrainee: PropTypes.isRequired,
};

DeleteDialog.defaultProps = {
  onClose: () => { },
  deleteOpen: false,
};

export default DeleteDialog;
