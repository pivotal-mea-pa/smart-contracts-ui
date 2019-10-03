import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getTenders, updateTender } from '../../../redux/actions/tenderActions';
import { addRFT, updateRFT, getRFTs } from '../../../redux/actions/rftActions';
import { getProfileById } from '../../../redux/actions/profileActions';
import {
  addNotification,
  getNotifications
} from '../../../redux/actions/notificationActions';
import PropTypes from 'prop-types';
import ActivityTimline from './ActivityTimeline';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Badge,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow,
  IconButton,
  Tooltip,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog
} from '@material-ui/core/';
import {
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
  Search
} from '@material-ui/icons/';
import Message from './PublishTender/message';
import Success from './PublishTender/success';
import Loader from '../../common/Loader';
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
          {theme.direction === 'rtl' ? <LastPage /> : <FirstPage />}
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
          {theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
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
    dateSorting: '',
    statusFilter: '',
    filterType: '',
    right: false,
    tenderList: [],
    rftList: [],
    page: 0,
    rowsPerPage: 5,
    stepCount: 1,
    info: false,
    open: false,
    currentTender: {}
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  onTenderOpen = (e, tender) => {
    const {
      addRFT,
      updateTender,
      getTenders,
      addNotification,
      getNotifications,
      user,
      profile,
      getProfileById
    } = this.props;
    const { currentTender } = this.state;
    e.preventDefault();
    currentTender.companies.forEach(company => {
      getProfileById(company).then(res => {
        const newRFT = {
          tender: currentTender._id,
          vendor: res._id,
          status: 'New',
          vendorContact: res.user._id
        };
        addRFT(newRFT);
      });
    });
    updateTender({
      ...currentTender,
      status: 'Open'
    }).then(() => {
      addNotification({
        type: 'Tender Published',
        status: 'Tender Updated',
        tender: currentTender._id,
        createdBy: user.id,
        EntityOrVendor: profile._id,
        createdDate: new Date()
      }).then(() => {
        getTenders();
        getNotifications();
      });
    });
    this.setState({ stepCount: 2 });
    setTimeout(() => this.setState({ stepCount: 3, currentRFT: {} }), 3000);
  };

  onTenderClose = (e, tender) => {
    e.preventDefault();
    const { updateRFT, updateTender, rftList } = this.props;
    rftList.forEach(rft => {
      if (rft.status !== 'RFP Submitted') {
        console.log('ran');
        updateRFT({
          ...rft,
          status: 'Deadline Missed'
        });
      }
    });
    updateTender({
      ...tender,
      status: 'Closed'
    });
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

  viewTender = id => {
    window.location.href = `/entity/tender/${id}`;
  };
  getInfoModal = () => {
    this.setState({ info: true });
    console.log('info Modal');
  };
  getInfoModalClose = () => {
    this.setState({ info: false });
  };

  render() {
    const {
      dateSorting,
      statusFilter,
      filterType,
      rowsPerPage,
      page,
      info,
      open,
      currentTender,
      stepCount
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
      step = (
        <Success
          tenderName={currentTender.name}
          tenderId={currentTender.blockchainId}
        />
      );
    }
    return (
      <div className="tab-content">
        <Grid container spacing={8}>
          <Grid item sm={6}>
            <Grid container className="tab-content-header">
              <Grid item sm={3}>
                <span className="tab-content-header-text">Tenders</span>{' '}
              </Grid>
              <Grid item sm={9}>
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
              <Table>
                <TableBody>
                  {tenderList
                    .slice(0)
                    .reverse()
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(tender => {
                      if (tender.status !== 'New')
                        return (
                          <TableRow key={tender.id} className="tender-row">
                            <TableCell align="right" className="tender-cell">
                              {tender.name}
                            </TableCell>
                            <TableCell
                              align="right"
                              className="tender-cell catergories"
                            >
                              <Tooltip
                                title={tender.categories.join(', ')}
                                aria-label="Add"
                              >
                                <div className="categories">
                                  {tender.categories[0]}...
                                </div>
                              </Tooltip>
                            </TableCell>
                            <TableCell align="right" className="tender-cell ">
                              {new Date(
                                tender.rfpResponseEndDate
                              ).toLocaleDateString('en-gb')}
                            </TableCell>
                            <TableCell
                              className="tender-cell info-cell"
                              align="right"
                            >
                              <Tooltip
                                title={tender.description}
                                aria-label="Add"
                              >
                                <div className="categories">INFO</div>
                              </Tooltip>
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
                            <TableCell align="right" className="tender-cell">
                              {tender.bids && (
                                <Badge
                                  style={{ padding: '0 16px' }}
                                  color="primary"
                                  badgeContent={tender.bids}
                                >
                                  Bids
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell
                              align="right"
                              className="tender-cell action"
                            >
                              {tender.status === 'Pending' && (
                                <Button
                                  color="primary"
                                  className="btn notifications btn-primary"
                                  // onClick={e => this.onTenderOpen(e, tender)}
                                  onClick={() => {
                                    this.setState({
                                      currentTender: tender,
                                      open: true
                                    });
                                  }}
                                >
                                  Publish
                                </Button>
                              )}
                              {tender.status === 'Closed' && (
                                <Button
                                  variant="outlined"
                                  className="btn notifications primary"
                                  color="primary"
                                  onClick={() => this.viewTender(tender._id)}
                                >
                                  Closed
                                </Button>
                              )}
                              {tender.status === 'Open' && (
                                <Button
                                  color="primary"
                                  className="btn notifications primary"
                                  variant="outlined"
                                  onClick={() => this.viewTender(tender._id)}
                                >
                                  {(!tender.notifications ||
                                    tender.notifications.length === 0) && (
                                    <span className="">View</span>
                                  )}
                                  {tender.notifications &&
                                    tender.notifications.length >= 1 && (
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
            </Grid>
          </Grid>
          <Grid item sm={6}>
            <ActivityTimline />
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
              Publish Tender
            </DialogTitle>
            <DialogContent>{step}</DialogContent>
            {stepCount == 1 && (
              <DialogActions className="align-right">
                <Button
                  variant="outlined"
                  className="btn primary outlined"
                  color="primary"
                  onClick={() => this.setState({ open: false })}
                >
                  Cancel
                </Button>
                <Button
                  onClick={this.onTenderOpen}
                  className="btn primary submit"
                  color="primary"
                  variant="contained"
                >
                  Publish
                </Button>
              </DialogActions>
            )}
            {stepCount == 3 && (
              <DialogActions className="align-right">
                <Button
                  variant="outlined"
                  className="btn primary outlined"
                  color="primary"
                  onClick={() => this.setState({ open: false })}
                >
                  Close
                </Button>
              </DialogActions>
            )}
          </Grid>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tenderList: state.tenders.tenderList,
  rftList: state.rfts.rftList,
  notificationList: state.notifications.notificationList,
  user: state.auth.user,
  profile: state.profiles.profile
});

const actions = {
  getTenders,
  updateTender,
  addRFT,
  updateRFT,
  getRFTs,
  getNotifications,
  addNotification,
  getProfileById
};

Tenders.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  actions
)(withStyles(styles)(Tenders));
