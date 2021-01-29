import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { graphql } from '@apollo/client/react/hoc';
import { flowRight as compose } from 'lodash';
// import { withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import trainees from './data/trainee';
import { TableComponent } from '../../components';
import { AddDialog, DeleteDialog, EditDialog } from './components';
import callApi from '../../libs/utils/api';
import { IsLoadingHOC } from '../../components/HOC';
import { SnackBarContext } from '../../contexts';
import { GET_USER } from './query';

// const styles = (theme) => ({
//   main: {
//     marginTop: theme.spacing(2),
//   },
//   icons: {},
// });

class TraineeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      order: 'asc',
      orderBy: 'name',
      page: 0,
      // totalCount: 0,
      openDeleteDialog: false,
      deleteDialogData: null,
      openEditDialog: false,
      editDialogData: null,
      // traineesDataBase: trainees,
    };
  }

  // componentDidMount() {
  //   this.traineesFromDataBase();
  // }

  onOpen = () => {
    this.setState({ open: true });
  };

  onCloseEvent = () => {
    this.setState({ open: false });
  };

  selfCheck = async (value) => {
    const { deleteDialogData } = this.state;
    const { originalId } = deleteDialogData;
    await callApi('/user', 'GET')
      .then((res) => {
        if (res.data.user.originalId === originalId) {
          this.handleDeleteIconClose();
          value("Can't Delete your self", 'error');
        }
      });
  }

  renderTrainees = () => (
    <ul>
      {
        trainees.map((trainee) => this.renderTrainee(trainee))
      }
    </ul>
  )

  renderTrainee = (trainee) => {
    const { match } = this.props;
    return (
      <li key={trainee.id}>
        <Link to={`${match.path}/${trainee.id}`}>
          {trainee.name}
        </Link>
      </li>
    );
  }

  handleSort = (field) => {
    const { order, orderBy } = this.state;
    let newOrder = 'asc';
    if (orderBy === field && order === 'asc') {
      newOrder = 'desc';
    }
    this.setState({
      order: newOrder,
      orderBy: field,
    }, () => {
      this.traineesFromDataBase();
    });
  }

  handleSelect = (id) => {
    const { match, history } = this.props;
    return (
      history.push(`${match.path}/${id}`)
    );
  }

  formatDate = (date) => (moment(date).format('dddd, MMMM Do, YYYY h:mm:ss A'))

  handleChangePage = (refetch) => (event, newPage) => {
    this.setState({ page: newPage }, () => {
      refetch({ skip: String(newPage * 5), limit: String(5) });
    });
  };

  handleEditIcon = (e, data) => {
    e.stopPropagation();
    this.setState({ openEditDialog: true, editDialogData: data });
  }

  handleDeleteIcon = (e, data, value) => {
    e.stopPropagation();
    this.setState({ openDeleteDialog: true, deleteDialogData: data }, () => {
      this.selfCheck(value);
    });
  }

  handleDeleteIconClose = () => {
    this.setState({ openDeleteDialog: false }, () => {
      this.traineesFromDataBase();
    });
  }

  handleEditIconClose = () => {
    this.setState({ openEditDialog: false }, () => {
      this.traineesFromDataBase();
    });
  }

  render() {
    const { classes } = this.props;
    const {
      open, order, orderBy, page, deleteDialogData,
      openDeleteDialog, openEditDialog, editDialogData,
    } = this.state;
    const { currentState, setLoading } = this.props;

    const {
      data: {
        getAllTrainees: { data = {}, TraineeCount = 0 } = {},
        refetch,
      },
    } = this.props;
    if (data) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } else {
      setLoading(true);
    }
    return (
      <SnackBarContext.Consumer>
        {(value) => (
          <div>
            {
              (!currentState && data.length > 0) && (
                <div>
                  <div className={classes}>
                    <AddDialog
                      open={open}
                      onClose={this.onCloseEvent}
                      onSubmit={this.handleSubmit}
                      renderTrainee={this.renderData}
                    />
                  </div>
                  <TableComponent
                    id={value}
                    data={data}
                    column={[
                      {
                        field: 'name',
                        label: 'Name',
                      },
                      {
                        field: 'email',
                        label: 'Email Address',
                      },
                      {
                        field: 'createdAt',
                        label: 'Date',
                        align: 'right',
                        format: this.formatDate,
                      },
                    ]}
                    actions={[
                      {
                        icon: <EditIcon className={classes} />,
                        handler: this.handleEditIcon,
                      },
                      {
                        icon: <DeleteIcon className={classes} />,
                        handler: this.handleDeleteIcon,
                      },
                    ]}
                    order={order}
                    orderBy={orderBy}
                    onSort={this.handleSort}
                    onSelect={this.handleSelect}
                    // eslint-disable-next-line radix
                    count={parseInt(TraineeCount) + 1}
                    page={page}
                    onChangePage={this.handleChangePage(refetch)}
                  />
                </div>
              )
            }
            <DeleteDialog
              openDialog={openDeleteDialog}
              onClose={this.handleDeleteIconClose}
              data={deleteDialogData}
            />
            {
              openEditDialog && (
                <EditDialog
                  editOpen={openEditDialog}
                  onClose={this.handleEditIconClose}
                  details={editDialogData}
                />
              )
            }
          </div>
        )}
      </SnackBarContext.Consumer>
    );
  }
}

TraineeList.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  setLoading: PropTypes.func.isRequired,
  currentState: PropTypes.bool.isRequired,
  data: PropTypes.objectOf.isRequired,
};

// export default withStyles(styles)(IsLoadingHOC(TraineeList));

export default compose(IsLoadingHOC, graphql(GET_USER,
  {
    options: { variables: { skip: '0', limit: '5', sort: 'name' } },
  }))(TraineeList);
