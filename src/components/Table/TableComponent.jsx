import React from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

export default function TableComponent(props) {
  const {
    id, data, column, order, orderBy, count, page,
    onPageChange, rowsPerPage, actions, handleChangeRowsPerPage,
  } = props;
  return (
    <TableContainer component={Paper} style={{ border: 'solid #c0c0c0 1px' }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow style={{ marginLeft: '20%' }}>
            {
              column.map((item) => (
                <>
                  <TableCell key={`${item.label}`} align={item.align} style={{ borderBottom: 'solid #c0c0c0 1px' }}>
                    <TableSortLabel
                      active={orderBy === item.field}
                      direction={order}
                      style={{ marginRight: '20%' }}
                    >
                      {item.label}
                    </TableSortLabel>
                  </TableCell>
                </>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((trainees) => (
            <StyledTableRow key={trainees.id} hover>
              {
                column.map((item) => (
                  <>
                    <TableCell key={`${trainees[id]}${item.field}`} align={item.align}>
                      {item.format ? item.format(trainees[item.field]) : trainees[item.field] }
                      {item.label === 'Date' ? actions.map((action) => (
                        <>
                          <Button variant="text" onClick={() => action.handler(trainees)}>
                            {action.icon}
                          </Button>
                        </>
                      )) : '' }
                    </TableCell>
                  </>
                ))
              }
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 20, { value: 1, label: 'All' }]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{ 'aria-label': 'Previous Page' }}
        nextIconButtonProps={{ 'aria-label': 'Next Page' }}
        onChangePage={onPageChange}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
TableComponent.propTypes = {
  id: PropTypes.string.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
  column: PropTypes.arrayOf(Object).isRequired,
  data: PropTypes.arrayOf(Object),
  order: PropTypes.string,
  orderBy: PropTypes.string,
  onPageChange: PropTypes.func,
  rowsPerPage: PropTypes.number,
  count: PropTypes.number,
  page: PropTypes.number,
  actions: PropTypes.arrayOf(PropTypes.any),
};
TableComponent.defaultProps = {
  order: '',
  data: [],
  orderBy: '',
  onPageChange: () => {},
  rowsPerPage: 10,
  count: 0,
  page: 1,
  actions: [],
};
