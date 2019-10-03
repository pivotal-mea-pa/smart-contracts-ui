import React, { Component, Fragment } from 'react';
import NotificationTimeline from './NotificationTimeline';
import { connect } from 'react-redux';
import { updateRFT, getRFTs } from '../../../redux/actions/rftActions';
import {
  getNotifications,
  addNotification
} from '../../../redux/actions/notificationActions';

import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow,
  IconButton,
  Tooltip
} from '@material-ui/core/';
import {
  Search,
  FirstPage,
  LastPage,
  KeyboardArrowLeft,
  KeyboardArrowRight
} from '@material-ui/icons/';
import { withStyles } from '@material-ui/core/styles';
import Loader from '../../common/Loader';
import Success from '../RFP/steps/success';
import Message from '../RFP/steps/message';
import PropTypes from 'prop-types';

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

class ActiveTenders extends Component {
  state = {
    dateSorting: '',
    statusFilter: '',
    filterType: '',
    open: false,
    info: false,
    stepCount: 1,
    currentRFT: {
      tender: {}
    },
    page: 0,
    rowsPerPage: 5
  };

  getInfoModal = () => {
    this.setState({ info: true });
    console.log('info Modal');
  };
  getInfoModalClose = () => {
    this.setState({ info: false });
  };

  getPurchaseModal = () => {
    this.setState({ open: true });
  };

  getPurchaseModalClose = () => {
    this.setState({ open: false });
  };

