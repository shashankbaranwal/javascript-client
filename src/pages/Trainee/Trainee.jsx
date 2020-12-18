// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import Button from '@material-ui/core/Button';
import AddDialog from './components/AddDialog/AddDialog';

export default class Trainee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    const { open } = this.state;
    this.state({ open: 'false' });
    return open;
  };

  handleSubmit = (data) => {
    this.setState({
      open: false,
    }, () => {
      // eslint-disable-next-line no-console
      console.log(data);
    });
  }

  render() {
    const { open } = this.state;
    return (
      <>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>ADD TRAINEE</Button>
        <AddDialog open={open} onClose={this.handleClose} onSubmit={() => this.handleSubmit} />
      </>
    );
  }
}
