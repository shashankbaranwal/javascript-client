/* eslint-disable max-len */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { graphql } from '@apollo/react-hoc';

import { AddDialog, EditDialog, DeleteDialog } from './components';
import { TableComponent } from '../../components/index';
import { getFormattedDate } from '../../libs/utils/getFormattedDate';
import { GET } from './query';
import { UPDATED_TRAINEE_SUB, DELETE_TRAINEE_SUB } from './subscriptions';

const dsend = 'desc';
class TraineeList extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      sortedBy: 'createdAt',
      order: dsend,
      page: 0,
      edit: false,
      deleteDialog: false,
      limit: 10,
      traineeInfo: {},
      loader: false,
    };
  }

  componentDidMount() {
    this.setState({ loader: true });
    setTimeout(() => {
      this.setState({ loader: false });
    }, 600);
    const { data: { subscribeToMore } } = this.props;
    subscribeToMore({
      document: UPDATED_TRAINEE_SUB,
      updateQuery: (prev, { subscriptionData }) => {
        console.log('Sub', subscriptionData, 'Prev', prev);
        if (!subscriptionData) return prev;
        const { getAllTrainees: { records } } = prev;
        const { data: { traineeUpdated } } = subscriptionData;
        const updatedRecords = [records].map((record) => {
          console.log('Recordss ', record);
          if (record.originalId === traineeUpdated.originalId) {
            console.log('found match ');
            return {
              ...record,
              ...traineeUpdated,
            };
          }
          return record;
        });
        return {
          getAllTrainees: {
            ...prev.getAllTrainees,
            ...prev.getAllTrainees.TraineeCount,
            records: updatedRecords,
          },
        };
      },
    });
    subscribeToMore({
      document: DELETE_TRAINEE_SUB,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        const { getAllTrainees: { records } } = prev;
        const updatedRecords = [records].filter((record) => record.originalId !== subscriptionData.originalId);
        return {
          getAllTrainees: {
            ...prev.getAllTrainees,
            ...prev.getAllTrainees.TraineeCount - 1,
            records: updatedRecords,
          },
        };
      },
    });
  }

  onOpen = () => {
    this.setState({ open: true });
  };

  onCloseEvent = () => {
    this.setState({ open: false });
  };

  editDialogOpen = (item) => {
    this.selectedItem = item;
    this.setState({ edit: true, traineeInfo: item });
  };

  editDialogClose = () => {
    this.selectedIem = null;
    this.setState({ edit: false });
  };

  handleEdit = (item) => {
    console.log(item);
    this.editDialogClose();
  }

  deleteDialogOpen = (item) => {
    this.selectedIem = item;
    this.setState({ deleteDialog: true, traineeInfo: item });
  };

  deleteDialogClose = () => {
    this.selectedIem = null;
    this.setState({ deleteDialog: false });
  };

  handleDelete = () => {
    const { traineeInfo } = this.state;
    console.log(traineeInfo);
    this.deleteDialogClose();
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

  handlePageChange = (refetch) => (event, page) => {
    this.setState({ page }, () => {
      refetch({ skip: String(page * 10), limit: String(10) });
    });
  }

  handleSubmit = () => {
    this.setState({ open: false });
  }

  handleSelect = (id) => {
    const { match, history } = this.props;
    return (
      history.push(`${match.path}/${id}`)
    );
  }

  renderData = () => {
    this.setState({ loader: false });
  }

  render() {
    const {
      data: {
        getAllTrainees: { data = [], totalCount = 0 } = {},
        refetch,
      },
    } = this.props;

    const {
      open, deleteDialog, order, sortedBy, page, edit, loader, traineeInfo, limit,
    } = this.state;
    return (
      <>
        <div style={{ float: 'right' }}>
          <AddDialog
            open={open}
            onClose={this.onCloseEvent}
            onSubmit={this.handleSubmit}
            refetchQueries={refetch}
          />
        </div>
        <TableComponent
          id="id"
          data={data}
          column={[
            {
              field: 'name',
              label: 'Name',
            },
            {
              field: 'email',
              label: 'Email Address',
              format: (value) => value && value.toUpperCase(),
            },
            {
              field: 'createdAt',
              label: 'Date',
              align: 'right',
              format: getFormattedDate,
            },
          ]}
          actions={[
            {
              icon: <EditIcon />,
              handler: this.editDialogOpen,
            },
            {
              icon: <DeleteIcon />,
              handler: this.deleteDialogOpen,
            },
          ]}
          sortedBy={sortedBy}
          order={order}
          onSort={this.handleSort}
          count={totalCount}
          page={page}
          rowsPerPage={limit}
          onPageChange={this.handlePageChange(refetch)}
          onSelect={this.handleSelect}
          loader={loader}
          dataCount={totalCount}
        />
        <>
          { edit && (
            <EditDialog
              editOpen={edit}
              onClose={this.editDialogClose}
              details={traineeInfo}
              renderTrainee={data}
              refetchQueries={refetch}
            />
          )}
          { deleteDialog && (
            <DeleteDialog
              deleteOpen={deleteDialog}
              onClose={this.deleteDialogClose}
              details={traineeInfo}
              refetchQueries={refetch}
            />
          )}
        </>
      </>
    );
  }
}

TraineeList.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  data: PropTypes.isRequired,
};

export default graphql(GET,
  {
    options: {
      variables: {
        skip: '0', limit: '10', sortedBy: 'createdAt', sortedOrder: '-1',
      },
    },
  })(TraineeList);
