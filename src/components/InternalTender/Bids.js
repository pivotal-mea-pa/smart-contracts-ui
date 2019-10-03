import React, { Component, Fragment } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  Card
} from '@material-ui/core';
import { Search, History } from '@material-ui/icons';

class Bids extends Component {
  state = {
    dateSorting: '',
    statusFilter: '',
    filterType: '',
    auctionList: [
      {
        name: 'Vendor One',
        bidId: '#23456576',
        bidTime: '12/4/19 2pm',
        lastBid: '$1.1m',
        currentBid: '$1.3m',
        status: 'up'
      },    
    ]
  };
  render() {
    const { dateSorting, statusFilter, filterType, auctionList } = this.state;
    return (
      <Fragment>
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
              Last Bid
            </Grid>
            <Grid item sm={2}>
              Current Bid
            </Grid>
            <Grid item sm={1}>
              Status
            </Grid>
          </Grid>
          {auctionList &&
            auctionList.map(bid => (
              <Card key={bid.name} className="p-3 mb-3 row-item internal">
                <Grid container spacing={8}>
                  <Grid item sm={2}>
                    {bid.name}
                  </Grid>
                  <Grid item sm={2}>
                    {bid.bidId}
                  </Grid>
                  <Grid item sm={3} className="text-info">
                    <History />
                    {bid.bidTime}
                  </Grid>
                  <Grid item sm={2}>
                    {bid.lastBid}
                  </Grid>
                  <Grid item sm={2}>
                    {bid.currentBid}
                  </Grid>
                  <Grid item sm={1}>
                    {bid.status === 'up' ? (
                      <span className="status up">
                        <i class="material-icons">arrow_upward</i>
                      </span>
                    ) : (
                      <span className="status down">
                        <i class="material-icons"> arrow_downward</i>
                      </span>
                    )}
                  </Grid>
                </Grid>
              </Card>
            ))}
          <Grid container spacing={8} className="p-3">
            <Grid item sm={12} className="text-right">
              <Button variant="contained" color="primary" className="solid">
                Enter Bid
              </Button>
            </Grid>
          </Grid>
        </div>
      </Fragment>
    );
  }
}

export default Bids;
