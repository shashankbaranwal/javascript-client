/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import React from 'react';
import Button from '@material-ui/core/Button';
import { AddDialog } from './components/AddDialog';

class Trainee extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = (data) => {
    this.setState({ open: false });
    console.log(data);
  }

  render() {
    const { open } = this.state;
    return (
      <>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen} style={{ marginTop: '13px' }}>
          Add Trainee
        </Button>
        <AddDialog
          open={open}
          onClose={this.handleClose}
          onSubmit={this.handleSubmit}
        />
      </>
    );
  }
}
export default Trainee;