  handlePurchase = e => {
    const { currentRFT } = this.state;
    const {
      updateRFT,
      getRFTs,
      addNotification,
      getNotifications,
      user,
      profile
    } = this.props;
    e.preventDefault();
    updateRFT({
      ...currentRFT,
      status: 'Purchased'
    }).then(res => {
      this.setState({ stepCount: 2 });
      setTimeout(() => this.setState({ stepCount: 3 }), 3000);
      addNotification({
        type: 'RFT Purchased',
        status: 'Purchased',
        createdBy: user.id,
        tender: currentRFT.tender._id,
        EntityOrVendor: profile._id,
        createdDate: new Date()
      }).then(() => {
        getNotifications();
        getRFTs();
      });
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  viewTender = id => {
    window.location.href = `/tender/${id}`;
  };

  showButtons = () => {
    return (
      <DialogActions className="align-right">
        <Button
          variant="outlined"
          onClick={this.getPurchaseModalClose}
          color="secondary"
        >
          cancel
        </Button>
        <Button
          onClick={this.handlePurchase}
          className="btn-secondary"
          color="secondary"
        >
          purchase
        </Button>
      </DialogActions>
    );
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  render() {
    const {
      dateSorting,
      statusFilter,
      filterType,
      open,
      info,
      stepCount,
      rowsPerPage,
      page,
      currentRFT
    } = this.state;
    const { rftList, user } = this.props;
    const myRfts = rftList.filter(rft => rft.vendorContact === user.id);
    let { step } = this.props;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, rftList.length - page * rowsPerPage);
    if (stepCount === 1) {
      step = <Message tenderName={currentRFT.tender.name} />;
    } else if (stepCount === 2) {
      step = <Loader />;
    } else if (stepCount === 3) {
      step = (
        <Success
          tenderName={currentRFT.tender.name}
          blockchainId={currentRFT.blockchainId}
        />
      );
    }

    return (
      <div className="tab-content">
        <Grid container spacing={8}>
          <Grid item sm={6}>
            <Grid container className="tab-content-header">
              <Grid item sm={3}>
                <span className="tab-content-header-text">Tenders</span>
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
                  {myRfts
                    .slice(0)
                    .reverse()
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .reverse()
                    .map(rft => (
                      <TableRow key={rft._id} className="tender-row">
                        <TableCell align="right" className="tender-cell">
                          {rft.tender.name}
                        </TableCell>
                        <TableCell
                          className="tender-cell categories-holder"
                          align="right"
                        >
                          {rft.tender.categories && (
                            <Tooltip
                              title={rft.tender.categories.join(', ')}
                              aria-label="Add"
                            >
                              <div className="categories">
                                {rft.tender.categories[0]}...
                              </div>
                            </Tooltip>
                          )}
                        </TableCell>
                        <TableCell className="tender-cell" align="right">
                          {' '}
                          {new Date(
                            rft.tender.rfpPurchaseEndDate
                          ).toLocaleDateString('en-gb')}
                        </TableCell>
                        {rft.status === 'New' && (
                          <TableCell className="tender-cell" align="right">
                            <span className="item-data">
                              <Button
                                className="info-btn"
                                onClick={() => {
                                  this.setState({ currentRFT: rft });
                                  this.getInfoModal();
                                }}
                              >
                                {' '}
                                Info
                              </Button>
                            </span>
                          </TableCell>
                        )}
                        {rft.status === 'Purchased' && (
                          <TableCell className="tender-cell" align="right">
                            <span className="item-data block-color">
                              {' '}
                              #{rft.blockchainId}
                            </span>
                          </TableCell>
                        )}
                        <TableCell className="tender-cell action" align="right">
                          {rft.status === 'New' && (
                            <Button
                              onClick={() => {
                                this.setState({ currentRFT: rft });
                                this.getPurchaseModal();
                              }}
                              variant="text"
                              className="btn-secondary btn tendor"
                            >
                              Purchase
                            </Button>
                          )}
                          {rft.status === 'Purchased' && (
                            <Button
                              color="secondary"
                              className="btn notifications secondary"
                              variant="outlined"
                              onClick={() => this.viewTender(rft.tender._id)}
                            >
                              {(!rft.tender.notifications ||
                                rft.tender.notifications.length === 0) && (
                                <span>View</span>
                              )}
                              {rft.tender.notifications &&
                                rft.tender.notifications.length > 0 && (
                                  <Fragment>
                                    <span className="button-text">View</span>
                                    <span className="notifcation-count">
                                      <span className="notification-text">
                                        <i className="material-icons">
                                          notification_important
                                        </i>
                                        <span className="count">
                                          {rft.tender.notifications.length.toString()}
                                        </span>
                                      </span>
                                    </span>
                                  </Fragment>
                                )}
                            </Button>
                          )}
                          {(rft.status === 'Awarded' ||
                            rft.status === 'Closed') && (
                            <Button
                              color="secondary"
                              className="btn notifications secondary"
                              variant="outlined"
                              onClick={() => this.viewTender(rft.tender._id)}
                            >
                              {rft.status}
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
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
                      count={rftList.length}
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
            <NotificationTimeline />
          </Grid>
          <Dialog
            open={open}
            onClose={this.getPurchaseModalClose}
            className="auth-modal rfp-modal"
            aria-labelledby="form-dialog-title"
          >
            <Grid container className="auth-body">
              <span
                className="close-modal"
                onClick={this.getPurchaseModalClose}
              >
                <i className="material-icons">close</i>
              </span>
              <DialogTitle className="dialog-title" id="rfp-modal-title">
                Purchase Tender
              </DialogTitle>
              <DialogContent>{step}</DialogContent>
              {stepCount === 1 ? this.showButtons() : null}
            </Grid>
          </Dialog>
          <Dialog
            open={info}
            onClose={this.getInfoModalClose}
            className="auth-modal rfp-modal"
            aria-labelledby="form-dialog-title"
          >
            <Grid container className="auth-body">
              <span className="close-modal" onClick={this.getInfoModalClose}>
                <i className="material-icons">close</i>
              </span>
              <DialogTitle className="dialog-title" id="rfp-modal-title">
                {currentRFT.tender ? currentRFT.tender.name : ''} : Tender Info
              </DialogTitle>
              <DialogContent>
                <p>{currentRFT.tender ? currentRFT.tender.description : ''}</p>
              </DialogContent>
              <DialogActions className="align-right">
                <Button
                  variant="outlined"
                  onClick={this.getInfoModalClose}
                  color="secondary"
                >
                  close
                </Button>
              </DialogActions>
            </Grid>
          </Dialog>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  rftList: state.rfts.rftList,
  notificationList: state.notifications.notificationList,
  user: state.auth.user,
  profile: state.profiles.profile
});

const actions = {
  updateRFT,
  getRFTs,
  addNotification,
  getNotifications
};
ActiveTenders.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  actions
)(withStyles(styles)(ActiveTenders));
