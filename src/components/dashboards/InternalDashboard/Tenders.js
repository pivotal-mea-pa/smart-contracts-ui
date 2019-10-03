import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getTenders, updateTender } from '../../../redux/actions/tenderActions';
import {
  addNotification,
  getNotifications
} from '../../../redux/actions/notificationActions';
import {
  Card,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Tooltip
} from '@material-ui/core';
import { Search, Add } from '@material-ui/icons';
import Message from './PublishTender/message';
import Success from './PublishTender/success';
import Loader from '../../common/Loader';
import NotificationTimeline from './NotificationTimeline';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5
  }
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1)
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, {
  withTheme: true
})(TablePaginationActions);

let counter = 0;
function createData(name, calories, fat) {
  counter += 1;
  return { id: counter, name, calories, fat };
}

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 500
  },
  tableWrapper: {
    overflowX: 'auto'
  }
});

class Tenders extends Component {
  state = {
    open: false,
    stepCount: 1,
    dateSorting: '',
    statusFilter: '',
    filterType: '',
    right: false,
    tenderList: [],
    rftList: [],
    page: 0,
    rowsPerPage: 5,
    currentTender: {}
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onTenderOpen = e => {
    e.preventDefault();
    const {
      getTenders,
      updateTender,
      addNotification,
      getNotifications,
      user
    } = this.props;
    const { currentTender } = this.state;
    updateTender({
      ...currentTender,
      status: 'Pending'
    }).then(tender => {
      addNotification({
        type: 'Tender Submitted',
        status: 'Tender Updated',
        tender: tender._id,
        createdBy: user.id,
        createdDate: new Date()
      }).then(() => {
        this.setState({ currentTender: {} });
        getTenders();
        getNotifications();
      });
    });
    this.setState({ stepCount: 2 });
    setTimeout(() => this.setState({ stepCount: 3, currentRFT: {} }), 3000);
  };

  onDialogClose = () => {
    this.setState({ open: false });
  };

  getPurchasedRfts = tenderId => {
    const { rftList } = this.props;
    const rftListForTender = rftList.filter(rft => rft.tender._id === tenderId);
    const purchasedRFTs = rftListForTender.filter(
      rft => rft.status === 'Purchased'
    ).length;
    if (purchasedRFTs > 0) {
      return purchasedRFTs;
    }
    return null;
  };

  addTender = () => {
    window.location.href = '/internal/add-tender';
  };

  viewTender = id => {
    window.location.href = `/internal/tender/${id}`;
  };

  showButtons = () => {
    return (
      <DialogActions className="align-right">
        <Button
          variant="outlined"
          className="btn internal outlined"
          onClick={() => this.setState({ open: false })}
        >
          Cancel
        </Button>
        <Button
          onClick={this.onTenderOpen}
          className="btn internal submit"
          variant="outlined"
        >
          Submit
        </Button>
      </DialogActions>
    );
  };

  render() {
    const {
      dateSorting,
      statusFilter,
      filterType,
      open,
      stepCount,
      rows,
      rowsPerPage,
      page,
      currentTender
    } = this.state;
    const { tenderList } = this.props;
    const emptyRows =
      rowsPerPage -
      Math.min(rowsPerPage, tenderList.length - page * rowsPerPage);

    let step;
    if (stepCount === 1) {
      step = <Message />;
    } else if (stepCount === 2) {
      step = <Loader />;
    } else if (stepCount === 3) {
      step = <Success tenderName={currentTender.name} />;
    }
    return (
      <div className="tab-content internal-dashboard">
        <Grid container spacing={8}>
          <Grid item sm={6}>
            <Grid container className="tab-content-header">
              <Grid item sm={4}>
                <span className="tab-content-header-text">Tenders</span>{' '}
                <span className="tender-create-container">
                  <Add className="add=item add" onClick={this.addTender} />
                </span>
              </Grid>
              <Grid item sm={8}>
                <FormControl className="active-filters-form-control">
                  <InputLabel htmlFor="dateSorting">Date</InputLabel>
                  <Select
                    value={dateSorting}
                    onChange={this.onChange}
                    inputProps={{
                      name: 'dateSorting',
                      id: 'dateSorting'
                    }}
                  >
                    <MenuItem value="acending">Acending</MenuItem>
                    <MenuItem value="decending">Decending</MenuItem>
                  </Select>
                </FormControl>{' '}
                <FormControl className="active-filters-form-control">
                  <InputLabel htmlFor="statusFilter">Status</InputLabel>
                  <Select
                    value={statusFilter}
                    onChange={this.onChange}
                    inputProps={{
                      name: 'statusFilter',
                      id: 'statusFilter'
                    }}
                  >
                    <MenuItem value="accepted">Accepted</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="awarded">Awarded</MenuItem>
                    <MenuItem value="declined">Declined</MenuItem>
                  </Select>
                </FormControl>{' '}
                <FormControl className="active-filters-form-control">
                  <InputLabel htmlFor="filterType">A-Z</InputLabel>
                  <Select
                    value={filterType}
                    onChange={this.onChange}
                    inputProps={{
                      name: 'filterType',
                      id: 'filterType'
                    }}
                  >
                    <MenuItem value="a-z">A-Z</MenuItem>
                    <MenuItem value="status">Status</MenuItem>
                    <MenuItem value="rating">Rating</MenuItem>
                  </Select>
                </FormControl>
                <Search className="active-search" />
              </Grid>
            </Grid>
            <Grid container className="tab-card-list tenders">
              {tenderList && tenderList.length > 0 ? (
                <Table>
                  <TableBody>
                    {tenderList &&
                      tenderList
                        .slice(0)
                        .reverse()
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map(tender => {
                          return (
                            <TableRow className="tender-row" key={tender._id}>
                              <TableCell align="right" className="tender-cell">
                                {tender.name}
                              </TableCell>
                              <TableCell align="right" className="tender-cell">
                                <Tooltip
                                  title={tender.categories}
                                  aria-label="Add"
                                >
                                  <div className="categories">
                                    {tender.categories[0]}...
                                  </div>
                                </Tooltip>
                              </TableCell>

                              <TableCell align="right" className="tender-cell">
                                {new Date(
                                  tender.rfpPurchaseEndDate
                                ).toLocaleDateString('en-gb')}{' '}
                              </TableCell>
                              {tender.blockchainId &&
                                (tender.status !== 'New' &&
                                  tender.status !== 'Pending') && (
                                  <TableCell
                                    align="right"
                                    className="tender-cell block-color"
                                  >
                                    #{tender.blockchainId}
                                  </TableCell>
                                )}

                              <TableCell
                                align="right"
                                className="tender-cell action"
                              >
                                {tender.status === 'New' && (
                                  <Button
                                    className="btn notifications internal submit"
                                    variant="outlined"
                                    onClick={() => {
                                      this.setState({
                                        currentTender: tender,
                                        open: true
                                      });
                                    }}
                                  >
                                    Submit
                                  </Button>
                                )}
                                {(tender.status === 'Pending' ||
                                  tender.status === 'Open') && (
                                  <Button
                                    className="btn notifications secondary internal"
                                    variant="outlined"
                                    onClick={() => this.viewTender(tender._id)}
                                  >
                                    {(!tender.notifications ||
                                      tender.notifications.length === 0) && (
                                      <span className="">View</span>
                                    )}
                                    {(tender.notifications &&
                                      tender.notifications.length) > 0 && (
                                      <Fragment>
                                        <span className="button-text">
                                          View
                                        </span>
                                        <span className="notifcation-count">
                                          <span className="notification-text">
                                            <i className="material-icons">
                                              notification_important
                                            </i>
                                            <span className="count">
                                              {tender.notifications.length}
                                            </span>
                                          </span>
                                        </span>
                                      </Fragment>
                                    )}
                                  </Button>
                                )}
                                {tender.status === 'Closed' && (
                                  <Button
                                    variant="outlined"
                                    className="btn notifications secondary"
                                    onClick={() => this.viewTender(tender._id)}
                                  >
                                    <span>Closed</span>
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>
                          );
                        })}

                    {emptyRows > 0 && (
                      <TableRow style={{ height: 48 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>

                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        colSpan={3}
                        count={tenderList.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                          native: true
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActionsWrapped}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              ) : (
                <div>No Tenders</div>
              )}
            </Grid>
          </Grid>
          <Grid item sm={6}>
            <NotificationTimeline />
          </Grid>
        </Grid>
        <Dialog
          open={open}
          onClose={() => this.setState({ open: false })}
          className="auth-modal rfp-modal"
          aria-labelledby="form-dialog-title"
        >
          <Grid container className="auth-body">
            <span
              className="close-modal"
              onClick={() => this.setState({ open: false })}
            >
              <i className="material-icons">close</i>
            </span>
            <DialogTitle className="dialog-title" id="rfp-modal-title">
              Submit Tender
            </DialogTitle>
            <DialogContent>{step}</DialogContent>
            {stepCount === 1 ? this.showButtons() : null}
          </Grid>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tenderList: state.tenders.tenderList,
  rftList: state.rfts.rftList,
  user: state.auth.user
});

const actions = {
  getTenders,
  updateTender,
  addNotification,
  getNotifications
};

export default connect(
  mapStateToProps,
  actions
)(Tenders);
