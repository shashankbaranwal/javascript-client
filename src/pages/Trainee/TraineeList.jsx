/* eslint-disable max-len */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { AddDialog, EditDialog, DeleteDialog } from './components';
import trainees from './data/trainee';
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
      order: dsend,
      sortedOrder: 1,
      sortedBy: 'name' && 'email',
      page: 0,
      totalCount: 0,
      edit: false,
      deleteDialog: false,
      skip: 0,
      limit: 20,
      traineeInfo: {},
      database: [],
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
    let tabOrder = asend;
    if (sortedBy === field && order === asend) {
      tabOrder = dsend;
    }
    this.setState({ sortedBy: field, order: tabOrder });
  }

  handlePageChange = (event, page) => {
    this.setState({ page });
  }

  handleSelect = (id) => {
    const { match, history } = this.props;
    return (
      history.push(`${match.path}/${id}`)
    );
  }

  handleSubmit = () => {
    this.setState({ open: false });
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
          this.setState({ database: response.data.data[0], totalCount: response.data.TraineeCount + 1 });
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
      open, deleteDialog, order, sortedBy, page, edit, database, loading, totalCount, orderBy,
    } = this.state;
    return (
      <>
        <div style={{ float: 'right' }}>
          <AddDialog
            open={open}
            onClose={this.onCloseEvent}
            onSubmit={this.handleSubmit}
          />
        </div>
        {
          loading ? (
            <CircularProgress size={50} color="secondary" style={{ marginLeft: '50%', Center: '20%' }} />
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
                orderBy={orderBy}
                onSort={this.handleSort}
                onSelect={this.handleSelect}
                count={totalCount}
                page={page}
                onPageChange={this.handlePageChange}
              />
            )
        }
        <>
          { edit && (
            <EditDialog
              editOpen={edit}
              onClose={this.editDialogClose}
              details={trainees}
            />
          )}
          { deleteDialog && (
            <DeleteDialog
              deleteOpen={deleteDialog}
              onClose={this.deleteDialogClose}
              details={trainees}
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
export default (IsLoadingHOC(TraineeList));
