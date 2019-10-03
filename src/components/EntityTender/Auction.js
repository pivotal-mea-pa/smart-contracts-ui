import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
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
  Dialog
} from '@material-ui/core';
import { Search, History } from '@material-ui/icons';
import Loader from '../common/Loader';
import Success from './AuctionMessage/Success';
import CloseAuction from './AuctionMessage/CloseAuction';

class Auction extends Component {
  state = {
    dateSorting: '',
    statusFilter: '',
    filterType: '',
    auctionList: [],
    stepCount: 1,
    open: false,
    bidding: false
  };

  openAutionModal = () => {
    this.setState({ open: true, bidding: true });
    setTimeout(() => this.setState({ stepCount: 2 }), 3000);
  };

  closeAutionModal = () => {
    this.setState({ open: false });
  };
  closeBidding = () => {
    this.setState({ open: true, bidding: false, stepCount: 1 });
    setTimeout(() => this.setState({ stepCount: 3 }), 3000);
  };

  render() {
    const {
      dateSorting,
      statusFilter,
      filterType,
      stepCount,
      open,
      bidding
    } = this.state;
    const { auctionList } = this.props;
    const max = Math.max.apply(
      Math,
      auctionList.map(bid => {
        return bid.value;
      })
    );

    let step;
    if (stepCount === 1) {
      step = <Loader />;
    } else if (stepCount === 2) {
      step = <Success />;
    } else if (stepCount === 3) {
      step = <CloseAuction />;
    }

    return (
      <Fragment>
        <Dialog
          open={open}
          onClose={this.closeAutionModal}
          className="auth-modal bid-modal"
          aria-labelledby="form-dialog-title"
        >
          <Grid container className="auth-body">
            <span className="close-modal" onClick={this.closeAutionModal}>
              <i className="material-icons">close</i>
            </span>
            <DialogTitle className="dialog-title" id="rfp-modal-title">
              Auction
            </DialogTitle>
            <DialogContent>{step}</DialogContent>
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
            auctionList.map(bid => (
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
            ))}

          {bidding == false && (
            <Grid container spacing={8} className="p-3">
              <Grid item sm={12} className="text-right">
                <Button
                  onClick={this.openAutionModal}
                  variant="contained"
                  color="primary"
                >
                  Open Auction
                </Button>
              </Grid>
            </Grid>
          )}
          {bidding && (
            <Grid container spacing={8} className="p-3">
              <Grid item sm={12} className="text-right">
                <Button
                  onClick={this.closeBidding}
                  variant="contained"
                  color="primary"
                >
                  Close Auction
                </Button>
              </Grid>
            </Grid>
          )}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auctionList: state.auction.bidList
});

export default connect(mapStateToProps)(Auction);
