/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { AddDialog, EditDialog, DeleteDialog } from './components';
import { TableComponent } from '../../components/index';
import { getFormattedDate } from '../../libs/utils/getFormattedDate';
import callApi from '../../libs/utils/api';
import { IsLoadingHOC } from '../../components/HOC';

const asend = 'asc';
const dsend = 'desc';
class TraineeList extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      sortedBy: 'createdAt',
      order: dsend,
      sortedOrder: -1,
      page: 0,
      edit: false,
      deleteDialog: false,
      skip: 0,
      limit: 10,
      traineeInfo: {},
      database: [],
      loader: false,
    };
  }

  componentDidMount() {
    const { setLoading } = this.props;
    setLoading(true);
    this.renderData();
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
    const { order, sortedBy } = this.state;
    let tabOrder = asend; let
      sequence = -1;
    if (sortedBy === field && order === asend) {
      tabOrder = dsend;
      sequence = 1;
    }
    this.setState({ sortedBy: field, order: tabOrder, sortedOrder: sequence });
  }

  handlePageChange = (newPage, value) => {
    console.log('New Page ', newPage, 'Value ', value);
    this.setState({ page: value, skip: value * 20 }, () => {
      this.renderData();
      console.log('Skip ', this.state.skip);
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

  renderData = async () => {
    const {
      limit, skip, sortedBy, sortedOrder, search,
    } = this.state;
    const { setLoading } = this.props;
    await callApi(`/user?limit=${limit}&skip=${skip}&sortedBy=${sortedBy}&sortedOrder=${sortedOrder}&search=${search}`, 'GET')
      .then((response) => {
        setTimeout(() => {
          setLoading(false);
          this.setState({ database: response.data.data[0] });
        }, 500);
        console.log(response);
      })
      .catch(() => {
        setLoading(false);
        console.log('there is an errror');
      });
  }

  render() {
    const {
      open, deleteDialog, order, sortedBy, page, edit, database, loader, traineeInfo, limit,
    } = this.state;
    return (
      <>
        <div style={{ float: 'right' }}>
          <AddDialog
            open={open}
            onClose={this.onCloseEvent}
            onSubmit={this.handleSubmit}
            renderTrainee={this.renderData}
          />
        </div>
        {
          loader ? (
            <CircularProgress size={150} color="secondary" style={{ marginLeft: '43%', marginTop: '20%' }} />
          )
            : (
              <TableComponent
                id="id"
                data={database}
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
                count={50}
                page={page}
                rowsPerPage={limit}
                onPageChange={this.handlePageChange}
                onSelect={this.handleSelect}
              />
            )
        }
        <>
          { edit && (
            <EditDialog
              editOpen={edit}
              onClose={this.editDialogClose}
              details={traineeInfo}
              renderTrainee={this.renderData}
            />
          )}
          { deleteDialog && (
            <DeleteDialog
              deleteOpen={deleteDialog}
              onClose={this.deleteDialogClose}
              details={traineeInfo}
              renderTrainee={this.renderData}
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
  setLoading: PropTypes.func.isRequired,
};
export default IsLoadingHOC(TraineeList);
