import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { addBid, getBidsByVendor } from '../../redux/actions/auctionActions';
import {
  addNotification,
  getNotifications
} from '../../redux/actions/notificationActions';
import getTimeStamp from '../../utils/getTimeStamp';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  Card,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
  TextField
} from '@material-ui/core';
import { Search, History } from '@material-ui/icons';
import Loader from '../common/Loader';
import Success from './Bid/Success';
import uuid from 'uuid';

class Bids extends Component {
  state = {
    dateSorting: '',
    statusFilter: '',
    filterType: '',
    open: false,
    bid: false,
    stepCount: 1,
    bidValue: '',
    currentBid: {}
  };

  openBidModal = () => {
    this.setState({ open: true });
  };

  closeBidModal = () => {
    this.setState({ open: false, stepCount: 1 });
  };

  submitBid = e => {
    const {
      tender,
      vendor,
      addBid,
      getBidsByVendor,
      addNotification,
      getNotifications,
      user
    } = this.props;
    const { bidValue } = this.state;
    e.preventDefault();
    const newBid = {
      tender: tender._id,
      vendor: vendor._id,
      value: bidValue,
      status: 'Submitted',
      blockchainId: uuid().substring(0, 10)
    };
    this.setState({ stepCount: 2, currentBid: newBid });
    addBid({
      ...newBid
    }).then(() => {
      addNotification({
        type: 'Bid Submitted',
        status: 'Submitted',
        createdDate: new Date(),
        createdBy: user.id,
        tender: tender._id,
        EntityOrVendor: vendor._id
      }).then(() => {
        getNotifications();
        getBidsByVendor(vendor._id);
        setTimeout(this.setState({ stepCount: 3 }), 2000);
      });
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const {
      dateSorting,
      statusFilter,
      filterType,
      stepCount,
      open,
      bidValue,
      currentBid
    } = this.state;
    const { auctionList, tender } = this.props;
    const max = Math.max.apply(
      Math,
      auctionList.map(bid => {
        return bid.value;
      })
    );
    let step;
    if (stepCount === 1) {
      step = (
        <TextField
          id="standard-name"
          name="bidValue"
          type="number  "
          label="Enter Bid"
          value={bidValue}
          className="secondary"
          onChange={this.onChange}
          margin="normal"
        />
      );
    } else if (stepCount === 2) {
      step = <Loader />;
    } else if (stepCount === 3) {
      step = (
        <Success
          bidAmount={currentBid.value}
          blockchainId={currentBid.blockchainId}
        />
      );
    }
    return (
      <Fragment>
        <Dialog
          open={open}
          onClose={this.closeBidModal}
          className="auth-modal bid-modal"
          aria-labelledby="form-dialog-title"
        >
          <Grid container className="auth-body">
            <span className="close-modal" onClick={this.closeBidModal}>
              <i className="material-icons">close</i>
            </span>
            <DialogTitle className="dialog-title" id="rfp-modal-title">
              Auction
            </DialogTitle>
            <DialogContent>{step}</DialogContent>
            {stepCount <= 1 && (
              <DialogActions className="align-right">
                <Button
                  variant="outlined"
                  onClick={this.closeBidModal}
                  color="secondary"
                >
                  close
                </Button>
                <Button
                  variant="contained"
                  className="solid"
                  onClick={this.submitBid}
                  color="secondary"
                >
                  Enter Bid
                </Button>
              </DialogActions>
            )}
          </Grid>
        </Dialog>

        <div className="controls text-right">
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
        </div>
        <div className="card-list bids">
          <Grid container spacing={8} className="p-3 bid-tab">
            <Grid item sm={2}>
              Vendor
            </Grid>
            <Grid item sm={2}>
              Bid #
            </Grid>
            <Grid item sm={3}>
              Time
            </Grid>
            <Grid item sm={2}>
              Bid Value
            </Grid>
            <Grid item sm={1}>
              Status
            </Grid>
          </Grid>
          {auctionList &&
            auctionList.map(
              bid =>
                bid.tender._id === tender._id && (
                  <Card key={bid._id} className="p-3 mb-3">
                    <Grid container spacing={8}>
                      <Grid item sm={2}>
                        {bid.vendor.name}
                      </Grid>
                      <Grid item sm={2}>
                        {bid.blockchainId}
                      </Grid>
                      <Grid item sm={3} className="text-info">
                        <History />
                        {getTimeStamp(bid.createdDate)}
                      </Grid>
                      <Grid item sm={2}>
                        {parseFloat(bid.value).toFixed(2)}
                      </Grid>
                      <Grid item sm={1}>
                        {bid.value >= max ? (
                          <span className="status up">
                            <i className="material-icons">arrow_upward</i>
                          </span>
                        ) : (
                          <span className="status down">
                            <i className="material-icons"> arrow_downward</i>
                          </span>
                        )}
                      </Grid>
                    </Grid>
                  </Card>
                )
            )}
          <Grid container spacing={8} className="p-3">
            <Grid item sm={12} className="text-right">
              {tender.status !== 'Closed' && (
                <Button
                  onClick={this.openBidModal}
                  variant="contained"
                  className="solid"
                  color="secondary"
                >
                  Enter Bid
                </Button>
              )}
            </Grid>
          </Grid>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auctionList: state.auction.bidList,
  tender: state.tenders.tender,
  vendor: state.profiles.profile,
  user: state.auth.user
});

const actions = {
  addBid,
  getBidsByVendor,
  getNotifications,
  addNotification
};

export default connect(
  mapStateToProps,
  actions
)(Bids);
